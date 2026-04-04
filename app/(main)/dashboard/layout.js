import React, { Suspense } from 'react'
import DashboardPage from './page'
import RingLoader from 'react-spinners/RingLoader'
const DashboardLayout = () => {
  return (
    <div className='px-5'>
        <h1 className='text-6xl font-bold text-[#FF4D00]'>Dashboard</h1>
        <Suspense fallback={<RingLoader className='mt-4' width={"100%"} color="#9333ea" />}
        >
           <DashboardPage />
        </Suspense>
        
    </div>
  )
}

export default DashboardLayout