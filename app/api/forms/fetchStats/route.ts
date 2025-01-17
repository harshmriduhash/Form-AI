import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    console.log("inside fetchStats");
    try {
        const session = getKindeServerSession();
        const user = await session.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const { _sum, _count } = await prisma.form.aggregate({
            where: { userId: user.id },
            _sum: { views: true, responses: true },
            _count: { id: true },
        });

        const views = _sum.views ?? 0;
        const totalResponses = _sum.responses ?? 0;
        const totalForms = _count.id ?? 0;

        const conversionRate = views > 0 ? ((totalResponses / views) * 100).toFixed(2) : 0;
        const engagementRate = totalForms > 0 ? ((totalResponses / totalForms) * 100).toFixed(2) : 0;

        return NextResponse.json({
            success: true,
            views,
            totalResponses,
            totalForms,
            conversionRate,
            engagementRate,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
