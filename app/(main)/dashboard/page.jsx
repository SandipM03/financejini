import React from 'react'
import CreateAccountDrawer from '@/components/createAccountDrawer'
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getUserAccount } from '@/action/dashboard';
import AccountCard from './_components/accountcard';
import { getCurrentBudget } from '@/action/budget';
import BudgetProgress from './_components/budgetprogress';
async function Dashboard() {
  const accounts = await getUserAccount();
  const defaultAccount= accounts?.find((account)=>account.isDefault);
  let budgetData=null;
  if(defaultAccount){
   budgetData= await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className='space-y-8'>
      {/* Budget progress */}
      {defaultAccount && <BudgetProgress
      initialBudget={budgetData?.budget}
      currentExpenses={budgetData?.currentExpenses || 0}
      />}

      {/* Overview */}
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