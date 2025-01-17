"use client";

import React, { useState } from "react";
import { Loader, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useBuilder } from "@/context/builderProvider";
import axios from "axios";

const PublishFormBtn = () => {
    const { formData, setFormData, handleSelectedLayout } = useBuilder();
    const formId = formData?.formId;

    const [isLoading, setIsLoading] = useState(false);

    const togglePublishState = async () => {
        if (!formData?.published) {
            toast({
                title: "Did you save the form?",
                description: "Make sure you saved the form before publishing it.",
                variant: "default",
                duration: 2000,
            });
        }

        try {
            if (!formId) return;
            setIsLoading(true);

            const newPublishedState = !formData?.published;

            const response = await axios.patch('/api/forms/update-publish', {
                formId: formId,
                published: newPublishedState
            });

            if (response.data.success) {
                toast({
                    title: "Success🎉",
                    description: response.data.message,
                });

                handleSelectedLayout(null);
                setFormData({
                    ...formData,
                    published: response.data.form.published || false,
                });
            } else {
                toast({
                    title: "Error",
                    description: response.data.message || "Something went wrong",
                    variant: "destructive",
                });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isPublished = formData?.published;

    return (
        <Button
            disabled={isLoading}
            size="sm"
            variant={isPublished ? "destructive" : "default"}
            className={cn(
                isPublished ? "bg-red-500 hover:bg-red-600" : "!bg-primary",
                "text-white"
            )}
            onClick={togglePublishState}
        >
            {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
            ) : isPublished ? (
                "Unpublish"
            ) : (
                <>
                    <Send />
                    Publish
                </>
            )}
        </Button>
    );
};

export default PublishFormBtn;