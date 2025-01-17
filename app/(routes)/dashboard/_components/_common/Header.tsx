'use client'
import Logo from '@/components/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogOutIcon } from 'lucide-react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'


function Header() {
    const { user } = useKindeBrowserClient();
    const pathName = usePathname();
    const { formId } = useParams();

    const NAV_MENUS = [
        {
            name: "Dashboard",
            pathname: "/dashboard",
            isDisabled: false,
        },
        {
            name: "Pricing",
            pathname: "#",
            isDisabled: true,
        },
    ];

    const Dashboard_menus = [
        {
            name: "Builder",
            pathname: `/dashboard/form/builder/${formId}`,
            isDisabled: false,
        },
        {
            name: "Responds",
            pathname: `/dashboard/form/responds/${formId}`,
            isDisabled: false,
        },
    ]


    return (
        <header className='sticky top-0 z-50 h-16 flex items-center gap-4 bg-gradient-to-r from-primary to-primary/80 px-4 md:px-6'>
            <nav className=' gap-6 h-full text-lg font-medium flex justify-between w-full'>
                <div className="flex items-center mr-5 pr-8 border-r border-green-600">
                    <Logo url='/dashboard' />
                    <span className='sr-only'>FormEdge</span>
                </div>

                <ul className='hidden flex-row md:flex'>
                    {
                        NAV_MENUS.map(({ name, pathname, isDisabled }) => (
                            <li key={pathname} className='relative h-full'>
                                <Link

                                    href={pathname}
                                    className={cn(`text-slate-100 text-lg font-normal z-[999] flex items-center px-3 justify-center h-full transition-colors hover:text-opacity-90`, { "opacity-80 !pointer-events-none": isDisabled })}
                                >
                                    {name}
                                </Link>
                                {
                                    pathName === pathname && (
                                        <div
                                            className="absolute 
                      top-0 
                      left-0
                      right-0 
                      h-full
                      bg-green-600
                      transition-colors
                      ease-in-out
                      -z-[1]"
                                        />
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>


                <div className="flex items-center gap-1 justify-end w-full">
                    {
                        pathName.includes("builder") && (
                            <ul className='hidden flex-row md:flex mr-5'>
                                {
                                    Dashboard_menus.map(({ name, pathname, isDisabled }) => (
                                        <li key={pathname} className='relative h-full'>
                                            <Link

                                                href={pathname}
                                                className={cn(`text-white text-lg font-normal z-[999] flex items-center px-3 justify-center h-full transition-colors hover:text-opacity-90`, { "opacity-80 !pointer-events-none": isDisabled })}
                                            >
                                                {name}
                                            </Link>
                                            {
                                                pathName === pathname && (
                                                    <div
                                                        className="absolute 
                                  top-0 
                                  left-0
                                  right-0 
                                  h-full
                                  bg-green-600
                                  transition-colors
                                  ease-in-out
                                  !text-white
                                  rounded-md
                                  -z-[1]"
                                                    />
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div role='button' className="flex items-center gap-2">
                                <Avatar className='size-10 bg-gray-200 shrink-0 rounded-full ring-2 ring-lime-400'>
                                    <AvatarImage
                                        src={user?.picture || ""}
                                        alt="User avatar"
                                    />
                                    <AvatarFallback className='rounded-lg'>
                                        {user?.given_name?.charAt(0)}
                                        {user?.family_name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-5 p-2 md:p-5 border-lime-400 shadow-lg'>
                            <DropdownMenuLabel>
                                <div className="flex items-center gap-2">
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className='truncate font-semibold text-slate-900'>
                                            {user?.given_name} {user?.family_name}
                                        </span>
                                        <p className='truncate block w-full text-sm max-w-[150px] text-slate-600'>
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuItem className='mt-5 cursor-pointer'>
                                <LogoutLink className='flex w-full items-center justify-center gap-1' >
                                    <LogOutIcon className='size-4' />
                                    <span className=' flex justify-center items-center'>Logout</span>
                                </LogoutLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    )
}

export default Header