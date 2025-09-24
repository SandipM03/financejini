// url: http://localhost:3000/api/seed
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { seedTransactions } from '@/action/seed';
export async function GET() {
 const result = await seedTransactions();
 return NextResponse.json(result);
}
