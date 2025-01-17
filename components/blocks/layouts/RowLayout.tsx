import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { allBlockLayouts } from "@/constant";
import { useBuilder } from "@/context/builderProvider";
import { cn } from "@/lib/utils";
import {
    FormBlockInstance,
    FormBlockType,
    FormCategoryType,
    ObjectBlockType,
    HandleBlurFunc,
    FormErrorsType
} from "@/types";
import {
    Active,
    DragEndEvent,
    useDndMonitor,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";
import { BadgeMinus, Copy, GripHorizontal, Rows2, Trash2Icon } from "lucide-react";
import { MouseEvent, useState } from "react";
import ChildCanvasComponentWrapper from "../ChildCanvasComponentWrapper";
import { FormBlocks } from "@/lib/form-blocks";
import { generateUniqueId } from "@/lib/helper";
import ChildPropertiesComponentWrapper from "../ChildPropertiesComponentWrapper";
import ChildFormComponentWrapper from "../ChildFormComponentWrapper";

export const blockCategory: FormCategoryType = "Layout";

export const blockType: FormBlockType = "RowLayout";

export const RowLayoutBlock: ObjectBlockType = {
    blockType,
    blockCategory,
    blockBtnElement: {
        icon: Rows2,
        label: "Row Layout",
    },
    createInstance: (id: string) => ({
        id: `layout-${id}`,
        blockType,
        isLocked: false,
        attributes: {},
        childBlocks: [],
    }),

    canvasComponent: RowLayoutCanvasComponent,
    formComponent: RowLayoutFormComponent,
    propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent({
    blockInstance,
}: {
    blockInstance: FormBlockInstance;
}) {
    const {
        removeBlockLayout,
        duplicateBlockLayout,
        selectedBlockLayout,
        handleSelectedLayout,
        updateBlockLayout,
    } = useBuilder();

    const [activeBlock, setActiveBlock] = useState<Active | null>(null);

    const childBlocks = blockInstance.childBlocks || [];
    const isSelected = selectedBlockLayout?.id === blockInstance.id;

    const droppable = useDroppable({
        id: blockInstance.id,
        disabled: blockInstance.isLocked,
        data: {
            isLayoutDropArea: true,
        },
    });

    const draggable = useDraggable({
        id: blockInstance.id + "drag-area",
        disabled: blockInstance.isLocked,
        data: {
            blockType: blockInstance.blockType,
            blockId: blockInstance.id,
            isCanvasLayout: true,
        },
    });

    useDndMonitor({
        onDragStart: (e) => {
            setActiveBlock(e.active);
        },
        onDragEnd: (e: DragEndEvent) => {
            const { active, over } = e;
            if (!active || !over) return;
            setActiveBlock(null);
            const overBlockId = over.id;
            const isBlockBtnElement = active?.data?.current?.isBlockBtnElement;
            const isLayout = active?.data?.current?.blockType;

            if (
                isBlockBtnElement &&
                !allBlockLayouts.includes(isLayout) &&
                overBlockId === blockInstance.id
            ) {
                const blockType = active?.data?.current?.blockType;
                const newBlock = FormBlocks[blockType as FormBlockType].createInstance(
                    generateUniqueId()
                );

                const updatedChildBlocks = [...childBlocks, newBlock];
                updateBlockLayout(blockInstance.id, updatedChildBlocks);
            }
        },
    });

    const removeChildBlock = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        const filteredBlocks = childBlocks.filter((block) => block.id !== id);
        updateBlockLayout(blockInstance.id, filteredBlocks);
    }

    if (draggable.isDragging) return;

    return (
        <div ref={draggable.setNodeRef} className="max-w-full">
            {blockInstance.isLocked && <Border />}

            <Card
                ref={droppable.setNodeRef}
                className={cn(
                    "w-full bg-white relative border shadow-sm min-h-32 max-w-3xl rounded-md !p-0",
                    blockInstance.isLocked && "!rounded-t-none"
                )}
                onClick={() => handleSelectedLayout(blockInstance)}
            >
                <CardContent className="px-2 pb-2">
                    {isSelected && !blockInstance.isLocked && (
                        <div className="w-1 absolute left-0 top-0 rounded-l-md h-full bg-primary" />
                    )}
                    {!blockInstance.isLocked && (
                        <div
                            {...draggable.listeners}
                            {...draggable.attributes}
                            role="button"
                            className="flex items-center w-full h-6 cursor-move justify-center"
                        >
                            <GripHorizontal className="size-5 text-muted-foreground" />
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-1">
                        {droppable.isOver &&
                            !blockInstance.isLocked &&
                            activeBlock?.data?.current?.isBlockBtnElement &&
                            !allBlockLayouts.includes(
                                activeBlock?.data?.current?.blockType
                            ) && (
                                <div className="relative border border-dotted border-primary bg-primary/10 w-full h-28">
                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 text-xs bg-primary text-white text-center w-28 p-1 rounded-b-full shadow-md">
                                        Drop Here!
                                    </div>
                                </div>
                            )}

                        {!droppable.isOver && childBlocks?.length === 0 ? (
                            <PlaceHolder />
                        ) : (
                            <div className="flex justify-start  w-full flex-col gap-4 p-3">
                                {/* ChildBlocks  */}

                                {childBlocks.map((childBlock) => (
                                    <div
                                        key={childBlock.id}
                                        className="flex items-center justify-start gap-1"
                                    >
                                        <ChildCanvasComponentWrapper blockInstance={childBlock} />
                                        {
                                            isSelected && !blockInstance.isLocked && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="!bg-transparent"
                                                    onClick={(e) => removeChildBlock(e, childBlock.id)}
                                                >

                                                    <BadgeMinus />

                                                </Button>
                                            )
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>

                {isSelected && !blockInstance.isLocked && (
                    <CardFooter className="flex items-center gap-3 justify-end border-t py-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                duplicateBlockLayout(blockInstance.id);
                            }}
                        >
                            <Copy />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeBlockLayout(blockInstance.id);
                            }}
                        >
                            <Trash2Icon />
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}

function RowLayoutPropertiesComponent({ blockInstance }: { blockInstance: FormBlockInstance }) {

    const childBlocks = blockInstance.childBlocks || [];

    return (
        <div className="pt-0 w-full">
            <div className="flex w-full flex-col items-center justify-start gap-0 p-0">
                {
                    childBlocks.map((block, index) => (
                        <div key={block.id} className="flex w-full items-center justify-center gap-1 h-auto">
                            <ChildPropertiesComponentWrapper
                                positionIndex={index + 1}
                                parentId={blockInstance.id}
                                blockInstance={block}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};


function RowLayoutFormComponent({
    blockInstance,
    handleBlur,
    formErrors,
}: {
    blockInstance: FormBlockInstance;
    handleBlur?: HandleBlurFunc;
    formErrors?: FormErrorsType;
}) {
    const childBlocks = blockInstance.childBlocks || [];

    return (
        <div className="max-w-full">
            {blockInstance.isLocked && <Border />}
            <Card
                className={cn(
                    "w-full bg-white relative border shadow-sm min-h-32 max-w-3xl rounded-md !p-0",
                    blockInstance.isLocked && "!rounded-t-none"
                )}
            >
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <div className="w-full flex flex-col items-center justify-center gap-4 p-3">
                            {
                                childBlocks.map((childBlock) => (
                                    <div
                                        key={childBlock.id}
                                        className="flex items-center justify-center gap-1 h-auto w-full"
                                    >
                                        <ChildFormComponentWrapper
                                            blockInstance={childBlock}
                                            handleBlur={handleBlur}
                                            isError={!!formErrors?.[childBlock.id]}
                                            errorMessage={formErrors?.[childBlock.id]}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};



function Border() {
    return <div className="w-full rounded-t-md min-h-2 bg-primary" />;
}

function PlaceHolder() {
    return (
        <div className="flex flex-col items-center justify-center border border-dotted border-primary bg-primary/10 hover:bg-primary/20 w-full h-28 text-primary font-medium text-base gap-1">
            <p className="text-center text-primary/80">Drop a Block Here</p>
        </div>
    );
}
