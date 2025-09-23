import React from 'react'
import {getAccountWithTransactions} from '@/action/accounts'
import { notFound } from 'next/navigation';
const AccountsPage = async ({ params }) => {
  const accountData = await getAccountWithTransactions(params.id);
  if(!accountData){
    notFound();
  }
  const {transactions,...account}=accountData;

  return (
    <div className='space-y-8 px-5 flex gap-4 items-end justify-between'>
      <div>
        <h1 className='text-5xl sm:text-6xl font-bold  capitalize'>{account.name}</h1>
        <p className='text-muted-foreground'>{account.type.charAt(0).toUpperCase() + account.type.slice(1).toUpperCase()}</p>
      </div>
      <div className='text-right pb-2'>
        <div className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</div>
        <p className='text-sm text-muted-foreground'>{account._count.transactions} Transaction</p>
      </div>
      
      {/* chart Section */}

      {/* transaction table */}
    </div>
  )
}

export default AccountsPage