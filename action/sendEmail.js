"use server"
import { Resend } from "resend"


export async function sendEmail({ to, subject, react }) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not set. Skipping email send.");
        return { success: false, error: "RESEND_API_KEY missing" };
    }

    const resend = new Resend(apiKey);
    try {
        const data = await resend.emails.send({
            from: "FinanceJini App <onboarding@resend.dev>",
            to,
            subject,
            react,
        });
        console.log("Resend email response:", data);
        return { success: true, data };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message || String(error) };
    }
}