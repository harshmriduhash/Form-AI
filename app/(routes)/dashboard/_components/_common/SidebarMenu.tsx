'use client'
import { cn } from '@/lib/utils';
import { Blocks, LucideIcon, MessageSquare } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

type SideNavType = {
    title: string;
    url: string;
    icon: LucideIcon;
}

const SidebarMenu = () => {

    const { formId } = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const sidebarMenus: SideNavType[] = [
        {
            title: "Builder",
            url: `/dashboard/form/builder/${formId}`,
            icon: Blocks
        },
        {
            title: "Responds",
            url: `/dashboard/form/responds/${formId}`,
            icon: MessageSquare
        },
    ];





    return (
        <div className='fixed h-screen z-40 -ml-1 -my-1 w-[50px] pt-5 border-r shadow-sm bg-gradient-to-b from-primary to-primary/80 text-white'>
            <ul className='p-0 flex items-center flex-col gap-2'>
                {
                    sidebarMenus.map((menu: SideNavType) => (
                        <li key={menu.url}>
                            <button
                                className={cn(`outline-none transition-colors ease-in-out p-2 hover:bg-slate-50 hover:text-slate-900 rounded-md`, {
                                    "bg-slate-50 text-slate-900": menu.url === pathname
                                })}
                                onClick={() => {
                                    router.push(menu.url)
                                }}
                            >
                                <menu.icon className='!size-5' />
                                <span className='sr-only'>{menu.title}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SidebarMenu