'use client';

import { getForm, groupInvitationFormSchema } from "@/schmea/GroupInviteSchema";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { DetailedGroup, DialogModes } from "./types";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { ToastConfirm, ToastError, ToastLoading } from "./toast-object";
import { useState } from "react";

interface GroupInviteFormProp {
    mode: DialogModes;
    existingGroup: DetailedGroup;
    setMode: (mode: DialogModes) => void;
    // setGroup: (group: DetailedGroup) => void;
}

export default function GroupInviteForm(
    {
        mode,
        existingGroup,
        setMode,
        // setGroup,
    }: GroupInviteFormProp
) {
    const form = getForm(existingGroup);

    const [targetNotFound, setTargetNotFound] = useState<boolean>(false);

    const onSubmit = async (values: z.infer<typeof groupInvitationFormSchema>) => {
        try {
            axios.post('/api/group/invite', values).then(response => {
                if (response.status == 200) {
                    toast(ToastConfirm);
                    setMode('Close');
                }
            }).catch(error => {
                console.log(error);
                toast(ToastError);
                setTargetNotFound(true);
            });
            toast(ToastLoading);
        } catch (error) {
            console.log(error);
            // toast(ToastError);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Friend's email input */}
                    <FormField
                        name="toEmail"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} />
                                </FormItem>
                            )
                        }}
                    />
                    {
                        targetNotFound && (
                            <>
                                <FormItem>
                                    <div className="text-red-400">
                                        User not exist.
                                    </div>
                                </FormItem>
                            </>
                        )
                    }

                    {/* Submit buttons */}
                    <div className="flex flex-row items-center gap-2 mt-4">
                        <Button type="button" className="flex w-full text-red-400 hover:text-red-400 border-2 border-gray-900" variant={'outline'}
                            onClick={() => {
                                setMode('Close');
                            }}
                        >Cancel</Button>
                        <Button type="submit" className="flex w-full">Save</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}