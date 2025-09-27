"use server"
import { Resend } from "resend"
import { success } from "zod";

export async function sendEmail({ to, subject, react }) {
    const resend= new Resend(process.env.RESEND_API_KEY || "");
    try {
        const data = await resend.emails.send({
            from:"FinanceJini App <onboarding@resend.dev>",
            to,
            subject,
            react,
        });
        return {success:true}
    } catch (error) {
        console.error("Error sending email:", error);
        return {success:false, error: error.message};
    }
}