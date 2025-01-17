import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = isAuthenticated();

  if (!isUserAuthenticated) redirect("/dashboard");

  return <div className="w-full h-auto">{children}</div>;
}
