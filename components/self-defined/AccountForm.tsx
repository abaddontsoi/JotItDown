'use client';

import { z } from "zod";
import { DetailedAccountRecord, Modes } from "./types";
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
import { Checkbox } from "../ui/checkbox";
import { Save, X } from "lucide-react";

interface AccountFormProp {
    mode: Modes;
    account?: DetailedAccountRecord;
    setMode: (mode: Modes) => void;
}

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    originalCapital: z.number().optional(),
    isPersonalSpending: z.boolean().default(false),
    isIncomeSource: z.boolean().default(false),
})

export default function AccountForm({ mode, account, setMode }: AccountFormProp) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: account?.id || undefined,
            title: account?.title || 'New Account',
            description: account?.description || undefined,
            originalCapital: account?.originalCapital || undefined,
            isPersonalSpending: account?.isPersonalSpending || false,
            isIncomeSource: account?.isIncomeSource || false,
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title and Capital Section */}
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter account title" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="originalCapital"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Initial Balance ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        onChange={(e) => form.setValue("originalCapital", parseFloat(e.target.value) || 0)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Description Section */}
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter account description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Account Type Section */}
                <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium">Account Type</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="isPersonalSpending"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="leading-none">
                                        <FormLabel>Personal Spending Account</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isIncomeSource"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="leading-none">
                                        <FormLabel>Income Source</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        type="reset"
                        className="flex-1"
                        variant={'cancel'}
                        onClick={() => setMode('Close')}
                    >
                        <div className="flex items-center gap-2">
                            Cancel
                            <X className="w-4 h-4" />
                        </div>
                    </Button>
                    <Button type="submit" className="flex-1">
                        <div className="flex items-center gap-2">
                            Save
                            <Save className="w-4 h-4" />
                        </div>
                    </Button>
                </div>
            </form>
        </Form>
    );
}