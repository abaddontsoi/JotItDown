import { Suspense } from "react"
import ContextCardFallBack from "./ContextCardFallBack"
import { Invitation } from "@prisma/client"

interface InboxPageContainerProp {
    invites: Promise<Invitation[]>
}

export default async (
    {
        invites
    }: InboxPageContainerProp
) => {
    const invitations: Invitation[] = await invites;

    return (
        <>
            <div>

                

                <Suspense fallback={<ContextCardFallBack />}>

                </Suspense>
            </div>
        </>
    )
}