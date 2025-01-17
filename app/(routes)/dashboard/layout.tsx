import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Header from "./_components/_common/Header";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
        return redirect("/");
    }


    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <div className="w-full flex-1">
                <div>{children}</div>
            </div>
        </div>
    );
}
