'use client'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import { useBuilder } from '@/context/builderProvider'
import { cn } from '@/lib/utils'
import { FileTextIcon, Home } from 'lucide-react'
import { ComponentProps, useState } from 'react'
import FormBlockBox from './FormBlockBox'
import FormThemes from './FormSettings'

type Props = {
    rest?: ComponentProps<typeof Sidebar>
}

const BuilderSideBar = ({ rest }: Props) => {
    const [tab, setTab] = useState<"blocks" | "settings">("blocks")
    const { formData, loading } = useBuilder();
    return (
        <Sidebar
            className='border-r left-12 pt-16'
            {...rest}
        >
            <SidebarHeader>
                <header className='border-b border-gray-200 w-full py-1 flex shrink-0 items-center gap-2'>
                    <div className="flex items-center gap-2 px-4">
                        <Home className='-ml-1 size-4' />
                        <Separator orientation='vertical' className='mr-2 h-4' />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem className='hidden md:block'>
                                    <BreadcrumbPage className='flex items-center gap-1'>
                                        <FileTextIcon className='size-4 mb-1' />
                                        <h6 className='truncate flex w-[100px] text-sm'>{
                                            loading ? "Loading..." : formData?.name || "Untitled"
                                        }</h6>
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
            </SidebarHeader>

            <SidebarContent className=''>
                <div className="w-full">
                    <div className="w-full flex flex-row gap-1 h-[39px] rounded-full bg-slate-100 p-1">
                        <button
                            className={cn(`p-1 flex-1 bg-transparent transition-colors ease-in-out rounded-full text-sm`, {
                                "bg-white font-medium shadow": tab === "blocks"
                            })}
                            onClick={() => setTab("blocks")}
                        >
                            Blocks
                        </button>
                        <button
                            className={cn(`p-1 flex-1  bg-transparent transition-colors ease-in-out rounded-full text-sm`, {
                                "bg-white font-medium shadow": tab === "settings"
                            })}
                            onClick={() => setTab("settings")}
                        >
                            Themes
                        </button>

                    </div>
                    {/* //TODO: Form Blocks  */}
                    {tab === 'blocks' && <FormBlockBox />}
                    {/* //TODO: Form Themes  */}
                    {tab === 'settings' && <FormThemes />}
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

export default BuilderSideBar