import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const NotFound = () => {
  return (
    <div>
        <h1>
             Not Found
        </h1>
    <Link href="/">
    <Button>
    Return Home
    </Button>
    </Link>
   </div>
  )
}

export default NotFound