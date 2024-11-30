import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import GroupPageContainer from "@/components/self-defined/GroupPageContainer";
import GroupPageHeader from "@/components/self-defined/GroupPageHeader";
import { DetailedGroup, DetailedNote, DetailedTaskInfo, PromiseDetailedGroup, PromiseDetailedNotes } from "@/components/self-defined/types";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Group } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

interface GroupPageProp {

}

const GroupPage = async (
    {
        params
    }: {
        params: {
            groupId: string
        }
    }
) => {

    // const session = await auth();
    const user = await getUser();

    if (!user) {
        return (
            <>
                Please <Link href={'/login'}>
                    Sign in
                </Link>
            </>
        )
    }
    try {
        const group: Promise<DetailedGroup & {
            Note: DetailedNote[],
            TaskInfo: DetailedTaskInfo[],
        } | null> = db.group.findFirstOrThrow({
            where: {
                id: params.groupId,
                GroupUser: {
                    some: {
                        userId: user.id
                    }
                }
            },
            include: {
                GroupUser: {
                    include: {
                        user: true
                    }
                },
                updatedBy: true,
                Note: {
                    include: {
                        category: true,
                        contentBlocks: {
                            include: {
                                taskInfo: true,
                            }
                        },
                        // optional
                        // parentNote: {
                        //     include: {
                        //         contentBlocks: {
                        //             include: {
                        //                 taskInfo: true,
                        //             }
                        //         },
                        //     }
                        // }
                    }
                },
                TaskInfo: {
                    include: {
                        parentContentBlock: {
                            include: {
                                parentNote: true
                            }
                        }
                    }
                },
            }
        });

        return (
            <Suspense fallback={<ContextCardFallBack />}>
                {/* container */}
                <GroupPageContainer groupData={group} />
            </Suspense>
        )
    } catch (error) {
        return (
            <>
                <Suspense fallback={<ContextCardFallBack />}>
                    {/* container */}
                    {/* <GroupPageContainer groupData={group} /> */}
                    <div>
                        No such group
                    </div>
                </Suspense>
            </>
        )
    }
}
export const dynamic = 'force-dynamic';

export default GroupPage;