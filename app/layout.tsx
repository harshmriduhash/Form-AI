import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dm_sans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FormEdge.AI - AI-Powered Form Builder",
  description: "FormEdge.AI is an AI-powered form builder that helps you create forms in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-[#dbf5e1] ${dm_sans.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
