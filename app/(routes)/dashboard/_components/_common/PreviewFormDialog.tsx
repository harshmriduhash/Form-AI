'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { defaultBackgroundColor } from '@/constant'
import { useBuilder } from '@/context/builderProvider'
import { FormBlocks } from '@/lib/form-blocks'
import { Eye } from 'lucide-react'
import React from 'react'

const PreviewFormDialog = () => {
    const { blockLayouts } = useBuilder();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='sm'
                    variant={"outline"}
                    className='!text-primary border-primary'
                >
                    <Eye />
                    Preview
                </Button>
            </DialogTrigger>

            <DialogContent className='flex flex-col flex-grow max-h-screen h-full p-0 gap-0 w-screen max-w-full'>
                <DialogHeader className='py-4 px-4 shadow-sm bg-primary/80 flex justify-center items-center'>
                    <DialogTitle>Preview Mode</DialogTitle>
                </DialogHeader>

                <div className="size-full overflow-y-auto scrollbar transition-all duration-300"
                    style={{ backgroundColor: defaultBackgroundColor }}
                >
                    <div className="size-full max-w-[650px] mx-auto">
                        <div className="w-full relative bg-transparent px-2 flex flex-col items-center justify-start pt-1 pb-14">
                            <div className="w-full mb-3 bg-white bg-[url(/form-bg.jpg)] bg-center bg-cover bg-no-repeat border shadow-sm h-[135px] max-w-[768px] rounded-md px-1" />
                            {
                                blockLayouts.length > 0 && (
                                    <div className='flex flex-col w-full gap-4'>
                                        {
                                            blockLayouts.map((block) => {
                                                const FormBlockComponent = FormBlocks[block.blockType].formComponent;
                                                return (
                                                    <FormBlockComponent
                                                        key={block.id}
                                                        blockInstance={block}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewFormDialog