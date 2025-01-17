import { AttributesType, FormBlockInstance, FormBlockType, FormCategoryType, ObjectBlockType, TChildProperties, HandleBlurFunc, } from '@/types';
import { ChevronDown, CircleIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { useBuilder } from '@/context/builderProvider';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { generateUniqueId } from '@/lib/helper';
import { cn } from '@/lib/utils';

const blockCategory: FormCategoryType = "Field";

const blockType: FormBlockType = 'RadioSelect';

const PropertiesValidationSchema = z.object({
    label: z.string().trim().min(2).max(100),
    required: z.boolean().default(false),
    options: z.array(z.string().min(1)),
});

type TPropertiesValidationSchema = z.infer<typeof PropertiesValidationSchema>;

export const RadioSelectBlock: ObjectBlockType = {
    blockType,
    blockCategory,
    blockBtnElement: {
        icon: CircleIcon,
        label: "Radio"
    },
    createInstance: (id: string) => ({
        id,
        blockType,
        isLocked: false,
        attributes: {
            label: "Select an option",
            options: ["Option 1", "Option 2"],
            require: false
        },
        childBlocks: []
    }),

    canvasComponent: RadioSelectCanvasComponent,
    formComponent: RadioSelectFormComponent,
    propertiesComponent: RadioSelectPropertiesComponent
};

type NewBlockInstance = FormBlockInstance & {
    attributes: AttributesType;
};

function RadioSelectCanvasComponent({ blockInstance }: { blockInstance: FormBlockInstance }) {

    const block = blockInstance as NewBlockInstance;

    const { label, options, required } = block.attributes;

    return (
        <div className='flex flex-col gap-3 w-full'>
            <Label className='text-base font-normal mb-2'>
                {label}
                {required && <span className='text-red-600'>*</span>}
            </Label>

            <RadioGroup
                disabled={true}
                className='space-y-3 disabled:cursor-default !pointer-events-none !cursor-default'
            >
                {
                    options?.map((option: string, index) => (
                        <div key={index} className='flex items-center space-x-2'>
                            <RadioGroupItem disabled value={option} id={option} />
                            <Label htmlFor={option} className='!font-normal' >
                                {option}
                            </Label>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
};


function RadioSelectPropertiesComponent({
    positionIndex,
    parentId,
    blockInstance
}: TChildProperties) {

    const block = blockInstance as NewBlockInstance;

    const { updateChildBlock } = useBuilder();

    // validation schema 
    const form = useForm<TPropertiesValidationSchema>({
        resolver: zodResolver(PropertiesValidationSchema),
        mode: "onBlur",
        defaultValues: {
            label: block.attributes.label,
            required: block.attributes.required,
            options: block.attributes.options || [],
        },
    });

    useEffect(() => {
        form.reset({
            label: block.attributes.label,
            required: block.attributes.required,
            options: block.attributes.options || [],
        })
    }, [block.attributes, form])

    function setFormChanges(values: TPropertiesValidationSchema) {
        if (!parentId) return null;
        updateChildBlock(parentId, block.id, {
            ...block,
            attributes: {
                ...block.attributes,
                ...values,
            },
        });
    }

    return (
        <div className='w-full pb-4'>
            <div className="w-full flex items-center justify-between gap-1 bg-primary/10 h-auto p-1 px-2 mb-3">
                <span className='text-sm font-medium text-gray-600'>
                    Radio {positionIndex}
                </span>
                <ChevronDown className='size-4' />
            </div>

            <Form {...form}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className='w-full space-y-3 px-4'
                >
                    {/* Label Field  */}
                    <FormField control={form.control} name='label' render={({ field }) => (
                        <FormItem className='text-end'>
                            <div className="flex items-baseline justify-between w-full gap-2">
                                <FormLabel className='text-sm'>Question</FormLabel>
                                <div className="w-full max-w-[190px]">
                                    <Input
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormChanges({
                                                ...form.getValues(),
                                                label: e.target.value
                                            })

                                        }}
                                    />

                                </div>
                            </div>
                        </FormItem>
                    )}>
                    </FormField>

                    <Separator />

                    {/* Option Field  */}
                    <FormField control={form.control} name='options' render={({ field }) => (
                        <FormItem className='text-end'>
                            <div className="flex items-baseline justify-between w-full gap-2">
                                <FormLabel className='text-sm'>Options</FormLabel>
                                <div className="flex flex-col gap-1">
                                    {
                                        field.value.map((option: string, index: number) => (
                                            <div
                                                key={index}
                                                className='relative flex items-center justify-between gap-2'
                                            >
                                                <Input
                                                    value={option}
                                                    onChange={(e) => {
                                                        const updatedOptions = [...(field.value || [])];
                                                        updatedOptions[index] = e.target.value;
                                                        field.onChange(updatedOptions);
                                                        setFormChanges({
                                                            ...form.getValues(),
                                                            options: updatedOptions
                                                        })

                                                    }}
                                                />
                                                {field.value.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            const updatedOptions = field.value?.filter((_, i) => i !== index);
                                                            field.onChange(updatedOptions);
                                                            setFormChanges({
                                                                ...form.getValues(),
                                                                options: updatedOptions,
                                                            });
                                                        }}
                                                    >
                                                        <X />
                                                    </Button>
                                                )}
                                            </div>
                                        ))
                                    }
                                    <FormMessage />
                                    <Button
                                        type='button'
                                        variant="link"
                                        size="sm"
                                        className='mt-2'
                                        onClick={() => {
                                            const currentOptions = field?.value || [];
                                            const newOption = `Option ${currentOptions.length + 1}`
                                            const updatedOptions = [...currentOptions, newOption]
                                            field.onChange(updatedOptions);
                                            setFormChanges({
                                                ...form.getValues(),
                                                options: updatedOptions
                                            })
                                        }}
                                    >
                                        Add Option
                                    </Button>
                                </div>
                            </div>
                        </FormItem>
                    )}>
                    </FormField>

                    {/* Required Field */}
                    <FormField
                        control={form.control}
                        name="required"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-lg font-normal">
                                        Required
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                                setFormChanges({
                                                    ...form.getValues(),
                                                    required: value,
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>

            </Form>
        </div>
    )
};


function RadioSelectFormComponent({
    blockInstance,
    handleBlur,
    isError: isSubmitError,
    errorMessage,
}: {
    blockInstance: FormBlockInstance;
    handleBlur?: HandleBlurFunc;
    isError?: boolean;
    errorMessage?: string;
}) {
    const block = blockInstance as NewBlockInstance;
    const { label, options, required } = block.attributes;

    const [isError, setIsError] = useState(false);
    const [value, setValue] = useState("");

    const validateOptionField = (value: string) => {
        if (required) {
            return value.trim().length > 0;
        }
        return true;
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label
                className={`text-base !font-normal mb-2 ${isError || isSubmitError ? "text-red-500" : ""}`}
            >
                {label}
                {required && <span className="text-red-600">*</span>}
            </Label>

            <RadioGroup
                className="space-y-3"
                onValueChange={(value) => {
                    setValue(value);
                    const isValid = validateOptionField(value);
                    setIsError(!isValid);
                    if (handleBlur) {
                        handleBlur(block.id, value);
                    }
                }}
            >
                {options?.map((option: string, index) => {
                    const uniqueId = `option-${generateUniqueId()}`;
                    return (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={option}
                                id={uniqueId}
                                className={cn("!cursor-pointer", {
                                    isError: "!border-red-500",
                                })}
                            />
                            <Label htmlFor={uniqueId} className="!font-normal cursor-pointer">
                                {option}
                            </Label>
                        </div>
                    );
                })}
            </RadioGroup>
            {isError ? (
                <p className="text-red-600 text-xs">
                    {required && value.trim().length === 0
                        ? "This field is required"
                        : ""}
                </p>
            ) : (
                errorMessage && (
                    <p className="text-red-600 text-xs">{errorMessage}</p>
                )
            )}
        </div>
    );
};

