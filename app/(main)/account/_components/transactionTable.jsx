"use client";
import React, { use } from 'react'
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
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { set } from 'zod';
import { Chevron } from 'react-day-picker';
import { tr } from 'date-fns/locale';
const TransactionTable = ({ transactions }) => {
  const filteredAndSortedTransactions = transactions;
  
  const recurring_interval = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
  }
  const router= useRouter();
  const [selectedId, setSelectedId] = React.useState([]);
  const [sortConfig, setSortConfig] = React.useState({ field:"date", direction:"desc" });

  const handleSort=(field)=>{
    setSortConfig(current=>({
      field,
      direction: current.field===field && (current.direction==="asc"?"desc":"asc")
    }))
  };
  const handleSelect=(id)=>{
    setSelectedId(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id])
  }
  //console.log(selectedId);
  
  const handleSelectAll=()=>{
      setSelectedId(current=>current.length===filteredAndSortedTransactions.length?[]:filteredAndSortedTransactions.map(t=>t.id))
  }
  //console.log(handleSelectAll);
  
  return (


    <div className='space-y-4'>
      
    <div className=' rounded-md border'>

    
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">
        <Checkbox onCheckedChange={handleSelectAll}
        checked={selectedId.length===filteredAndSortedTransactions.length && filteredAndSortedTransactions.length>0}
        />
      </TableHead>
      <TableHead 
      className="cursor-pointer" 
      onClick={() => handleSort('date')}
      >
      <div className='flex items-center'>Date
          {sortConfig.field==='date'&&(
          sortConfig.direction==="asc"? (
          <ChevronUp className='w-4 h-4 ml-1'/>
        ):(
        <ChevronDown className='w-4 h-4 ml-1'/>
        ))}
      </div>
      </TableHead>
    
    <TableHead>Description</TableHead>
    <TableHead 
    className="cursor-pointer" 
    onClick={() => handleSort('category')}
    >
      <div className='flex items-center'>Category
        {sortConfig.field==='category'&&(
          sortConfig.direction==="asc"? (
          <ChevronUp className='w-4 h-4 ml-1'/>
        ):(
        <ChevronDown className='w-4 h-4 ml-1'/>
        ))}
      </div>
    </TableHead>
    <TableHead 
    className="cursor-pointer" 
    onClick={() => handleSort('amount')}
    >
      <div className='flex items-center'>Amount
        {sortConfig.field==='amount'&&(
          sortConfig.direction==="asc"? (
          <ChevronUp className='w-4 h-4 ml-1'/>
        ):(
        <ChevronDown className='w-4 h-4 ml-1'/>
        ))}
      </div>
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
          <Checkbox onCheckedChange={() => handleSelect(transaction.id)}
           checked={selectedId.includes(transaction.id)}
          />
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
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4'/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel
              onClick={()=>
                router.push(
                  `/transaction/create?edit=${transaction.id}`
                )
              }
              >Edit</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive'
               onClick={()=>deleteFn([transaction.id])}
               >
                Delete
              </DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
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