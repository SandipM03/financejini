"use client";
import React, { useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns';
import {categoryColors} from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCw, SearchIcon, Trash, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/use-fetch';
import { bulkDeleteTransaction } from '@/action/accounts';
import BasicToast from '@/components/ui/BasicToast';
import { BarLoader} from 'react-spinners';
const TransactionTable = ({ transactions }) => {

  const router= useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ field:"date", direction:"desc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
const handleShowToast = (options) => {
  if (typeof options === 'string') {
    setToastType(options);
  } else {
    setToastType(options.type || "success" | "error" | "info" | "warning");
  }
  setShowToast(true);
}
const {
  loading:deleteLoading,
  fn:deleteFn,
  data:deleted,
}=useFetch(bulkDeleteTransaction)

const handleBulkDelete=async()=>{
  if(!window.confirm(
    `Are you sure you want to delete ${selectedIds.length} transactions?`)
  ){return;}

  await deleteFn(selectedIds);
}

useEffect(()=>{
  if(deleted?.success){
    handleShowToast({ type: "success", message: deleted.message || "Transactions deleted successfully" });
    setSelectedIds([]); // Clear selection after successful delete
  }
},[deleted])

useEffect(()=>{
  if(deleted?.error){
    handleShowToast({ type: "error", message: deleted.error || "Failed to delete transactions" });
  }
},[deleted])
const filteredAndSortedTransactions = useMemo(()=>{
  let result=[...transactions];
  //apply search filter
  if(searchTerm){
    const searchLower= searchTerm.toLowerCase();
    result=result.filter((transaction)=>
    transaction.description?.toLowerCase().includes(searchLower)
    );
  }
  //apply recurring filter
  if(recurringFilter){
    result=result.filter((transaction)=>{
     if(recurringFilter==="recurring") return transaction.isRecurring;
    return !transaction.isRecurring;
  });
  }
  //apply type filter
  if(typeFilter){
    result=result.filter((transaction)=>transaction.type===typeFilter);
  }
  //apply sorting filter
  result.sort((a,b)=>{
    let comprasion=0;
    switch(sortConfig.field){
      case "date":
        comprasion=new Date(a.date)-new Date(b.date);
        break;
      case "amount":
        comprasion=a.amount-b.amount;
        break;
      case "category":
        comprasion=a.category.localeCompare(b.category);
        break;
      default:
        comprasion=0;
    }
    return sortConfig.direction==="asc"? comprasion:-comprasion;
  })

  return result;

},[
  transactions,
  searchTerm,
  typeFilter,
  recurringFilter,
  sortConfig,
]);
  
const recurring_interval = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
  }
  const handleSort=(field)=>{
    setSortConfig(current=>({
      field,
      direction: current.field===field && (current.direction==="asc"?"desc":"asc")
    }))
  };
  const handleSelect=(id)=>{
    setSelectedIds(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id])
  }
  //console.log(selectedIds);
  
  const handleSelectAll=()=>{
      setSelectedIds(current=>current.length===filteredAndSortedTransactions.length?[]:filteredAndSortedTransactions.map(t=>t.id))
  }
  //console.log(handleSelectAll);
  const handleClearFilters=()=>{
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setSelectedIds([]);
  }


  return (
    <TooltipProvider>
      <div className='space-y-4 '>
        {deleteLoading && (<BarLoader className='mt-4' width={'100%'} color='#933ea'/>)}
        {showToast && (
          <BasicToast
            message={deleted?.message || "Transactions deleted successfully"}
            type={toastType}
            duration={5000}
            onClose={() => setShowToast(false)}
          />
        )}
      {/* filter */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='relative flex-1'>
          <SearchIcon className='absolute left-2 top-2.5 w-4 text-muted-foreground'/>
          <Input
          placeholder='Search by description, category'
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
           className='pl-8'/>
        </div>
          <div className='flex gap-2 '>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INCOME">Income</SelectItem>
                    <SelectItem value="EXPENSE">Expense</SelectItem>

                  </SelectContent>
            </Select>

            <Select value={recurringFilter} onValueChange={(value)=>{setRecurringFilter(value); setCurrentPage(1);}}>
                  <SelectTrigger className='w-[140px]'>
                    <SelectValue placeholder="All Transactions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recurring">Recurring Only</SelectItem>
                    <SelectItem value="non-recurring">Non-Recurring Only</SelectItem>
                  
                  </SelectContent>
            </Select>
            {selectedIds.length>0 &&(<div className='flex items-center gap-2'>
              <Button variant='destructive' size="sm" onClick={handleBulkDelete}>
                <Trash className='h-4 w-4 mr-2'/>
                Delete Selected : ({selectedIds.length})
              </Button>
            </div>
              )}

              {(searchTerm || typeFilter || recurringFilter) &&(
                <Button 
                  variant='outline' 
                  size='icon'
                  onClick={handleClearFilters} 
                  title="clear Filters"
                >
                  <X className='h-4 w-5'/>
                </Button>
              )}
          </div>

      </div>
      
    <div className=' rounded-md border'>

    
      <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">
        <Checkbox onCheckedChange={handleSelectAll}
        checked={selectedIds.length===filteredAndSortedTransactions.length && filteredAndSortedTransactions.length>0}
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
           checked={selectedIds.includes(transaction.id)}
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
              <DropdownMenuItem
              onClick={()=>
                router.push(
                  `/transaction/create?edit=${transaction.id}`
                )
              }
              >Edit</DropdownMenuItem>
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
    </TooltipProvider>
  )
}

export default TransactionTable