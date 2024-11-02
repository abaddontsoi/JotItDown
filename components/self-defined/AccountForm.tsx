'use client';

import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { DetailedAccountRecord, DialogModes } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface AccountFormProp {
    mode: DialogModes;
    account?: DetailedAccountRecord;
    setMode: (mode: DialogModes) => void;
}

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
})

const AccountForm = (
    {
        mode,
        account,
        setMode,
    }: AccountFormProp
) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: account?.id || undefined,
            title: account?.title || 'New Account',
            description: account?.description || undefined,
        }
    });
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (mode == 'Create') {
                axios.post('/api/accounting/account', values).then(response => {
                    if (response.status == 200) {
                        toast(ToastDone);
                        router.refresh();
                    }
                })
            } else if (mode == 'Edit') {
                axios.patch('/api/accounting/account', values).then(response => {
                    if (response.status == 200) {
                        toast(ToastDone);
                        router.refresh();
                    }
                });
            }
            toast(ToastLoading);
            setMode('Close');
        } catch (error) {
            toast(ToastError);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* title */}
                    <FormField
                        name="title"
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                // type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />

                    {/* Description */}
                    <FormField
                        name="description"
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />

                    {/* confirm or cancel */}
                    <div className="w-full flex flex-row-reverse mt-3 gap-1">
                        <Button className="basis-1/2" type="submit">Save</Button>
                        <Button className="basis-1/2 border-2 border-gray-900 bg-white text-red-500 hover:bg-slate-100"
                            type='reset'
                            onClick={() => {
                                setMode('Close');
                            }}
                        >Cancel</Button>
                    </div>

                </form>
            </Form>
        </>
    )
}

export default AccountForm;