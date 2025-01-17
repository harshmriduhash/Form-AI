'use server'

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore } from "next/cache";

// export const dynamic = "force-dynamic"

export const getFormData = async (formId: string) => {
    unstable_noStore();
    const session = getKindeServerSession();
    const user = await session.getUser();

    const form = await prisma.form.findFirst({
        where: {
            userId: user?.id,
            formId: formId,
        },
        include: {
            settings: true,
        },
    });


    return form;
}

