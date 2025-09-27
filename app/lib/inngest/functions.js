import { db } from "@/lib/prisma";
import { inngest } from "./client";
import EmailTemplate from "@/emails/template";
import { sendEmail } from "@/action/sendEmail";


export const checkBudgetAlert = inngest.createFunction(
    {name: 'Check Budget Alert'},
    {cron: "0 */6 * * *" },
    async({step})=>{
        const budgets= await step.run("fetch budget", async()=>{
            return await db.budget.findMany({
                include:{
                    user:{
                        include:{
                            accounts:{
                                where:{
                                    isDefault:true,
                                },
                            },
                        },
                    },
                },
            });
        });
        for(const budget of budgets){
            const defaultAccount = budget.user.accounts[0];
            if(!defaultAccount) continue;
            await step.run(`check budget, ${budget.id}`, async()=>{
                
                const currentDate = new Date();
                const startOfMonth=new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                );
                const endOfMonth = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    0
                );
                const expenses = await db.transaction.aggregate({
                    where:{
                        userId: budget.userId,
                        accountId: defaultAccount.id,
                        type: 'EXPENSE',
                        date: {
                            gte: startOfMonth,
                            lte: endOfMonth,
                        },
                    },
                    _sum:{
                        amount: true,
                    },
                });
                const totalExpenses = expenses._sum.amount?.toNumber() || 0;
                const budgetAmount = budget.amount.toNumber ? budget.amount.toNumber() : budget.amount;
                const percentageUsed = budgetAmount > 0 ? (totalExpenses / budgetAmount) * 100 : 0;

                console.log(`Budget check for user ${budget.user.email}: ${percentageUsed.toFixed(1)}% used`);
                
                if(percentageUsed >= 80 && (!budget.lastAlertSent || 
                    isNewMonth(new Date(budget.lastAlertSent), new Date()))
                ){
                    console.log(`Sending budget alert to ${budget.user.email}`);
                    // send email
                    await sendEmail({
                        to: budget.user.email,
                        subject: `Budget Alert - ${defaultAccount.name}`,
                        react: EmailTemplate({
                            userName: budget.user.name,
                            type: "budget-alert",
                            data:{
                                percentageUsed,
                                budgetAmount: budgetAmount.toNumber ? budgetAmount.toNumber() : budgetAmount,
                                totalExpenses: totalExpenses,
                                accountName: defaultAccount.name,
                            },
                        }),
                    });
                    
                    // update last alert sent
                    await db.budget.update({
                        where:{id: budget.id},
                        data:{lastAlertSent: new Date()},
                    });
                  }
            })
        }
    },
);
function isNewMonth(lastAlertDate, currentDate){
    return lastAlertDate.getMonth() !== currentDate.getMonth() ||
           lastAlertDate.getFullYear() !== currentDate.getFullYear();
}