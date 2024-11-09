import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack";
import GroupsPageContainer from "@/components/self-defined/GroupsPageContainer";
import { PromiseDetailedGroup } from "@/components/self-defined/types";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import Link from "next/link";
import { Suspense } from "react";

interface GroupsPageProp {

}

const GroupsPage = async (
    { }: GroupsPageProp
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

    const userGroups = db.group.findMany({
        where: {
            GroupUser: {
                some: {
                    userId: user.id,
                }
            }
        },
        include: {
            GroupUser: {
                include: {
                    user: true
                }
            },
            updatedBy: true
        }
    })
    return (
        <>
            <Suspense fallback={<ContextCardFallBack />} >
                <GroupsPageContainer
                    userGroups={userGroups}
                />
            </Suspense>
            <Toaster />
        </>
    )
}

export const dynamic = 'force-dynamic';

export default GroupsPage;