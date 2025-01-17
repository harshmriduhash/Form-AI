'use client'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import axios from 'axios';

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Form name must be at least 3 characters long"
    }).max(50, {
        message: "Form name must not exceed 50 characters."
    }),
    description: z.string().min(10, {
        message: "Form description must be at least 10 characters long"
    }).max(100, {
        message: "Form description must not exceed 100 characters."
    }),
})

function CreateForm() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const createFormAPI = async (data: { name: string; description: string }) => {
        try {
            const response = await axios.post('/api/forms/create', data);
            console.log("newly creates form: ", response);

            if (response.data?.success) {
                return response.data;
            }

            return {
                success: false,
                message: response.data?.error || "Unexpected response from the server",
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error creating form:", error.response?.data || error.message);
            return {
                success: false,
                message: error.response?.data?.error || "Failed to create form",
            };
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await createFormAPI({
            name: values.name,
            description: values.description,
        });

        if (response.success) {
            const newFormId = response.newForm?.formId;
            if (!newFormId) {
                toast({
                    title: "Warning ⚠️",
                    description: "Form created, but ID is missing!",
                    variant: "default",
                });
                return;
            }

            setIsOpen(false);
            toast({
                title: "Success 🎉",
                description: "Form created successfully!",
            });

            router.push(`/dashboard/form/builder/${newFormId}`);
        } else {
            toast({
                title: "Failed ❌",
                description: response.message || "Form creation failed!",
                variant: "destructive",
            });
        }
    };


    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild >
                    <Button className='!bg-primary !font-medium'>
                        Generate Your Form ✨
                    </Button>
                </SheetTrigger>
                <SheetContent side={'top'} className='w-full max-w-5xl mx-auto rounded-b-md'>
                    <SheetHeader>
                        <div className='flex justify-center flex-col items-center'>
                            <SheetTitle>Create New Form</SheetTitle>
                            <SheetDescription>
                                Ensure all details are valid before creating a new form.
                            </SheetDescription>
                        </div>
                    </SheetHeader>
                    <div className="w-full dialog-content">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-4'
                            >
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel >Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoComplete='off'
                                                    placeholder='Enter Form Name'
                                                    {...field}
                                                    className='!bg-slate-50 border-none outline-none'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel >Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Write Form Description'
                                                    {...field}
                                                    className='!bg-slate-50 border-none outline-none'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type='submit'
                                    disabled={form.formState.isSubmitting}
                                    className='!bg-primary px-5 place-self-end'
                                >
                                    {form.formState.isSubmitting && (
                                        <Loader className="w-4 h-4 animate-spin" />
                                    )}
                                    Create
                                </Button>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default CreateForm