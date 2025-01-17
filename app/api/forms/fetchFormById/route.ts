export const dynamic = "force-dynamic";

// export async function GET(req: Request) {
//     try {
//         const session = getKindeServerSession();
//         const user = await session.getUser();

//         if (!user) {
//             return NextResponse.json(
//                 { error: "Unauthorized to use this resource" },
//                 { status: 401 }
//             );
//         }

//         // Fix: Ensure a full URL is provided to the URL constructor
//         const host = req.headers.get("host");
//         if (!host) {
//             return NextResponse.json({ error: "Host header is missing" }, { status: 400 });
//         }

//         const fullUrl = new URL(req.url, `http://${host}`);
//         const formId = fullUrl.searchParams.get("formId");

//         if (!formId) {
//             return NextResponse.json(
//                 { error: "formId is required" },
//                 { status: 400 }
//             );
//         }

//         const form = await prisma.form.findFirst({
//             where: {
//                 userId: user.id,
//                 formId: formId,
//             },
//             include: {
//                 settings: true,
//             },
//         });

//         if (!form) {
//             return NextResponse.json({ error: "Form not found" }, { status: 404 });
//         }

//         return NextResponse.json({
//             data: {
//                 success: true,
//                 message: "Form fetched successfully",
//                 form,
//             },
//         });
//     } catch (error: any) {
//         return NextResponse.json(
//             { error: error?.message || "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
  // try {
  //     const { formId } = await req.json();  // Extract formId from request body
  //     if (!formId) {
  //         return NextResponse.json(
  //             { error: "formId is required" },
  //             { status: 400 }
  //         );
  //     }
  //     const session = getKindeServerSession();
  //     const user = await session.getUser();
  //     if (!user) {
  //         return NextResponse.json(
  //             { error: "Unauthorized to use this resource" },
  //             { status: 401 }
  //         );
  //     }
  //     const form = await prisma.form.findFirst({
  //         where: {
  //             userId: user.id,
  //             formId: formId,
  //         },
  //         include: {
  //             settings: true,
  //         },
  //     });
  //     if (!form) {
  //         return NextResponse.json({ error: "Form not found" }, { status: 404 });
  //     }
  //     return NextResponse.json({
  //         data: {
  //             success: true,
  //             message: "Form fetched successfully",
  //             form,
  //         },
  //     });
  // } catch (error: any) {
  //     return NextResponse.json(
  //         { error: error?.message || "Internal Server Error" },
  //         { status: 500 }
  //     );
  // }
}
