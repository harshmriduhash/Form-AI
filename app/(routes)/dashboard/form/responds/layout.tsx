

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex h-[calc(100vh_-_65px)]
   w-full flex-row"
    >
      <div className="flex relative w-[45px]">
        {/* <SidebarMenu /> */}
      </div>
      <main className="w-full flex-1 ">{children}</main>
    </div>
  );
}
