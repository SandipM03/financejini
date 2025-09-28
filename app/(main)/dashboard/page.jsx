import React, { Suspense } from 'react'
import CreateAccountDrawer from '@/components/createAccountDrawer'
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getDashboardData, getUserAccount } from '@/action/dashboard';
import AccountCard from './_components/accountcard';
import { getCurrentBudget } from '@/action/budget';
import BudgetProgress from './_components/budgetprogress';
import { DashboardOverview } from './_components/transaction_overview';
async function Dashboard() {
  const accounts = await getUserAccount();
  const defaultAccount= accounts?.find((account)=>account.isDefault);
  let budgetData=null;
  if(defaultAccount){
   budgetData= await getCurrentBudget(defaultAccount.id);
  }
const transaction= await getDashboardData()
  return (
    <div className='space-y-8'>
      {/* Budget progress */}
      {defaultAccount && <BudgetProgress
      initialBudget={budgetData?.budget}
      currentExpenses={budgetData?.currentExpenses || 0}
      />}

      {/* Overview */}
        <Suspense fallback={"Loading Overview..."}>
          <DashboardOverview 
          accounts={accounts}
          transactions={transaction || []}/>
        </Suspense>
      {/* Account Grid */}
       <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
        <CreateAccountDrawer>
         <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed'>
          <CardContent className='flex flex-col items-center justify-center text-muted-foreground h-full pt-5'>
            <Plus className='h-10 w-10 mb-2'/>
            <p className='text-sm font-medium'>Create New Account</p>
          </CardContent>
         </Card>
        </CreateAccountDrawer>
        {accounts.length>0 && accounts.map((account) => {
         return <AccountCard key={account.id} account={account} />
        })}
        </div> 
    </div>
  )
}

export default Dashboard;