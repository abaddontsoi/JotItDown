'use client';

import { Invitation } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastConfirm, ToastError, ToastLoading } from "./toast-object";
import axios from "axios";
import { DetailedInvitation } from "./types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface InvitationCardProp {
    invitation: DetailedInvitation;
}

const InvitationCard = (
    {
        invitation
    }: InvitationCardProp
) => {
    const router = useRouter();
    const handle = async (accept: boolean) => {
        try {
            // post api
            axios.post('/api/invitation/group', {
                id: invitation.id,
                isAccept: accept,
            }).then(response => {
                if (response.status == 200) {
                    toast(ToastConfirm);
                } else {
                    toast(ToastError);
                }
                router.refresh();
            }).catch(error => {
                console.log(error);
                toast(ToastError);
            });
            // toast
            toast(ToastLoading);
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>From {invitation.from.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
                {/* Invite of ... */}
                {
                    invitation.groupId &&
                    <CardDescription className="w-full">
                        {invitation.from.name} invites you to group {`\"${invitation.group?.name}\"`}
                    </CardDescription>
                }

                {/* Check and Cross button with api calling */}
                {
                    !invitation.read &&
                    <div className="w-full flex flex-row-reverse">
                        <HoverCard openDelay={200}>
                            <HoverCardTrigger asChild>
                                <Button variant={'ghost'} onClick={() => handle(true)}>
                                    <Check color="green" />
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit">
                                Accept Invite
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard openDelay={200}>
                            <HoverCardTrigger asChild>
                                <Button variant={'ghost'} onClick={() => handle(false)}>
                                    <X color="red" />
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-fit">
                                Reject Invite
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                }
                {
                    invitation.read && (
                        'Replied'
                    )
                }
            </CardContent>
        </Card>
    )
}

export default InvitationCard;