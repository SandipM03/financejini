"use client";
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {createTransaction} from '@/action/transaction'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionSchema } from '@/app/lib/schema'
import useFetch from '@/hooks/use-fetch'
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import CreateAccountDrawer from '@/components/createAccountDrawer';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const AddTransactionForm = ({accounts, categories}) => {
  const router = useRouter();
  const {register, setValue,handleSubmit, formState: {errors},watch,getValues,reset} = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:{
      type: 'EXPENSE',
      amount: '',
      description: '',
      accountId: accounts.find((ac)=>ac.isDefault)?.id,
      date:new Date(),
      isRecurring: false,
    
    }
  })

  const {
    loading:transactionLoading,
    fn:transactionFn,
    data:transactionResult,
  }= useFetch(createTransaction);
  const type = watch('type');
  const isRecurring= watch('isRecurring');
  const date= watch('date');
  const onSubmit = async(data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };
    transactionFn(formData);
  }
  useEffect(()=>{
    if(transactionResult && !transactionLoading){
      toast.success('Transaction created successfully');
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  },[transactionResult, transactionLoading])

  const filteredCategories= categories.filter((category)=>category.type === type);
  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {/* scanner */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Type</label>
        <Select onValueChange={(value)=>setValue('type', value)} 
                defaultValue={type}>
          <SelectTrigger>
            <SelectValue placeholder="select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>

          </SelectContent>
        </Select>
        {errors.type &&
        (<p className='text-red-500 text-sm'>{errors.type.message}</p>)}
      </div>

      {/* account */}
      <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Amount</label>
            <Input
            type='number'
            step='0.01'
            placeholder='0.00'
            {...register('amount')}
            />
            {errors.amount &&
            (<p className='text-red-500 text-sm'>{errors.amount.message}</p>)}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium'>Account</label>
            <Select onValueChange={(value)=>setValue('accountId', value)} 
                    defaultValue={getValues('accountId')}>
              <SelectTrigger>
                <SelectValue placeholder="select Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}  ($ {parseFloat(account.balance).toFixed(2)})
                  </SelectItem>
                ))}
                <CreateAccountDrawer>
                  <Button variant='ghost' className='w-full select-none items-center text-sm outline-none'>Create Account</Button>
                </CreateAccountDrawer>
              </SelectContent>
            </Select>
            {errors.accountId &&
            (<p className='text-red-500 text-sm'>{errors.accountId.message}</p>)}
          </div>
      </div>
      {/* category */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Category</label>
        <Select onValueChange={(value)=>setValue('category', value)} 
                defaultValue={getValues('category')}>
          <SelectTrigger>
            <SelectValue placeholder="select Category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => ()=>(
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}

          </SelectContent>
        </Select>
        {errors.category &&
        (<p className='text-red-500 text-sm'>{errors.category.message}</p>)}
      </div>
      {/* date */}

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-full pl-3 font-normal  text-left'>
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date)=>setValue('date', date)}
              disabled={(date)=>date>new Date() || date < new Date('1900-01-01')}
              initialFocus
              />

          </PopoverContent>
        </Popover>
        {errors.date &&
        (<p className='text-red-500 text-sm'>{errors.date.message}</p>)}
      </div>
      {/* description */}
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Description</label>
        <Input placeholder='Enter description' {...register('description')} />
        {errors.description &&(
          <p className='text-red-500 text-sm'>{errors.description.message}</p>
        )}
      </div>
      {/* isRecurring */}
      <div className='flex items-center justify-between rounded-lg border p-2 mt-4'>
          <div className='space-y-0.5'>
            <label htmlFor='isDefault' className='text-sm font-medium cursor-pointer'>
               Set as Default Transaction</label>
            <p className='text-sm text-muted-foreground'>
              set up a recurring transaction</p>
          </div>
                        
          <Switch 
          checked={isRecurring}
          onCheckedChange={(checked) => setValue('isRecurring',checked )}
          />                            

      </div>
      {isRecurring && (
        <div className='space-y-2'>
        <label className='text-sm font-medium'>Recurring Interval</label>
        <Select onValueChange={(value)=>setValue('recurringInterval', value)} 
                defaultValue={getValues('recurringInterval')}>
          <SelectTrigger>
            <SelectValue placeholder="select Recurring Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DAILY">Daily</SelectItem>
            <SelectItem value="WEEKLY">Weekly</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>

          </SelectContent>
        </Select>
        {errors.recurringInterval &&
        (<p className='text-red-500 text-sm'>{errors.recurringInterval.message}</p>)}
        </div>
      )}
      <div className='flex gap-4 pt-2'>
        <Button
        variant='outline'
        className='flex-1'
        type='button'
        onClick={()=>router.back()}
        >
          Cancel
        </Button>
        <Button
        type='submit'
        className='flex-1'
        disabled={transactionLoading}
        >
          Create Transaction
        </Button>

      </div>
    </form>
  )
}

export default AddTransactionForm