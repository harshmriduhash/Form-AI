import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import React from "react";

const NotAvaliable = () => {
  return (
    <div
      className="h-screen flex flex-col 
     items-center space-y-4 justify-center"

    >
      <div className="flex-1 flex flex-col 
     items-center space-y-4 justify-center">
        <Frown size="80px" />
        <h2 className="text-xl font-semibold">
          This Form is no longer available
        </h2>
        <Button className="min-w-64">Learn more</Button>
      </div>

      <div
        className="shrink-0 
      min-h-14 text-center flex flex-col items-center justify-center gap-2 pb-5"
      >
        <Logo url="#" color="!text-primary" />
        <p className="text-sm">Developed by <a href="https://www.linkedin.com/in/tahjib/" className="font-bold">Tahjib Hossain Leon</a></p>
      </div>
    </div>
  );
};

export default NotAvaliable;
