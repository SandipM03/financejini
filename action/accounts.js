"use server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { se, ta } from "date-fns/locale";
const searializeTransaction=(obj)=>{
    const searialized={...obj};
    if(obj.balance){
        searialized.balance=obj.balance.toNumber();
    }
    if(obj.amount){
        searialized.amount=obj.amount.toNumber();
    }
    return searialized;
}

export async function updateDefaultAccount(accountId) {
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("User not found");
        
        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });
        if(!user) {
            throw new Error("User not found");
        }

        // First, set all accounts to not default
        await db.account.updateMany({
            where: {userId: user.id, isDefault: true},
            data: {isDefault: false},
        });

        // Then set the specified account as default
        const account = await db.account.update({
            where: {
                id: accountId,
                userId: user.id,
            },
            data: {isDefault: true},
        });

        revalidatePath('/dashboard');
        return {success: true, account: searializeTransaction(account)};
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getAccountWithTransactions(accountId) {
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("User not found");
        
        const user = await db.user.findUnique({
            where: {clerkUserId: userId},
        });
        if(!user) {
            throw new Error("User not found");
        }
        const account = await db.account.findUnique({
            where:{
                id: accountId,
                userId: user.id,
            },
            include: {
                transactions: {
                    orderBy: {date: 'desc'},
                },
                _count:{
                    select:{
                        transactions:true,
                    },
                },
            }
        })
        if(!account) {
            throw new Error("Account not found");
        }
        return{
            ...searializeTransaction(account),
            transactions: account.transactions.map(searializeTransaction),
        }
    } catch (error) {
        console.error(error.message);
        return null;

    }
}

export async function bulckDeleteTransaction(transactionIds){
   try {
    const {userId} = await auth();
     if(!userId) throw new Error("User not found");
         
     const user = await db.user.findUnique({
         where: {clerkUserId: userId},
     });
     if(!user) {
         throw new Error("User not found");
     }
    const transactions = await db.transaction.findMany({
        where:{
            id: {in: transactionIds},
            userId: user.id,
        },
    });
    const accountBalancesChanges=transactions.reduce((acc, transaction)=>{
        const change= transaction.type ==='EXPENSE' 
        ? transaction.amount
        : -transaction.amount;
        acc[transaction.accountId]=(acc[transaction.accountId] || 0) + change;
        return acc;
    },{});
    //delete transactions and update balances in a single transaction
    await db.$transaction(async (tx)=>{
        await tx.transaction.deleteMany({
            where:{
                id: {in: transactionIds},
                userId: user.id,
            },
        });
        for(const [accountId, balanceChange] of Object.entries(
            accountBalancesChanges
        )){
            await tx.account.update({
                where: {id: accountId},
                data: {balance: {increment: balanceChange}},
            });
        }
    })
    revalidatePath('/dashboard');
    revalidatePath('/transactions/[id]');
    return {success: true};
   } catch (error) {
    return {success: false, error: error.message};
   }
}