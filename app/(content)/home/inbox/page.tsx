import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import InboxPageContainer from "@/components/self-defined/InboxPageContainer"
import { PromiseDetailedInvitation } from "@/components/self-defined/types"
import { db } from "@/lib/db"
import { getUser } from "@/lib/getUser"
import Link from "next/link"
import { Suspense } from "react"

// function must not be anonymous
export default async function InboxPage() {
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


    const invites: PromiseDetailedInvitation = db.invitation.findMany({
        where: {
            toid: user.id,
        },
        include: {
            to: true,
            from: true,
            group: true
        }
    })

    return (
        <div>
            <Suspense fallback={<ContextCardFallBack />}>
                <InboxPageContainer
                    invites={invites}
                />
            </Suspense>
        </div>
    )
}