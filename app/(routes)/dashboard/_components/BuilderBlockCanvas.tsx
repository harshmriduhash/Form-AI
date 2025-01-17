import { useBuilder } from '@/context/builderProvider';
import { cn } from '@/lib/utils';
import { Active, DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import CanvasBlockLayoutWrapper from './CanvasBlocklayoutWrapper';
import { useState } from 'react';
import { allBlockLayouts } from '@/constant';
import { FormBlocks } from '@/lib/form-blocks';
import { FormBlockType } from '@/types';
import { generateUniqueId } from '@/lib/helper';

const BuilderBlockCanvas = () => {

    const { blockLayouts, addBlockLayout, repositionBlockLayout, insertBlockLayoutAtIndex } = useBuilder();
    const [activeBlock, setActiveBlock] = useState<Active | null>(null);

    const droppable = useDroppable({
        id: "builder-canvas-droppable",
        data: {
            isBuilderCanvasDropArea: true,
        }
    });

    useDndMonitor({
        onDragStart: (e) => {
            setActiveBlock(e.active);
        },

        onDragEnd: (e: DragEndEvent) => {
            const { active, over } = e;

            if (!over || !active) return;
            setActiveBlock(null);

            const isBlockBtnElement = active.data.current?.isBlockBtnElement;
            const isBlockLayout = active.data.current?.blockType;
            const isDraggingOverCanvas = over.data?.current?.isBuilderCanvasDropArea;

            if (isBlockBtnElement && allBlockLayouts.includes(isBlockLayout) && isDraggingOverCanvas) {
                const blockType = active.data.current?.blockType;
                const newBlockLayout = FormBlocks[blockType as FormBlockType].createInstance(generateUniqueId());
                addBlockLayout(newBlockLayout);
                return;
            };

            const isDroppingOverCanvasBlockLayoutAbove = over?.data?.current?.isAbove;
            const isDroppingOverCanvasBlockLayoutBelow = over?.data?.current?.isBelow;
            const isDroppingOverCanvasLayout = isDroppingOverCanvasBlockLayoutAbove || isDroppingOverCanvasBlockLayoutBelow;

            const isDraggingCanvasLayout = active?.data?.current?.isCanvasLayout;
            const droppingLayoutBlockOverCanvas = (isBlockBtnElement && allBlockLayouts.includes(isBlockLayout) && isDroppingOverCanvasLayout);
            const draggingACanvasLayoutOverAnotherLayout = isDroppingOverCanvasLayout && isDraggingCanvasLayout;

            if (droppingLayoutBlockOverCanvas) {
                const blockType = active.data.current?.blockType;
                const overId = over?.data?.current?.blockId;
                const newBlockLayout = FormBlocks[blockType as FormBlockType].createInstance(generateUniqueId());
                let position: "above" | "below" = "below";
                if (isDroppingOverCanvasBlockLayoutAbove) position = 'above';

                insertBlockLayoutAtIndex(overId, newBlockLayout, position);
                return;
            }

            if (draggingACanvasLayoutOverAnotherLayout) {
                const activeId = active?.data?.current?.blockId;
                const overId = over?.data?.current?.blockId;

                let position: "above" | "below" = "below";
                if (isDroppingOverCanvasBlockLayoutAbove) position = 'above';

                repositionBlockLayout(activeId, overId, position)
                return;
            }
        },
    });

    return (
        <div className='relative w-full h-[calc(100vh_-_65px)] pt-6 px-5 md:px-2 pb-32 overflow-auto transition-all duration-300 scrollbar'>

            <div className='w-full max-w-[650px] h-full mx-auto'>

                {/* //! Droppable Canvas Area  */}

                <div
                    ref={droppable.setNodeRef}
                    className={cn(`w-full relative bg-transparent px-2 rounded-md flex flex-col min-h-svh items-center justify-start pt-1 pb-12 ring-1 ring-primary/60`, droppable.isOver && " ring-4 ring-primary/60 ring-inset shadow-2xl")}
                >
                    <div className="w-full mb-3 bg-white bg-[url(/form-bg.jpg)] bg-center bg-cover bg-no-repeat border shadow-sm h-[135px] max-w-[768px] rounded-md px-1" />

                    {
                        blockLayouts.length > 0 && (
                            <div className="flex flex-col w-full gap-4">
                                {
                                    blockLayouts.map((blockLayout) => (
                                        <CanvasBlockLayoutWrapper
                                            key={blockLayout.id}
                                            blockLayout={blockLayout}
                                            activeBlock={activeBlock}
                                        />
                                    ))
                                }
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    )
};



export default BuilderBlockCanvas;