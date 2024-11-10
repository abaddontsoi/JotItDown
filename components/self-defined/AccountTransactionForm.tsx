'use client';

import { Account, ItemAccount } from "@prisma/client";
import { DetailedTransaction, DialogModes } from "./types";
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
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { useRouter } from "next/navigation";

interface AccountTransactionFormProp {
    mode: DialogModes;
    allAccounts: ItemAccount[],
    transaction?: DetailedTransaction
    setMode: (mode: DialogModes) => void
}

const formSchema = z.object({
    id: z.string().optional(),

    category: z.string(),
    title: z.string(),
    value: z.string(),
    remark: z.string().optional(),

    from: z.string(),
    to: z.string(),

    fromCash: z.string().optional(),
    toCash: z.string().optional(),
})

const AccountTransactionForm = (
    {
        mode,
        allAccounts,
        transaction,
        setMode
    }: AccountTransactionFormProp
) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: transaction?.id,

            category: transaction?.from.category || '',
            title: transaction?.from.title || '',
            value: transaction?.from.value.toString() || '0',
            remark: transaction?.remark || undefined,
            
            from: transaction?.from.accountid || '',
            to: transaction?.to.accountid || '',

            fromCash: transaction?.fromId,
            toCash: transaction?.toId,
        }
    });
    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (mode == 'Create') {
                const { value, ...fields } = values;
                const data = {
                    value: parseFloat(values.value),
                    fields
                }
                axios.post('/api/accounting/transaction', data).then(
                    response => {
                        if (response.status == 200) {
                            toast(ToastDone);
                            setMode('Close');
                            router.refresh();
                        }
                    }
                ).catch(
                    error => {
                        console.log(error);
                        toast(ToastError);
                    }
                );
            } else if (mode == 'Edit') {
                axios.patch('/api/accounting/transaction', values).then(
                    response => {
                        if (response.status == 200) {
                            toast(ToastDone);
                            setMode('Close');
                            router.refresh();
                        }
                    }
                ).catch(
                    error => {
                        toast(ToastError);
                    }
                );
            }
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

                    {/* category input */}
                    <FormField
                        name="category"
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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