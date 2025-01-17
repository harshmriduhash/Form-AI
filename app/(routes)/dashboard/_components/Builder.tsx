import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import BuilderSideBar from './BuilderSideBar'
import { defaultBackgroundColor } from '@/constant'
import BuilderBlockCanvas from './BuilderBlockCanvas'
import BuilderBlockProperties from './BuilderBlockProperties'
import FloatingShareButton from './_common/FloatingShareButton'

type Props = {
    isSidebarOpen: boolean
}

const Builder = ({ isSidebarOpen }: Props) => {
    return (
        <>
            <BuilderSideBar />

            <SidebarInset className='!p-0 flex-1'>
                <div className="w-full h-full" style={{ backgroundColor: defaultBackgroundColor }}>
                    <SidebarTrigger className='fixed top-15 z-50 hover:bg-transparent' />
                    <BuilderBlockCanvas />

                    <FloatingShareButton isSidebarOpen={isSidebarOpen} />
                </div>
            </SidebarInset>

            <BuilderBlockProperties />
        </>
    )
}

export default Builder