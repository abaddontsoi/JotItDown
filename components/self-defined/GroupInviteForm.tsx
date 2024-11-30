'use client';

import { getForm, groupInvitationFormSchema } from "@/schmea/GroupInviteSchema";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { DetailedGroup, Modes } from "./types";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { useState } from "react";
import { Save, X } from "lucide-react";

interface GroupInviteFormProp {
    mode: Modes;
    existingGroup: DetailedGroup;
    setMode: (mode: Modes) => void;
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
                    toast(ToastDone);
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
                        <Button 
                            type="button" 
                            className="flex w-full text-red-400 hover:text-red-400 border-2 border-gray-900" 
                            variant={'outline'}
                            onClick={() => {
                                setMode('Close');
                            }}
                        >
                            <div className="flex items-center gap-2">
                                Cancel
                                <X className="w-4 h-4" />
                            </div>
                        </Button>
                        <Button type="submit" className="flex w-full">
                            <div className="flex items-center gap-2">
                                Save
                                <Save className="w-4 h-4" />
                            </div>
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}