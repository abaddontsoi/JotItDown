'use client'

import { CashFlowRecordFormSchmea } from "@/schmea/BudgetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DetailedCashFlowRecord, DialogModes } from "./types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { CashFlowType } from ".prisma/client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { Check, TicketCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CashFlowRecordFormProp {
    mode: DialogModes,
    existingDetailedCashFlowRecord?: DetailedCashFlowRecord;
    type: CashFlowType;
    setType: (type: CashFlowType) => void;
    setMode: (mode: DialogModes) => void;
    setDetailedCashFlowRecord: (record: DetailedCashFlowRecord | undefined) => void;
}

const CashFlowRecordForm = (
    {
        mode,
        existingDetailedCashFlowRecord,
        type,
        setMode,
        setType,
        setDetailedCashFlowRecord
    }: CashFlowRecordFormProp
) => {
    const form = useForm<z.infer<typeof CashFlowRecordFormSchmea>>({
        resolver: zodResolver(CashFlowRecordFormSchmea),
        defaultValues: {
            id: existingDetailedCashFlowRecord?.id,
            title: existingDetailedCashFlowRecord?.title,
            value: existingDetailedCashFlowRecord?.value,
            description: existingDetailedCashFlowRecord?.description || undefined,
            type: existingDetailedCashFlowRecord?.type || type,
            category: existingDetailedCashFlowRecord?.category || undefined,
            isLongTermUsage: existingDetailedCashFlowRecord?.isLongTermUsage,
        }
    });
    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof CashFlowRecordFormSchmea>) => {
        try {
            // values.value = parseInt(values.value)
            if (mode == 'Create') {
                const response = axios.post('/api/budget/cash-flow-record', values).then(response => {
                    if (response.status == 200) {
                        toast({
                            title: 'Success',
                            description: (
                                <>
                                    <div className="flex flex-row gap-2 items-center">
                                        <Check />
                                        The record has been added
                                    </div>
                                </>
                            ),
                        });
                        // console.dir(response, {
                        //     depth: null
                        // });
                        router.refresh();
                    }
                });
                toast({
                    description: 'Creating new record ...',
                });
                setMode('Close');
            } else if (mode == 'Edit') {
                const response = axios.patch('/api/budget/cash-flow-record', values).then(response => {
                    if (response.status == 200) {
                        toast({
                            title: 'Success',
                            description: (
                                <>
                                    <div className="flex flex-row gap-2">
                                        <Check />
                                        The record has been updated
                                    </div>
                                </>
                            )
                        });
                        // console.dir(response, {
                        //     depth: null
                        // });
                        router.refresh();
                    }
                });
                setDetailedCashFlowRecord(undefined);
                setMode('Close');
            }
        } catch (error) {
            toast({
                description: (
                    <>
                        <X />
                        {mode + ' failed. '}
                    </>
                ),
            });
        }
    }

    // console.dir(
    //     CashFlowRecordFormSchmea.shape,
    //     {
    //         depth: null,
    //     }
    // );

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">

                    {/* title */}
                    <FormField
                        name='title'
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
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
                        name='value'
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Value</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />

                    {/* description */}
                    <FormField
                        name='description'
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Description
                                        </FormLabel>
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

                    {/* category */}
                    <FormField
                        name='category'
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel>
                                            Category
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Please enter category name..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />

                    {/* isLongTermUsage */}
                    <FormField
                        name='isLongTermUsage'
                        control={form.control}
                        render={
                            ({ field }) => {
                                return (
                                    <FormItem className="flex flex-row justify-between items-center">
                                        Long Term Usage?
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }
                        }
                    />


                    {/* Submit Button */}
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

export default CashFlowRecordForm;