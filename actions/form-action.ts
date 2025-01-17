"use server"

import { prisma } from "@/lib/prisma";
import { FormWithSettings } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { unstable_noStore } from "next/cache";

export async function getAuthUser() {
    const session = getKindeServerSession();
    const user = await session.getUser();
    return user;
}

// Fetch form Statistics
export async function fetchFormStats() {
    try {
        const session = getKindeServerSession();
        const user = await session.getUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized access"
            }
        };

        const { _sum, _count } = await prisma.form.aggregate({
            where: {
                userId: user.id
            },
            _sum: {
                views: true,
                responses: true
            },
            _count: {
                id: true
            }
        });

        const views = _sum.views ?? 0;
        const totalResponses = _sum.responses ?? 0;
        const totalForms = _count.id ?? 0;

        const conversionRate = views > 0 ? ((totalResponses / views) * 100).toFixed(2) : 0;
        const engagementRate = totalForms > 0 ? ((totalResponses / totalForms) * 100).toFixed(2) : 0;

        return {
            success: true,
            views,
            totalResponses,
            totalForms,
            conversionRate,
            engagementRate
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while fetching form stats"
        }
    }
}

// Create a new form

// type CreateFormType = {
//     name: string;
//     description: string
// }

// export async function createForm(data: CreateFormType) {
//     try {
//         const session = getKindeServerSession();
//         const user = await session.getUser();

//         if (!user) {
//             return {
//                 success: false,
//                 message: "Unauthorized access"
//             }
//         };

//         const jsonBlocks = JSON.stringify([
//             {
//                 id: generateUniqueId(),
//                 blockType: "RowLayout",
//                 attributes: {},
//                 isLocked: true,
//                 childBlocks: [
//                     {
//                         id: generateUniqueId(),
//                         blockType: "Heading",
//                         attributes: {
//                             label: data.name || "Untitled form",
//                             level: 1,
//                             fontSize: "4x-large",
//                             fontWeight: "normal",
//                         },
//                     },
//                     {
//                         id: generateUniqueId(),
//                         blockType: "Paragraph",
//                         attributes: {
//                             label: "Paragraph",
//                             text: data.description || "Add a description here.",
//                             fontSize: "small",
//                             fontWeight: "normal",
//                         },
//                     },
//                 ],
//             },
//         ]);


//         const formSettings = await prisma.formSettings.create({
//             data: {
//                 primaryColor: defaultPrimaryColor,
//                 backgroundColor: defaultBackgroundColor
//             }
//         });

//         const newForm = await prisma.form.create({
//             data: {
//                 name: data.name,
//                 description: data.description,
//                 userId: user.id,
//                 creatorName: user.given_name || 'Anonymous',
//                 settingsId: formSettings.id,
//                 jsonBlocks,
//             }
//         });

//         if (!newForm) {
//             return {
//                 success: false,
//                 message: "Could not create form. Please try again."
//             }
//         };

//         return {
//             newForm,
//             success: true,
//             message: "Form created successfully!🎉"
//         }
//     } catch (error) {
//         return {
//             success: true,
//             message: "Something went wrong while creating the form."
//         }
//     }
// };


// get All form by the user
export async function fetchAllFormsByUserId() {
    try {
        const user = await getAuthUser();
        if (!user) {
            return {
                success: false,
                message: "Unauthorized access"
            }
        };

        const allForms = await prisma.form.findMany({
            where: {
                userId: user.id,
            },
            include: {
                settings: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return {
            allForms,
            success: true,
            message: "All forms fetched successfully!"
        }


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            message: "Error fetching all forms by user"
        }
    }
};


// save the form
export async function saveForm(data: {
    formId: string;
    name?: string;
    description?: string;
    stringifyBlocks: string;
}) {
    unstable_noStore();
    try {
        const { formId, name, description, stringifyBlocks } = data;
        const user = await getAuthUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized access"
            }
        };

        if (!formId || !stringifyBlocks) {
            return {
                success: false,
                message: "Invalid Form Data"
            }
        };

        const savedForm = await prisma.form.update({
            where: {
                formId: formId
            },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                jsonBlocks: stringifyBlocks
            }
        });

        return {
            savedForm,
            success: true,
            message: "Form saved successfully"
        }


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            message: "Error while saving the form"
        }
    }
};


//handle Form Publish/Unpublish
// export async function updatePublish(formId: string, published: boolean) {
//     try {
//         const user = await getAuthUser();

//         if (!user) {
//             return {
//                 success: false,
//                 message: "Unauthorized to use this resource",
//             };
//         }

//         if (!formId) {
//             return {
//                 success: false,
//                 message: "FormId is required",
//             };
//         }

//         const form = await prisma.form.update({
//             where: { formId },
//             data: { published },
//         });

//         return {
//             success: true,
//             message: `Form successfully ${published ? "published" : "unpublished"}`,
//             published: form.published,
//         };
//     } catch (error) {
//         return {
//             success: false,
//             message: "Failed to update publish status",
//         };
//     }
// };


export async function submitResponse(formId: string, response: string) {

    try {
        if (!formId) {
            return {
                success: false,
                message: "FormId is required",
            };
        }
        await prisma.form.update({
            where: {
                formId: formId,
                published: true,
            },
            data: {
                formResponses: {
                    create: {
                        jsonResponse: response,
                    },
                },
                responses: {
                    increment: 1,
                },
            },
        });
        return {
            success: true,
            message: "Response submitted",
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};


export async function fetchAllResponseByFormId(formId: string) {
    try {
        const session = getKindeServerSession();
        const user = await session.getUser();

        if (!user) {
            return {
                success: false,
                message: "Unauthorized to use this resource",
            };
        }

        const form = await prisma.form.findUnique({
            where: {
                formId: formId,
            },
            include: {
                formResponses: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        return {
            success: true,
            message: "Form fetched successfully",
            form,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}


export async function fetchPublishFormById(formId: string): Promise<{
    form?: FormWithSettings | null;
    success: boolean;
    message: string;
}> {
    try {
        if (!formId) {
            return {
                success: false,
                message: "FormId is required",
            };
        }
        const form = await prisma.form.findFirst({
            where: {
                formId: formId,
                published: true,
            },
            include: {
                settings: true,
            },
        });

        if (!form) {
            return {
                success: false,
                message: "Form not found",
            };
        }

        return {
            success: true,
            message: "Form fetched successfully",
            form,
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}