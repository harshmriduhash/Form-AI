'use client'
import { useBuilder } from '@/context/builderProvider'
import { FormBlocks } from '@/lib/form-blocks'
import { MousePointerClickIcon } from 'lucide-react'
import PreviewFormDialog from './_common/PreviewFormDialog'
import PublishFormBtn from './_common/PublishFormBtn'
import SaveFormBtn from './_common/SaveFormBtn'

const BuilderBlockProperties = () => {

    const { selectedBlockLayout } = useBuilder();

    const LayoutPropertyBlock = selectedBlockLayout && FormBlocks[selectedBlockLayout.blockType]?.propertiesComponent

    return (
        <div className='hidden md:flex relative w-[320px] bg-white'>
            <div className="fixed right w-[320px] border-l shadow-sm h-screen pb-36 mt-0 scrollbar overflow-auto">
                <div className="flex flex-col w-full items-center h-auto min-h-full">
                    {/* buttons  */}
                    <div className="w-full flex flex-row justify-around items-center pb-2 pt-3 sticky border-b border-gray-200 top-0 px-2">
                        <PreviewFormDialog />
                        <SaveFormBtn />
                        <PublishFormBtn />
                    </div>
                    {/* Edit layout properties  */}
                    {
                        !selectedBlockLayout ? (
                            <div className="text-gray-400 gap-1 text-center text-lg w-full flex flex-col items-center justify-center flex-1 h-auto">
                                <MousePointerClickIcon />
                                <p>Click the layout to modify!</p>
                            </div>
                        ) : (
                            <div className="w-full pt-1">
                                <div className="px-2 py-3 border-b border-gray-200">
                                    <h5 className='text-center font-medium text-base'>Edit Your Form Properties</h5>
                                </div>

                                {LayoutPropertyBlock && (
                                    <LayoutPropertyBlock blockInstance={selectedBlockLayout} />
                                )}
                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default BuilderBlockProperties