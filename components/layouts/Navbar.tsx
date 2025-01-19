"use client"

import { Bell, Blend, SunMoon } from 'lucide-react'
import Image from 'next/image'
import userImg from '@/public/img/user.jpg'
import React from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    const handleThemeChange = () => {
        if (theme === 'dark') setTheme('light')
        else setTheme('dark')
    }

    return (
        <div className='w-full p-2 md:p-4'>
            <div className='w-full px-4 md:px-12 flex items-center justify-between h-16 rounded-2xl bg-background shadow-md'>
                <Link href='/' className='flex items-center gap-2 font-semibold w-12 bg-primary rounded-full px-2'>
                    <Blend className='min-w-4' /> Organiz.
                </Link>

                <div className='flex items-center gap-6'>
                    <div className='relative flex items-center cursor-pointer' onClick={handleThemeChange}>
                        <SunMoon size={20} />
                    </div>

                    <div className='relative flex items-center cursor-pointer'>
                        <div className='w-1.5 aspect-square rounded-full absolute -top-1 -right-1 bg-red-500'></div>
                        <Bell size={18} />
                    </div>

                    <div className='relative flex items-center cursor-pointer'>
                        <Image src={userImg} alt='user_img' className='w-10 aspect-square rounded-full object-cover' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar