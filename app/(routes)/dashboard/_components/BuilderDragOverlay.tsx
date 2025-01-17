'use client'
import BlockBtnDragOverlay from '@/components/blocks/BlockBtnDragOverlay';
import { useBuilder } from '@/context/builderProvider';
import { FormBlocks } from '@/lib/form-blocks';
import { FormBlockType } from '@/types';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'

const BuilderDragOverlay = () => {
    const { blockLayouts } = useBuilder();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (e) => {
            setDraggedItem(e.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;

    let fallbackNode = <div>No Block Drag</div>;

    const isBlockBtnElement = draggedItem?.data?.current?.isBlockBtnElement;
    const isCanvasLayout = draggedItem?.data?.current?.isCanvasLayout;


    if (isBlockBtnElement) {
        const blockType = draggedItem?.data?.current?.blockType as FormBlockType;
        fallbackNode = <BlockBtnDragOverlay formBlock={FormBlocks[blockType]} />
    };

    if (isCanvasLayout) {
        const blockId = draggedItem?.data?.current?.blockId;
        const blockLayout = blockLayouts.find((blockLayout) => blockLayout.id === blockId);

        if (!blockLayout) {
            return fallbackNode;
        } else {
            const CanvasBlockComponent = FormBlocks[blockLayout.blockType].canvasComponent;
            fallbackNode = <CanvasBlockComponent blockInstance={blockLayout} />
        }
    };

    return (
        <DragOverlay className=''>
            <div className='opacity-95'>
                {fallbackNode}
            </div>
        </DragOverlay>
    )
}

export default BuilderDragOverlay