'use client';

import { Account } from "@prisma/client";
import { DialogModes } from "./types";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { ToastConfirm, ToastError, ToastLoading } from "./toast-object";
import { useRouter } from "next/navigation";

interface AccountTransactionFormProp {
    mode: DialogModes;
    allAccounts: Account[],
    setMode: (mode: DialogModes) => void
}

const formSchema = z.object({
    from: z.string(),
    to: z.string(),

    title: z.string(),

    value: z.string(),
    remark: z.string().optional(),
})

const AccountTransactionForm = (
    {
        mode,
        allAccounts,
        setMode
    }: AccountTransactionFormProp
) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        }
    });

    const router = useRouter();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const {value, ...fields} = values;
            const data = {
                value: parseFloat(values.value),
                fields
            }

            axios.post('/api/accounting/transaction', data).then(
                response => {
                    if (response.status == 200) {
                        toast(ToastConfirm);
                        setMode('Close');
                        router.refresh();
                    }
                }
            ).catch(
                error => {
                    toast(ToastError);
                }
            );
            toast(ToastLoading);
            setMode('Close');
        } catch (error) {
            toast(ToastError);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center gap-2">
                    {/* from combo box */}
                    <FormField
                        name="from"
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>From</FormLabel>
                                        <FormControl>
                                            <Combobox
                                                options={
                                                    allAccounts.map(ac => (
                                                        {
                                                            value: ac.id,
                                                            label: ac.title,
                                                        }
                                                    ))
                                                }
                                                {...field}
                                            >
                                            </Combobox>
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />

                    {/* to combo box */}
                    <FormField
                        name="to"
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>To</FormLabel>
                                        <FormControl>
                                            <Combobox
                                                options={
                                                    allAccounts.map(ac => (
                                                        {
                                                            value: ac.id,
                                                            label: ac.title,
                                                        }
                                                    ))
                                                }
                                                {...field}
                                            >
                                            </Combobox>
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />
                </div>

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

                {/* value */}
                <FormField
                    name="value"
                    control={form.control}
                    render={
                        ({ field }) => {
                            return (
                                <FormItem className="w-full">
                                    <FormLabel>Amount {'($)'}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }
                    }
                />

                {/* Remark */}
                <FormField
                    name="remark"
                    control={form.control}
                    render={
                        ({ field }) => {
                            return (
                                <FormItem className="w-full">
                                    <FormLabel>Remark</FormLabel>
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
    )
}

export default AccountTransactionForm;