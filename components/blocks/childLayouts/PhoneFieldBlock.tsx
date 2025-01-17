"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useBuilder } from "@/context/builderProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    FormBlockInstance,
    FormBlockType,
    FormCategoryType,
    ObjectBlockType,
    HandleBlurFunc
} from "../../../types";

const blockType: FormBlockType = "PhoneField";
const blockCategory: FormCategoryType = "Field";

type attributesType = {
    label: string;
    helperText: string;
    required: boolean;
    placeHolder: string;
};

type propertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
    placeHolder: z.string().trim().optional(),
    label: z.string().trim().min(2).max(50),
    required: z.boolean().default(false),
    helperText: z.string().trim().max(255).optional(),
});

export const PhoneFieldBlock: ObjectBlockType = {
    blockType,
    blockCategory,
    createInstance: (id: string) => ({
        id,
        blockType,
        attributes: {
            label: "Phone field",
            helperText: "Include the country code (e.g., +880 for BD).",
            required: false,
            placeHolder: "Enter your phone number",
        },
    }),
    blockBtnElement: {
        icon: Phone,
        label: "Phone field",
    },
    canvasComponent: PhoneFieldCanvasComponent,
    formComponent: PhoneFieldFormComponent,
    propertiesComponent: PhoneFieldPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
    attributes: attributesType;
};

function PhoneFieldCanvasComponent({
    blockInstance,
}: {
    blockInstance: FormBlockInstance;
}) {
    const block = blockInstance as NewInstance;
    const { helperText, label, placeHolder, required } = block.attributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-base !font-normal mb-2">
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                readOnly
                className="!pointer-events-none cursor-default h-10"
                placeholder={placeHolder}
            />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
            )}
        </div>
    );
}

function PhoneFieldPropertiesComponent({
    positionIndex,
    parentId,
    blockInstance,
}: {
    positionIndex?: number;
    parentId?: string;
    blockInstance: FormBlockInstance;
}) {
    const block = blockInstance as NewInstance;

    const { updateChildBlock } = useBuilder();

    const form = useForm<propertiesValidateSchemaType>({
        resolver: zodResolver(propertiesValidateSchema),
        defaultValues: {
            label: block.attributes.label,
            helperText: block.attributes.helperText,
            required: block.attributes.required,
            placeHolder: block.attributes.placeHolder,
        },
        mode: "onBlur",
    });

    useEffect(() => {
        form.reset({
            label: block.attributes.label,
            helperText: block.attributes.helperText,
            required: block.attributes.required,
            placeHolder: block.attributes.placeHolder,
        });
    }, [block.attributes, form]);

    function setChanges(values: propertiesValidateSchemaType) {
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
        <div className="w-full pb-4">
            <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
                <span className="text-sm font-medium text-gray-600 tracking-wider">
                    PhoneField {positionIndex}
                </span>
                <ChevronDown className="w-4 h-4" />
            </div>
            <Form {...form}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full space-y-3 px-4"
                >
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px]  font-normal">
                                        Label
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="max-w-[187px]"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        label: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter")
                                                        event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="helperText"
                        render={({ field }) => (
                            <FormItem className="">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Note
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        helperText: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter")
                                                        event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-[11px] mt-2 pl-1">
                                            Provide a short note to guide users
                                        </FormDescription>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="placeHolder"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-baseline justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Placeholder
                                    </FormLabel>
                                    <div className="w-full max-w-[187px]">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setChanges({
                                                        ...form.getValues(),
                                                        placeHolder: e.target.value,
                                                    });
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter")
                                                        event.currentTarget.blur();
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="required"
                        render={({ field }) => (
                            <FormItem className="text-end">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <FormLabel className="text-[13px] font-normal">
                                        Required
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                                setChanges({
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
    );
}

function PhoneFieldFormComponent({
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
    const block = blockInstance as NewInstance;
    const { helperText, label, placeHolder, required } = block.attributes;

    const [value, setValue] = useState("");
    const [isError, setIsError] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const validateField = (val: string) => {
        const isValidPhone = /^\+?[1-9]\d{1,14}$/.test(val);
        if (required && !isValidPhone) {
            setValidationError("Invalid phone number. Include the country code.");
            return false;
        }
        setValidationError(null);
        return true;
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label
                className={`text-base !font-normal mb-1 ${isError || isSubmitError ? "text-red-500" : ""
                    }`}
            >
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={(event) => {
                    const inputValue = event.target.value;
                    const isValid = validateField(inputValue);
                    setIsError(!isValid);
                    if (handleBlur) {
                        handleBlur(block.id, inputValue);
                    }
                }}
                className={`h-10 ${isError ? "!border-red-500" : ""}`}
                placeholder={placeHolder}
            />
            {helperText && (
                <p className="text-muted-foreground text-xs">{helperText}</p>
            )}

            {isError || validationError ? (
                <p className="text-red-500 text-xs">
                    {validationError || `This field is required.`}
                </p>
            ) : (
                errorMessage && (
                    <p className="text-red-500 text-xs">{errorMessage}</p>
                )
            )}
        </div>
    );
}
