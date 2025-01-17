import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import React from "react";
import { notFound } from "next/navigation";
import FormBuilder from "../../../_components/FormBuilder";


export const dynamic = "force-dynamic";
export const revalidate = 0;

interface BuilderPageProps {
    params: Promise<{
        formId: string;
    }>
}

const Builder = async ({ params }: BuilderPageProps) => {

    const session = getKindeServerSession();
    const user = await session.getUser();

    const { formId } = await params;

    console.log(formId);

    const form = await prisma.form.findFirst({
        where: {
            userId: user?.id,
            formId: formId,
        },
        include: {
            settings: true,
        },
    });



    if (!form) return notFound();
    console.log('Form', form);

    return (
        <React.Suspense>
            <FormBuilder form={form} />
        </React.Suspense>
    )
}

export default Builder