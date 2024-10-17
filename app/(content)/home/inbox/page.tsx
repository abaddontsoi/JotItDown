import ContextCardFallBack from "@/components/self-defined/ContextCardFallBack"
import InboxPageContainer from "@/components/self-defined/InboxPageContainer"
import { db } from "@/lib/db"
import { getUser } from "@/lib/getUser"
import Link from "next/link"
import { Suspense } from "react"

export default async () => {
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


    const invites = db.invitation.findMany({
        where: {
            toid: user.id,
        }
    })

    return (
        <>
            <div>
                <Suspense fallback={<ContextCardFallBack />}>
                    <InboxPageContainer 
                        invites={invites}
                    />
                </Suspense>
            </div>
        </>
    )
}