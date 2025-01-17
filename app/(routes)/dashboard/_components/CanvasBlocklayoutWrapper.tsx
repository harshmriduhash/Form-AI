import React from 'react';
import { allBlockLayouts } from '@/constant';
import { FormBlocks } from '@/lib/form-blocks'
import { FormBlockInstance } from '@/types'
import { Active, useDroppable } from '@dnd-kit/core';

const CanvasBlockLayoutWrapper = ({ blockLayout, activeBlock }: { blockLayout: FormBlockInstance, activeBlock: Active | null }) => {

    const CanvasBlockLayout = FormBlocks[blockLayout.blockType].canvasComponent;

    const aboveCorner = useDroppable({
        id: blockLayout.id + '-above',
        data: {
            blockId: blockLayout.id,
            blockType: blockLayout.blockType,
            isAbove: true
        }
    });

    const belowCorner = useDroppable({
        id: blockLayout.id + '-below',
        data: {
            blockId: blockLayout.id,
            blockType: blockLayout.blockType,
            isBelow: true
        }
    });

    return (
        <div className="relative mb-1">
            {
                !blockLayout.isLocked && allBlockLayouts.includes(activeBlock?.data?.current?.blockType) && (
                    <div
                        className="absolute top-0 w-full h-1/2 pointer-events-none"
                        ref={aboveCorner.setNodeRef}
                    >
                        {
                            aboveCorner.isOver && (
                                <div className='absolute w-full -top-1 h-4 bg-primary/50 rounded-t-md' />
                            )
                        }
                    </div>
                )
            }

            {
                !blockLayout.isLocked && allBlockLayouts.includes(activeBlock?.data?.current?.blockType) && (
                    <div
                        className="absolute bottom-0 w-full h-1/2 pointer-events-none"
                        ref={belowCorner.setNodeRef}
                    >
                        {
                            belowCorner.isOver && (
                                <div className='absolute w-full -bottom-1 h-4 bg-primary rounded-b-md' />
                            )
                        }
                    </div>
                )
            }

            <CanvasBlockLayout blockInstance={blockLayout} />
        </div>
    )
}

export default CanvasBlockLayoutWrapper