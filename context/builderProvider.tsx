/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { generateUniqueId } from "@/lib/helper";
import { FormBlockInstance, FormWithSettings } from "@/types";
import { useParams } from "next/navigation";
import {
    createContext,
    ReactNode,
    useContext,
    useState
} from "react";

type TBuilderContext = {
    loading: boolean;
    setLoading: (value: boolean) => void;
    formData: FormWithSettings | null;
    setFormData: React.Dispatch<React.SetStateAction<FormWithSettings | null>>;
    blockLayouts: FormBlockInstance[];
    setBlockLayouts: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
    addBlockLayout: (blockLayout: FormBlockInstance) => void;
    removeBlockLayout: (id: string) => void;
    duplicateBlockLayout: (id: string) => void;
    selectedBlockLayout: FormBlockInstance | null;
    handleSelectedLayout: (blockLayout: FormBlockInstance | null) => void;
    repositionBlockLayout: (
        activeId: string,
        overId: string,
        position: "above" | "below"
    ) => void;
    insertBlockLayoutAtIndex: (
        overId: string,
        newBlockLayout: FormBlockInstance,
        position: "above" | "below"
    ) => void;
    updateBlockLayout: (
        id: string,
        updatedChildBlocks: FormBlockInstance[]
    ) => void;
    updateChildBlock: (
        parentId: string,
        childBlockId: string,
        updatedBlock: FormBlockInstance,
    ) => void;
};

export const BuilderContext = createContext<TBuilderContext | null>(null);

export default function BuilderProvider({ children }: { children: ReactNode }) {
    const { formId } = useParams();

    const [formData, setFormData] = useState<FormWithSettings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [blockLayouts, setBlockLayouts] = useState<FormBlockInstance[]>([]);
    const [selectedBlockLayout, setSelectedBlockLayout] =
        useState<FormBlockInstance | null>(null);

    const addBlockLayout = (blockLayout: FormBlockInstance) => {
        setBlockLayouts((prev) => {
            const newBlocks = [...prev];
            newBlocks.push(blockLayout);
            return newBlocks;
        });
    };

    const removeBlockLayout = (id: string) => {
        setBlockLayouts((prev) => prev.filter((block) => block.id !== id));
        if (selectedBlockLayout?.id === id) {
            setSelectedBlockLayout(null);
        }
    };

    const duplicateBlockLayout = (id: string) => {
        setBlockLayouts((prev) => {
            const blockToCopy = prev.find((block) => block.id === id);
            if (!blockToCopy) return prev;

            const duplicatedBlock = {
                ...blockToCopy,
                id: `layout-${generateUniqueId()}`,
                childBlocks: blockToCopy.childBlocks?.map((childBlock) => ({
                    ...childBlock,
                    id: generateUniqueId(),
                })),
            };

            //    add the duplicated Block right after the original block
            const updatedBlockLayouts = [...prev];
            const insertIndex = prev.findIndex((block) => block.id === id) + 1;

            updatedBlockLayouts.splice(insertIndex, 0, duplicatedBlock);

            return updatedBlockLayouts;
        });
    };

    const handleSelectedLayout = (blockLayout: FormBlockInstance | null) => {
        setSelectedBlockLayout(blockLayout);
    };

    const repositionBlockLayout = (
        activeId: string,
        overId: string,
        position: "above" | "below"
    ) => {
        setBlockLayouts((prev) => {
            const activeIndex = prev.findIndex((block) => block.id === activeId);
            const overIndex = prev.findIndex((block) => block.id === overId);
            if (activeIndex === -1 || overIndex === -1) {
                return prev;
            }

            const updatedBlocks = [...prev];
            const [movedBlock] = updatedBlocks.splice(activeIndex, 1);
            const insertIndex = position === "above" ? overIndex : overIndex + 1;
            updatedBlocks.splice(insertIndex, 0, movedBlock);

            return updatedBlocks;
        });
    };

    const insertBlockLayoutAtIndex = (
        overId: string,
        newBlockLayout: FormBlockInstance,
        position: "above" | "below"
    ) => {
        setBlockLayouts((prev) => {
            const overIndex = prev.findIndex((block) => block.id === overId);
            if (overIndex === -1) return prev;

            const insertIndex = position === "above" ? overIndex : overIndex + 1;
            const updatedBlocks = [...prev];
            updatedBlocks.splice(insertIndex, 0, newBlockLayout);

            return updatedBlocks;
        });
    };

    //!----------------------------------------------------------- For childBlocks
    const updateBlockLayout = (
        id: string,
        updatedChildBlocks: FormBlockInstance[]
    ) => {
        setBlockLayouts((prev) => prev.map((block) => block.id === id ? {
            ...block,
            childBlocks: updatedChildBlocks
        } : block
        ))
    };

    const updateChildBlock = (
        parentId: string,
        childBlockId: string,
        updatedBlock: FormBlockInstance,
    ) => {
        setBlockLayouts((prevBlocks) => {
            const updatedBlocks = prevBlocks.map((parentBlock) => {
                if (parentBlock.id === parentId) {
                    const updatedChildblocks = parentBlock.childBlocks?.map(
                        (childblock) =>
                            childblock.id === childBlockId
                                ? { ...childblock, ...updatedBlock }
                                : childblock
                    );
                    return { ...parentBlock, childBlocks: updatedChildblocks };
                }

                return parentBlock;
            });
            return updatedBlocks;
        });
    }


    return (
        <BuilderContext.Provider
            value={{
                loading,
                formData,
                setFormData,
                blockLayouts,
                setBlockLayouts,
                addBlockLayout,
                removeBlockLayout,
                duplicateBlockLayout,
                handleSelectedLayout,
                selectedBlockLayout,
                repositionBlockLayout,
                insertBlockLayoutAtIndex,
                updateBlockLayout,
                updateChildBlock,
                setLoading
            }}
        >
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilder() {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error("Error at useContext");
    }
    return context;
}
