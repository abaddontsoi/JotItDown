'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { DetailedGroup, DialogModes } from "./types";
import { z } from "zod";
import { getForm, groupFormSchema } from "@/schmea/GroupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { ToastLoading, ToastError, ToastConfirm } from "./toast-object";
import axios from "axios";
import Error from "next/error";
import { useRouter } from "next/navigation";

interface GroupFormProp {
    mode: DialogModes;
    existingGroup?: DetailedGroup;
    setMode: (mode: DialogModes) => void;
    setGroup: (mode?: DetailedGroup) => void;
}

export default function GroupForm(
    {
        mode,
        existingGroup,
        setMode,
        setGroup,
    }: GroupFormProp
) {
    const router = useRouter();
    const form = getForm(existingGroup);
    const onSubmit = async (values: z.infer<typeof groupFormSchema>) => {
        try {
            if (mode == 'Create') {
                axios.post('/api/group', values).then(
                    response => {
                        if (response.status == 200) {
                            toast(ToastConfirm);
                            setMode('Close');
                            setGroup();
                            router.refresh();
                        } else {
                            toast(ToastError);
                        }
                    }
                ).catch(error => {
                    console.log(error);
                    toast(ToastError);
                });
            } else if (mode == 'Edit') {
                axios.patch('/api/group', values).then(
                    response => {
                        if (response.status == 200) {
                            toast(ToastConfirm);
                            setMode('Close');
                            setGroup();
                            router.refresh();
                        } else {
                            toast(ToastError);
                        }
                    }
                ).catch(error => {
                    console.log(error);
                    toast(ToastError);
                });
            }
            toast(ToastLoading);
            setMode('Close');
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Group Name */}
                <FormField
                    name="name"
                    control={form.control}
                    render={
                        ({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Group Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )
                        }
                    }
                />

                {/* Group Description */}
                <FormField
                    name="description"
                    control={form.control}
                    render={
                        ({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Group Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )
                        }
                    }
                />

                {/* Submit buttons */}
                <div className="flex flex-row items-center gap-2 mt-4">
                    <Button type="button" className="flex w-full text-red-400 hover:text-red-400 border-2 border-gray-900" variant={'outline'}
                        onClick={() => {
                            setMode('Close');
                            setGroup();
                        }}
                    >Cancel</Button>
                    <Button type="submit" className="flex w-full">Save</Button>
                </div>
            </form>
        </Form>
    )
}