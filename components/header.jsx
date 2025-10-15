import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'
import { Menu } from "lucide-react"
const Header =async () => {
  await checkUser();
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/10">
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-5 rounded-sm bg-[#FF4D00]" aria-hidden />
          <div className=''>
            <span className="text-gray-900 text-sm font-medium tracking-tight">Finance</span>
          <span className="text-[#FF4D00] text-sm font-medium tracking-tight">Jini</span>
          </div> 
        </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="#features" className="text-muted-foreground hover:text-[#FF4D00]">
              Features
            </Link>
            <Link href="#how" className="text-muted-foreground hover:text-[#FF4D00]">
              How it works
            </Link>
            <Link href="#insights" className="text-muted-foreground hover:text-[#FF4D00]">
              Insights
            </Link>
          </nav>

        
        <div className='flex items-center gap-2'>
            <SignedIn>
                <Link href='/dashboard'
                    className='text-[#FF4D00] hover:text-blue-100 flex items-center gap-2'>
                    <Button variant="ghost" className="hidden md:inline-flex">
                        <LayoutDashboard size={18} />
                        <span className='hidden md:inline hover:[#FF4D00]'>
                        Dashboard   
                        </span>
                    </Button>
                </Link>
                <Link href='/transaction/create'>
                    <Button  className='flex items-center gap-2 text-amber-50 bg-[#FF4D00]'>
                        <PenBox size={18} />
                        <span className='hidden md:inline  '>
                        Transactions
                        </span>
                    </Button>
                </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton forceRedirectUrl='/dashboard'>
                <Button  className='bg-white text-gray-900 hover:bg-[#FF4D00] hover:text-white'>
                    Login
                </Button>
              </SignInButton>
              <SignUpButton>
                {/* <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button> */}
                <Button className=' bg-[#FF4D00] text-white hover:bg-white hover:text-gray-900'>
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
        
        

      </div>
    </div>
    </header>
  )
}

export default Header