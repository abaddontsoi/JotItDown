import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getUser();

        console.log(user);

        if (user) {
            const data = await req.json();

            const insertNoteId = await db.note.create({
                data: { ...data.basic, belongToId: user.id },
            })

            if (data.extra?.category) {
                const found = await db.category.findFirst({
                    where: {
                        name: data.extra?.category,
                        belongToId: user.id,
                    }
                });

                if (!found) {
                    const createCategory = await db.category.create({
                        data: {
                            name: data.extra?.category,
                            belongToId: user.id
                        }
                    })
                    const updateResponse = await db.note.update({
                        where: {
                            id: insertNoteId.id
                        },
                        data: {
                            categoryId: createCategory.id
                        }
                    });
                } else {
                    const updateResponse = await db.note.update({
                        where: {
                            id: insertNoteId.id
                        },
                        data: {
                            categoryId: found.id
                        }
                    });
                }
            }

            return new NextResponse(JSON.stringify({
                message: 'Note Created'
            }), {
                status: 200
            });
        }

        return new NextResponse(JSON.stringify({
            message: 'Unauthorized'
        }), {
            status: 401
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Failed'
        }), {
            status: 500
        })
    }
}

export async function PATCH(req: Request) {
    try {
        const user = await getUser();

        if (!user) {
            return new NextResponse(JSON.stringify({
                message: 'Unauthorized'
            }), {
                status: 401
            });

        }

        const data = await req.json();

        // see if the submitted category is found
        const { basic, extra } = data;

        // update the actual note
        const { id, ...values } = basic;
        const updateNoteId = await db.note.update({
            where: {
                id: id
            },
            data: {
                ...values
            }
        })

        // proccess the categoty
        if (extra?.category) {
            const categoryFound = await db.category.findFirst(
                {
                    where: {
                        name: extra?.category,
                    }
                }
            )
            if (!categoryFound) {
                const newCateId = await db.category.create({
                    data: {
                        name: extra?.category,
                        belongToId: user.id,
                    }
                });
                await db.note.update(
                    {
                        where: {
                            id: updateNoteId.id,
                        },
                        data: {
                            categoryId: newCateId.id
                        }
                    }
                );
            } else {
                await db.note.update(
                    {
                        where: {
                            id: updateNoteId.id,
                        },
                        data: {
                            categoryId: categoryFound.id
                        }
                    }
                );
            }
        }

        return new NextResponse(JSON.stringify({
            message: 'Note Created'
        }), {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({
            message: 'Failed'
        }), {
            status: 500
        })
    }
}

export async function DELETE(req: Request) {
    try {
        const data = await req.json();

        // console.log(data);
        // { target: '66de5d41cafa0fe9daf43828' }

        const deleteResponse = await db.note.update(
            {
                where: {
                    id: data.target
                },
                data: {
                    hidden: true
                }
            }
        );
        return new NextResponse(JSON.stringify({
            message: 'OK',
            extraInfo: deleteResponse
        }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({
            message: 'Something Went Wrong',
        }), { status: 500 });
    }
}