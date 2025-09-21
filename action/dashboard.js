"use server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { th } from "date-fns/locale";

//as nextjs doesnot support float, we need to convert balance to float number
const searializeTransaction=(obj)=>{
    const searialized={...obj};
    if(obj.balance){
        searialized.balance=obj.balance.toString();
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
        const account= await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                currency:data.currency,
                userId:user.id,
                isDefault:shouldBeDefault,
            },
        });

        const searializedAccount=searializeTransaction(account);
        revalidatePath('/dashboard');
        return {success:true, account:searializedAccount};
    } catch (error) {
        throw new Error(error.message);
    }
}