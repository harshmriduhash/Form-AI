import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const headers = { 'Cache-Control': 'no-store' };

    try {
        const session = getKindeServerSession();
        const user = await session.getUser();

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access" },
                { status: 401, headers }
            );
        }

        const body = await req.json();
        const { formId, name, description, stringifyBlocks } = body;

        if (!formId || !stringifyBlocks) {
            return NextResponse.json(
                { success: false, message: "Invalid form data" },
                { status: 400, headers }
            );
        }

        const updatedForm = await prisma.form.update({
            where: { formId },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                jsonBlocks: stringifyBlocks,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Form saved successfully",
                updatedForm,
            },
            { headers }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error saving form:", error.message);
        return NextResponse.json(
            { success: false, message: "Error while saving the form" },
            { status: 500, headers }
        );
    }
}
