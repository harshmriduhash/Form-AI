import { cn } from '@/lib/utils';
import { ObjectBlockType } from '@/types';
import { Button } from '../ui/button';

const BlockBtnDragOverlay = ({ formBlock }: { formBlock: ObjectBlockType }) => {

    const { icon: Icon, label } = formBlock.blockBtnElement;

    return (
        <Button
            className={cn(`flex flex-col gap-2 size-20 cursor-grab !bg-white border border-gray-600 hover:border-none text-gray-600 hover:ring-1 hover:!ring-primary p-1`)}
        >
            <Icon className="!size-8 !stroke[0.9]" />
            <h6 className='text-sm -mt-1 text-gray-600 font-medium'>{label}</h6>
        </Button>
    )
}

export default BlockBtnDragOverlay