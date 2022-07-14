import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='' >
        <nav className='flex items-center justify-between lg:p-3 py-3 px-1'>
            <div className='flex items-center gap-x-4'>
                <div className="">
                    <Link href={'/'} ><img src="https://links.papareact.com/yvf" alt="Logo" className='w-44 object-contain'/></Link>
                </div>
                <div className='hidden md:inline-flex items-center gap-x-6' >
                    <h1>About</h1>
                    <h1>Contact</h1>
                    <h1 className='text-white bg-green-700 px-4 py-1 rounded-full' >Follow</h1>
                </div>
            </div>
            <div className="flex text-green-700 items-center lg:gap-x-4 gap-x-2 whitespace-nowrap">
                <h1>Sign In</h1>
                <h1 className='px-4 py-1 border-2 border-green-700 rounded-full ' >Get Started</h1>
            </div>
            
        </nav>
    </header>
  )
}

export default Header