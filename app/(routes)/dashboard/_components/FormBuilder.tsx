'use client'
import { SidebarProvider } from '@/components/ui/sidebar';
import { useBuilder } from '@/context/builderProvider';
import { FormWithSettings } from '@/types';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CSSProperties, useEffect, useState } from 'react';
import Builder from './Builder';
import BuilderDragOverlay from './BuilderDragOverlay';

const FormBuilder = ({ form }: { form: FormWithSettings }) => {
    const { formData, loading, setFormData, setBlockLayouts, setLoading } = useBuilder();
    const router = useRouter()
    const isPublished = formData?.published;

    const [isSidebarOpen, setIsSidebarOpen] = useState(
        isPublished ? false : true
    );

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 8
        }
    });

    const sensors = useSensors(mouseSensor);

    useEffect(() => {
        const fetchData = async () => {

            setFormData(form);

            if (form?.jsonBlocks) {
                const parsedBlocks = JSON.parse(form.jsonBlocks);
                setBlockLayouts(parsedBlocks);
            }

            setLoading(false);
            router.refresh();
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex h-56 items-center justify-center">
                <Loader size="3rem" className="animate-spin" />
            </div>
        );
    };



    return (
        <div>
            <DndContext sensors={sensors}>
                <BuilderDragOverlay />
                <SidebarProvider
                    open={isSidebarOpen}
                    onOpenChange={setIsSidebarOpen}
                    className="h-[calc(100vh_-_64px)]"
                    style={
                        {
                            "--sidebar-width": "300px",
                            "--sidebar-height": "40px",
                        } as CSSProperties
                    }
                >
                    <Builder isSidebarOpen={isSidebarOpen} />
                </SidebarProvider>
            </DndContext>
        </div>
    )
}

export default FormBuilder