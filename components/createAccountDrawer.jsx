"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import{
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { accountSchema } from '@/app/lib/schema'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import useFetch from '@/hooks/use-fetch'
import { createAccount } from '@/action/dashboard'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
const CreateAccountDrawer = ({children}) => {
    const [open, setOpen] = useState(false)
    const {
        register,
        handleSubmit, 
        formState: {errors},
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: '',
            type: 'CURRENT',
            balance: '',
            isDefault: false,
        }
    })
    const {data:newAccount, 
        loading:createAccountLoading,
         error, 
         fn:createAccountFn,
        } = useFetch(createAccount);
    useEffect(() => {
      if(newAccount && !createAccountLoading){
        toast.success('Account created successfully')
        reset();
        setOpen(false);
      }
        
    },[createAccountLoading,newAccount])
    useEffect(() => {
        if(error){
           toast.error(error.message || 'failed to create account') 
        }
    },[error])
    const onSubmit =async (data) => {
       await createAccountFn(data)
    }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
            </DrawerHeader>
            <div className='px-4 pb-4'>
                <form className='sapace-y-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-2'>
                        <label htmlFor='name' className='text-sm font-medium'>Account Name</label>
                        <Input
                        id='name'
                        className='w-full'
                        placeholder='e.g., Main Checking'
                        {...register('name')} 
                        />{errors.name && (
                            <p className='text-sm text-red-600'>{errors.name.message}</p>
                        )}
                    </div>

                    {/* account type */}
                    <div className='space-y-2  '>
                        <label htmlFor='type' className='text-sm font-medium'>
                            Account Type</label>
                        <Select 
                        onValueChange={(value) => setValue('type', value)} 
                        defaultValue={watch('type')}>
                        <SelectTrigger id='type' className='w-full'>
                            <SelectValue placeholder="Select Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CURRENT">Current</SelectItem>
                            <SelectItem value="SAVINGS">Savings</SelectItem>
                            
                        </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className='text-sm text-red-600'>{errors.type.message}</p>
                        )}
                    </div>


                    {/* <Input balance */}
                    <div className='space-y-2'>
                        <label htmlFor='balance' className='text-sm font-medium'>Initial Balance</label>
                        <Input
                        id='balance'
                        type='number'
                        step='0.01'
                        className='w-full'
                        placeholder='e.g., 1000'
                        {...register('balance')} 
                        />{errors.balance && (
                            <p className='text-sm text-red-600'>{errors.balance.message}</p>
                        )}
                    </div>



                    <div className='flex items-center justify-between rounded-lg border p-2 mt-4'>
                        <div>
                        <label htmlFor='isDefault' className='text-sm font-medium cursor-pointer'>
                        Set as Default Account</label>
                        <p className='text-sm text-muted-foreground'>account will be selected as default  </p>
                        </div>
                        
                        <Switch id='isDefault' onCheckedChange={(checked) => setValue('isDefault',checked )} 
                        checked={watch('isDefault')} />

                    </div>

                    <div className='flex gap-4 mt-4'>
                        <DrawerClose asChild>
                            <Button type='button' variant='outline' className='flex-1'>Cancel</Button>

                        </DrawerClose>
                        <Button  type='submit' className='flex-1'
                        disabled={createAccountLoading}
                        >
                        
                        {createAccountLoading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Creating...
                            </>
                        ) : (
                            'Create Account'
                            )}
                        </Button>
                    </div>

                </form>
            </div>
            
        </DrawerContent>
    </Drawer>
  )
}

export default CreateAccountDrawer