import { Form, FormSettings } from "@prisma/client";

export type FormWithSettings = Form & { settings: FormSettings };

export type FormCategoryType = "Layout" | "Field";

export type FormBlockType = "RowLayout" | "RadioSelect" | "TextField" | "EmailField" | "TextArea" | "Heading" | "StarRating" | "Paragraph" | "PhoneField";

export type HandleBlurFunc = (key: string, value: string) => void;

export type FormErrorsType = {
    [key: string]: string;
};

export type ObjectBlockType = {
    blockCategory: FormCategoryType;
    blockType: FormBlockType;

    createInstance: (id: string) => FormBlockInstance;

    blockBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    canvasComponent: React.FC<{
        blockInstance: FormBlockInstance;
    }>;

    formComponent: React.FC<{
        blockInstance: FormBlockInstance;
        isError?: boolean;
        errorMessage?: string;
        handleBlur?: HandleBlurFunc;
        formErrors?: FormErrorsType;
    }>;

    propertiesComponent: React.FC<{
        positionIndex?: number;
        parentId?: string;
        blockInstance: FormBlockInstance;
    }>;
};

export type FormBlockInstance = {
    id: string;
    blockType: FormBlockType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: Record<string, any>;
    childBlocks?: FormBlockInstance[];
    isLocked?: boolean;
};

export type FormBlocksType = {
    [key in FormBlockType]: ObjectBlockType;
};


export type AttributesType = {
    label: string;
    options: string[];
    required: boolean;
};


export type TChildProperties = {
    positionIndex?: number,
    parentId?: string,
    blockInstance: FormBlockInstance
}