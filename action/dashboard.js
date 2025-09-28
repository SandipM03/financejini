"use server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";


//as nextjs doesnot support float, we need to convert balance to float number
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

export async function getUserAccount(){
    const {userId}= await auth();
    if(!userId) throw new Error("User not found")
        const user= await db.user.findUnique({
            where:{clerkUserId:userId},
        });
        if(!user){
            throw new Error("User not found")
        }
        
        try {
            const accounts = await db.account.findMany({
                where: {userId: user.id},
                orderBy: {createdAt: 'desc'},
                include: {
                    _count: {
                        select: {
                            transactions: true
                        }
                    }
                }
            });
            const searializedAccounts = accounts.map(searializeTransaction);
            return searializedAccounts;
        } catch (error) {
            console.error(error.message);
        }
}
//create backAccount action
export async function createAccount(data) {
    try {
        const {userId}= await auth()
        if(!userId) throw new Error("User not found")
        
        const user= await db.user.findUnique({
            where:{clerkUserId:userId},
        });
        if(!user){
            throw new Error("User not found")
        }
        //convert balance to float number
        const balanceFloat=parseFloat(data.balance)
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance")
        }
        const existingAccount = await db.account.findMany({
            where: {userId: user.id},
        });
        const shouldBeDefault = existingAccount.length === 0?true: data.isDefault;
        //if there is no account, make it default
        if(shouldBeDefault){
            await db.account.updateMany({
                where: {userId: user.id, isDefault: true},
                data: {isDefault: false},
            });
        }
        const accounts= await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                currency:data.currency,
                userId:user.id,
                isDefault:shouldBeDefault,
            },
        });

        const searializedAccount=accounts.map(searializeTransaction);
        revalidatePath('/dashboard');
        return {success:true, account:searializedAccount};
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(searializeTransaction);
}


