"use client";
import { saveForm } from "@/actions/form-action";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builderProvider";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SaveFormBtn = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { formData, setFormData, blockLayouts } = useBuilder();
    const formId = formData?.formId;
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false);

    // const saveFormAPI = async (data: {
    //     formId: string;
    //     name?: string;
    //     description?: string;
    //     stringifyBlocks: string;
    // }) => {
    //     console.log(data);
    //     try {
    //         const response = await axios.post('/api/forms/save', data);
    //         return response.data;
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     } catch (error: any) {
    //         console.error("Error saving form:", error.response?.data || error.message);
    //         return { success: false, message: error.response?.data?.error || "Failed to save form" };
    //     }
    // };

    const saveFormData = async () => {

        try {
            if (!formId) return;
            setIsLoading(true);

            const lockedBlockLayout = blockLayouts.find((block) => block.isLocked);

            const name = lockedBlockLayout?.childBlocks?.find(
                (child) => child.blockType === "Heading"
            )?.attributes?.label as string;

            const description = lockedBlockLayout?.childBlocks?.find(
                (child) => child.blockType === "Paragraph"
            )?.attributes?.text as string;

            const jsonBlocks = JSON.stringify(blockLayouts);

            const response = await saveForm({
                formId,
                name,
                description,
                stringifyBlocks: jsonBlocks,
            });

            if (response?.success) {
                toast({
                    title: "Success 🙌",
                    description: response.message,
                });
                router.refresh()
                // if (response.savedForm) {
                //     setFormData({
                //         ...formData,
                //         ...response.savedForm,
                //     });
                // }
            } else {
                toast({
                    title: "Error",
                    description: response?.message || "Something went wrong",
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


    return (
        <Button
            variant="outline"
            size="sm"
            disabled={isLoading || formData?.published}
            className={cn(`!text-primary !bg-primary/10 !border-primary`, formData?.published && "cursor-default pointer-events-none")}
            onClick={saveFormData}
        >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save />}
            Save
        </Button>
    );
};

export default SaveFormBtn;