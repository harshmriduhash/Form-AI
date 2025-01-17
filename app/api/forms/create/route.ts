import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { defaultPrimaryColor, defaultBackgroundColor } from "@/constant";
import { generateUniqueId } from "@/lib/helper";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    console.log("object");

    const headers = { 'Cache-Control': 'no-store' };

    try {
        const session = getKindeServerSession();
        const user = await session.getUser();
        console.log(user);

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401, headers }
            );
        }

        const { name, description } = await req.json();

        const jsonBlocks = JSON.stringify([
            {
                id: generateUniqueId(),
                blockType: "RowLayout",
                attributes: {},
                isLocked: true,
                childBlocks: [
                    {
                        id: generateUniqueId(),
                        blockType: "Heading",
                        attributes: {
                            label: name || "Untitled form",
                            level: 1,
                            fontSize: "4x-large",
                            fontWeight: "normal",
                        },
                    },
                    {
                        id: generateUniqueId(),
                        blockType: "Paragraph",
                        attributes: {
                            label: "Paragraph",
                            text: description || "Add a description here.",
                            fontSize: "small",
                            fontWeight: "normal",
                        },
                    },
                ],
            },
        ]);

        const formSettings = await prisma.formSettings.create({
            data: {
                primaryColor: defaultPrimaryColor,
                backgroundColor: defaultBackgroundColor,
            },
        });

        const newForm = await prisma.form.create({
            data: {
                name,
                description,
                userId: user.id,
                creatorName: user.given_name || "Anonymous",
                settingsId: formSettings.id,
                jsonBlocks,
            },
        });

        revalidatePath("/");

        return NextResponse.json(
            {
                success: true,
                message: "Form created successfully!🎉",
                newForm,
            },
            { headers }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Internal Server Error" },
            { status: 500, headers }
        );
    }
}
