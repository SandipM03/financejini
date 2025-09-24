"use client";
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns';
import {categoryColors} from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { Clock, RefreshCw } from 'lucide-react';


const TransactionTable = ({ transactions }) => {
  const filteredAndSortedTransactions = transactions;
  const handleSort=()=>{};
  const recurring_interval = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
  }
  return (


    <div className='space-y-4'>
      
    <div className=' rounded-md border'>

    
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">
        <Checkbox />
      </TableHead>
      <TableHead 
      className="cursor-pointer" 
      onClick={() => handleSort('date')}
      >
        <div className='flex items-center'>Date</div>
      </TableHead>
    
    <TableHead>Description</TableHead>
    <TableHead 
    className="cursor-pointer" 
    onClick={() => handleSort('category')}
    >
      <div className='flex items-center'>Category</div>
    </TableHead>
    <TableHead 
    className="cursor-pointer" 
    onClick={() => handleSort('amount')}
    >
      <div className='flex items-center'>Amount</div>
    </TableHead>
    <TableHead>Recuring</TableHead>
    <TableHead className="w-[50px]"/>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredAndSortedTransactions.length===0?(
      <TableRow>
        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
          No transactions found.
        </TableCell>
      </TableRow>
    ):(
      filteredAndSortedTransactions.map((transaction)=>(
        <TableRow key={transaction.id} className="hover:bg-muted">
        <TableCell >
          <Checkbox />
        </TableCell>
        <TableCell>{format(new Date(transaction.date),"pp")}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell className="capitalize">
        <span 
          style={{background: categoryColors[transaction.category]}}
          className='px-2 py-1 rounded text-white text-sm'>
          {transaction.category}
        </span>
        </TableCell>
        <TableCell 
          className='text-right font-medium' 
          style={{color: transaction.type==="EXPENSE"?"#ef4444":"#22c55e"}}>
          {transaction.type==="EXPENSE"?"-":"+"}$
          {transaction.amount.toFixed(2)}
        </TableCell>

        {/* <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell> */}
        <TableCell>{transaction.isRecurring?(
          <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className='gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200'>
                  <RefreshCw className='w-3 h-3 '/>
                  {recurring_interval[transaction.recurringInterval]}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className='text-sm'>
                  <div className='font-medium'>Next Date:</div>
                  <div>
                    {format(new Date(transaction.nextRecurringDate),
                     "PP")}

                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
        ):(
          <Badge variant="outline" className='gap-1'>
            <Clock className='w-3 h-3 '/>
            One-time</Badge>
        )}</TableCell>
      </TableRow>
      ))
    
    )}
  </TableBody>
</Table>
</div>
</div>
  )
}

export default TransactionTable