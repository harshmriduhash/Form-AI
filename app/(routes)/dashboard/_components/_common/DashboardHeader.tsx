'use client'
import React from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function DashboardHeader() {
    const { user, isLoading } = useKindeBrowserClient();
    return (
        <h1 className='text-3xl font-semibold tracking-tight'>
            {
                isLoading ? "Loading..." : `${user?.given_name?.split(" ")[0]}'s Dashboard`
            }
        </h1>
    )
}

export default DashboardHeader