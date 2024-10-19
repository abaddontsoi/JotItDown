'use client';

import { Invitation } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import InvitationCard from "./InvitationCard";

interface InvitationsContextCardProp {
    invitations: Invitation[],
}


const InvitationsContextCard = (
    {
        invitations
    }: InvitationsContextCardProp
) => {

    // filtered invitations
    const read = invitations.filter(i => i.read);
    const unread = invitations.filter(i => !i.read);

    return (
        <>
            <Card>
                <CardHeader>
                    Invitations
                </CardHeader>
                <CardContent>
                    {/* Unread invitations */}
                    {
                        unread.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation}/>
                        ))
                    }
                    <Separator />

                    {/* Read invitations */}
                    {
                        read.map(invitation => (
                            <InvitationCard key={invitation.id} invitation={invitation}/>
                        ))
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default InvitationsContextCard;