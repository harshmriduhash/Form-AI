import BuilderProvider from "@/context/builderProvider";
import SidebarMenu from "../_components/_common/SidebarMenu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
// import { useEffect } from "react";

export default function FormLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = isAuthenticated();

    if (!isUserAuthenticated) redirect("/api/auth/login?post_login_redirect_url=/dashboard")

    // useEffect(() => {})


    return (
        <BuilderProvider>
            <div className="flex w-full flex-row h-[calc(100vh - 65px)]">
                <div className="hidden md:flex relative w-[45px]">
                    <SidebarMenu />
                </div>
                <main className="w-full flex-1">
                    {children}
                </main>
            </div>
        </BuilderProvider>
    );
}
