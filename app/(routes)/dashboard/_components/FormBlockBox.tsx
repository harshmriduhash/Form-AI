'use client'
import BlockBtnElement from '@/components/blocks/BlockBtnElement'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useBuilder } from '@/context/builderProvider'
import { FormBlocks } from '@/lib/form-blocks'
import React, { useState } from 'react'
import GeminiAiBtn from './_common/GeminiAiBtn'

const FormBlockBox = () => {
    const [searchBlocks, setSearchBlocks] = useState<string>("");
    const { formData } = useBuilder();
    const isPublished = formData?.published;

    const filteredBlocks = Object.values(FormBlocks).filter((block) => block.blockBtnElement.label.toLowerCase().includes(searchBlocks.toLowerCase()));

    const layoutBlocks = filteredBlocks.filter((block) => block.blockCategory === 'Layout');
    const fieldBlocks = filteredBlocks.filter((block) => block.blockCategory === 'Field');

    return (
        <div className='w-full p-5'>
            <div className="flex gap-2 py-4 text-sm">
                <Input
                    placeholder='Search Blocks'
                    className='placeholder:text-gray-400 shadow-sm bg-slate-50 focus:border-none'
                    value={searchBlocks}
                    onChange={(e) => setSearchBlocks(e.target.value)}

                />
                {/* gemini ai  */}
                <GeminiAiBtn />
            </div>
            <div className="flex flex-col space-y-3 w-full">
                {
                    layoutBlocks.length > 0 && (
                        <div>
                            <h6 className='text-sm text-gray-600 font-medium'>Layouts</h6>

                            <div className="pt-1 grid grid-cols-3 gap-3">
                                {
                                    layoutBlocks.map((block) => (
                                        <BlockBtnElement key={block.blockType} formBlock={block} disabled={isPublished!} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                <Separator className='!bg-gray-200 my-2' />
                {
                    fieldBlocks.length > 0 && (
                        <div>
                            <h6 className='text-sm text-gray-600 font-medium'>Fields</h6>
                            <div className="pt-1 grid grid-cols-3 gap-3">
                                {
                                    fieldBlocks.map((block) => (
                                        <BlockBtnElement key={block.blockType} formBlock={block} disabled={isPublished!} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default FormBlockBox