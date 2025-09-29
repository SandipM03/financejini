import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'
const Header =async () => {
  await checkUser();
  return (
    <div 
    className='bg-blue-100/80 backdrop-blur-md z-50 border-b'>
      <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
        {/* <Link href="/">
        {/* logo 
          <Image src={} alt="lpgp" height={60} width={200}
           className=" h-12 w-auto object-contain" 
          /> 
          
        </Link> */}
        <a href='/' className=" relative z-20 flex items-center w-auto object-contain" >
        <span className='text-2xl font-bold'>
          <span className="text-gray-900">Finance</span>
          <span className="text-purple-600">Jini</span>
        </span>
          
        </a>
        <div className='flex items-center space-x-4'>
            <SignedIn>
                <Link href='/dashboard'
                    className='text-gray-900 hover:text-blue-100 flex items-center gap-2'>
                    <Button variant="outline">
                        <LayoutDashboard size={18} />
                        <span className='hidden md:inline hover:text-purple-600'>
                        Dashboard   
                        </span>
                    </Button>
                </Link>
                <Link href='/transaction/create'>
                    <Button  className='flex items-center gap-2'>
                        <PenBox size={18} />
                        <span className='hidden md:inline '>
                        Transactions
                        </span>
                    </Button>
                </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton forceRedirectUrl='/dashboard'>
                <Button  className='bg-white text-gray-900 hover:bg-[#6c47ff] hover:text-white'>
                    Login
                </Button>
              </SignInButton>
              <SignUpButton>
                {/* <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button> */}
                <Button className=' bg-[#6c47ff] text-white hover:bg-white hover:text-gray-900'>
                    Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton appearance={{
                    avatarBox: { width: 10, height: 10 }
                }} />
            </SignedIn>
            
        </div>
        
        </nav>
    </div>
  )
}

export default Header