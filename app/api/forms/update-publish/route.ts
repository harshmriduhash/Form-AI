import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const headers = { "Cache-Control": "no-store" };

  try {
    const { formId, published } = await req.json();

    if (!formId) {
      return NextResponse.json(
        { error: "formId is required" },
        { status: 400, headers }
      );
    }

    if (typeof published !== "boolean") {
      return NextResponse.json(
        { error: "Published field must be a boolean" },
        { status: 400, headers }
      );
    }

    const updatedForm = await prisma.form.update({
      where: { formId },
      data: { published },
      include: {
        settings: true,
      },
    });

    if (!updatedForm) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404, headers }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Form ${published ? "published" : "unpublished"} successfully`,
        form: updatedForm,
      },
      { headers }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500, headers }
    );
  }
}
