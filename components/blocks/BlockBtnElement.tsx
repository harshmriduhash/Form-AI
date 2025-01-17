import { ObjectBlockType } from '@/types'
import React from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';

const BlockBtnElement = ({ formBlock, disabled }: { formBlock: ObjectBlockType, disabled: boolean }) => {

    const { icon: Icon, label } = formBlock.blockBtnElement;

    const draggable = useDraggable({
        id: `block-btn-${formBlock.blockType}`,
        disabled: disabled,
        data: {
            blockType: formBlock.blockType,
            isBlockBtnElement: true
        }

    })


    return (
        <Button
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            disabled={disabled}
            className={cn(`flex flex-col gap-2 size-20 cursor-grab !bg-white border-2 border-primary/30 hover:border-none text-gray-600 hover:ring-1 hover:!ring-primary`, draggable.isDragging && "ring-2 ring-primary shadow-lg", disabled && "!cursor-default !pointer-events-none")}
        >
            <Icon className="!size-8 !stroke[0.9]" />
            <h6 className='text-xs -mt-1 text-gray-400 font-medium'>{label}</h6>
        </Button>
    )
}

export default BlockBtnElement