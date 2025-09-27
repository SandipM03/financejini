import AddTransactionForm from '../_components/transactionFrom'
import { getUserAccount } from '@/action/dashboard'
import { defaultCategories } from '@/data/categories';
import React from 'react'
const AddTransactionPage = async() => {
  const accounts = await getUserAccount();

  return (
  <div className='max-w-3xl mx-auto px-5'>
  <h1 className='text-5xl mb-8'>Add Transaction</h1>

  <AddTransactionForm accounts={accounts} categories={defaultCategories}/>
  </div>
  )
}

export default AddTransactionPage