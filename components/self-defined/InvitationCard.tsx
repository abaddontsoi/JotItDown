'use client';

import { Invitation } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastConfirm, ToastError, ToastLoading } from "./toast-object";
import axios from "axios";

interface InvitationCardProp {
    invitation: Invitation;
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
                if(response.status == 200) {
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
                <CardTitle>From {invitation.fromid}</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Invite of ... */}

                {/* Check and Cross button with api calling */}
                {
                    !invitation.read && 
                    <div className="w-full flex flex-row-reverse">
                        <Button variant={'ghost'} onClick={() => handle(true)}>
                            <Check color="green" />
                        </Button>
                        <Button variant={'ghost'} onClick={() => handle(false)}>
                            <X color="red" />
                        </Button>
                    </div>
                }
                {
                    invitation.read && (
                        'Invitation is replied'
                    )
                }
            </CardContent>
        </Card>
    )
}

export default InvitationCard;