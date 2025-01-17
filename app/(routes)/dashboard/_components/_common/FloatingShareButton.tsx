"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBuilder } from "@/context/builderProvider";

const FloatingShareButton = (props: { isSidebarOpen: boolean }) => {
    const { isSidebarOpen } = props;
    const { formData } = useBuilder();

    const copyLinkToClipboard = () => {
        const shareableLink = `https://form-edge-ai.vercel.app/public/submit-form/${formData?.formId}`;
        navigator.clipboard
            .writeText(shareableLink)
            .then(() => {
                toast({
                    title: "Link Copied! 🎈",
                    description: "The form link has been copied to your clipboard. Share it with others!",
                });
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "Failed to copy the link. Please try again.",
                    variant: "destructive",
                });
            });
    };

    if (!formData?.published) return;

    return (
        <div
            className="fixed bottom-5 z-50 
      transition-transform 
      duration-500 ease-in-out"
            style={{
                left: isSidebarOpen ? "calc(41% + 150px)" : "41%",
                transform: "translateX(-50%)",
            }}
        >
            <Button
                onClick={copyLinkToClipboard}
                variant="outline"
                size="lg"
                className="rounded-full !bg-primary
         !text-white p-4 shadow-xl 
         transition-all duration-300 
         hover:scale-105"
                aria-label="Copy Shareable Link"
            >
                <Copy className="w-5 h-5" />
                Share Link
            </Button>
        </div>
    );
};

export default FloatingShareButton;