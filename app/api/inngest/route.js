import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert, generateMonthlyReports, checkBudgetOnTransaction } from "@/lib/inngest/functions";
import { triggerRecurringTransactions, processRecurringTransaction } from "@/lib/inngest/functions";
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
     // <-- This is where you'll always add all your functions
     checkBudgetAlert,
     checkBudgetOnTransaction,
     triggerRecurringTransactions,
     processRecurringTransaction,
     generateMonthlyReports
  ],
});