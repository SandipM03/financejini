"use client"
import { endOfDay, format, subDays,startOfDay} from 'date-fns';
import React,{useState} from 'react'
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { set } from 'zod/v3';
const DATE_RANGES={
     '7D':{label:"Last 7 Days", days:7},
     '1M':{label:"Last 1 Month", days:30},
     '3M':{label:"Last 3 Months", days:90},
     '6M':{label:"Last 6 Months", days:180},
    ALL:{label:"All Time", days:null},
}
const AccountChart = ({transactions}) => {
    const [dateRange,setDateRange]=useState('1M');
    //filter and group transactions by date
    const filteredData=useMemo(()=>{
      const range=DATE_RANGES[dateRange];
      const now=new Date();
      const startDate=range.days? startOfDay(subDays(now,range.days))
      : startOfDay(new Date(0));

      const filtered=transactions.filter((t)=> 
        new Date(t.date)>=startDate && new Date(t.date)<=endOfDay(now)
      );
      
      const grouped=filtered.reduce((acc,transaction)=>{
        const date=format(new Date(transaction.date),'MM dd');
        if(!acc[date]){
          acc[date]={date, income:0, expense:0};
        }
        if(transaction.type === 'INCOME'){
          acc[date].income += transaction.amount;
        }else{
          acc[date].expense += transaction.amount;
        }
        return acc;
       
      },{})
       //convert to array and sort by date
        return Object.values(grouped).sort(
          (a,b)=> new Date(a.date) - new Date(b.date)
        );
    },[transactions,dateRange]);
    //console.log(filteredData);
  const totals=useMemo(()=>{
    return filteredData.reduce(
      (acc,cur)=>({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),{income:0,expense:0}
    )
  },[filteredData]);  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
           {Object.entries(DATE_RANGES).map(([key,{label}])=>{
            <SelectItem key={key} value={key}>{label}</SelectItem>
           })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <p>{/* <ResponsiveContainer width="100%" height="100%">
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
    </BarChart>
    </ResponsiveContainer>  */}
    </p>
      </CardContent>
      
    </Card>

    
    
  )
}

export default AccountChart