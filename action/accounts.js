"use server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
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