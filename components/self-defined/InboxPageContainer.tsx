import { Suspense } from "react"
import ContextCardFallBack from "./ContextCardFallBack"
import { Invitation } from "@prisma/client"
import { DetailedInvitation, PromiseDetailedInvitation } from "./types";
import InvitationsContextCard from "./InvitationsContextCard";
import { Toaster } from "../ui/toaster";

interface InboxPageContainerProp {
    invites: PromiseDetailedInvitation
}

export default async function InboxPageContainer(
    {
        invites
    }: InboxPageContainerProp
) {
    const invitations: DetailedInvitation[] = await invites;

    return (
        <>
            <div>
                {/* For invitations */}
                <Suspense fallback={<ContextCardFallBack />}>
                    <InvitationsContextCard invitations={invitations} />
                </Suspense>

                {/* For other inboxes */}
            </div>
            <Toaster />
        </>
    )
}