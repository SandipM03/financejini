"use client";
import React,{useState,useEffect, use} from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Pencil,X } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { updateBudget } from '@/action/budget';
import BasicToast from '@/components/ui/BasicToast';

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget?.ammount?.toString() || '');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  
  const handleShowToast = (options) => {
    if (typeof options === 'string') {
      setToastType(options);
      setToastMessage("");
    } else {
      setToastType(options.type || "success");
      setToastMessage(options.message || "");
    }
    setShowToast(true);
  }
  const percentUsed= initialBudget
  ?(currentExpenses/initialBudget.amount)*100
  :0;
  const{
    loading:isLoading,
    fn:updateBudgetFn,
    data:updatedBudget,
    error,
  }=useFetch(updateBudget)
 const handleUpdateBudget=async()=>{
    const amount=parseFloat(newBudget);
    if(isNaN(amount) || amount<=0){
        handleShowToast({type: 'error', message: 'Please enter a valid budget amount'});
        return;
    }
    await updateBudgetFn(amount);
 }
 useEffect(()=>{
    if(updatedBudget?.success){
        setIsEditing(false);
        handleShowToast({type: 'success', message: 'Budget updated successfully'});
    }
 },[updatedBudget]);
 useEffect(()=>{
    if(error){
        handleShowToast({type: 'error', message: error.message || 'Failed to update budget. Please try again.'});
    }
 },[error]);
 const handleCancel=()=>{
    setNewBudget(initialBudget?.amount?.toString() || '');
    setIsEditing(false);
 }
  return (
   
    <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        
        <div className='flex-1'>
            <CardTitle>Monthly Budget (Default Account)</CardTitle>
            <div className='flex items-center gap-2 mt-1'>
            {isEditing ?(
                <div className='flex items-center gap-2'>
                <Input 
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className='w-32'
                placeholder='Enter new budget amount'
                autoFocus
                disabled={isLoading}
                />
                <Button variant='ghost' size='icon' onClick={handleUpdateBudget} disabled={isLoading}>
                    <Check className='h-4 w-4 text-green-500'/>
                </Button>
                <Button variant='ghost' size='icon' onClick={handleCancel} disabled={isLoading}>
                    <X className='h-4 w-4 text-red-500'/>
                </Button>
            </div>
        ):(
           <>
           <CardDescription>
           {initialBudget
              ?`$${currentExpenses.toFixed(2)} of $${initialBudget.amount.toFixed(2)} spent`
              :'No budget set'}
            </CardDescription>
            <Button
             variant='ghost'
                size='icon'
                onClick={() => setIsEditing(true)}
                className='h-6 w-6'
            >
                <Pencil className='h-4 w-4'/>
            </Button>
           </>)}
           </div>
        </div>
        
        
    </CardHeader>
    <CardContent>
        {initialBudget && (<div className='space-y-2'>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                    className={`h-full transition-all duration-300 ${
                        percentUsed >= 90
                        ? 'bg-rose-600'
                        : percentUsed >= 75
                        ? 'bg-amber-500'
                        : percentUsed >= 50
                        ? 'bg-lime-500'       
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                />
            </div>
            <p className='text-xs text-muted-foreground text-right'>
                {percentUsed.toFixed(1)}% of budget used
            </p>
        </div> )}
    </CardContent>
    {showToast && (
        <BasicToast
            message={toastMessage}
            type={toastType}
            duration={3000}
            onClose={() => setShowToast(false)}
        />
    )}
    </Card>

  )
}

export default BudgetProgress