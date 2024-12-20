'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { DetailedNote } from "./types";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
// import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { NoteStatus } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { Save, X } from "lucide-react";


function extractLevelOneKeys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    status: z.enum(['Draft', 'Pending', 'Running', 'Done']),

    description: z.string().optional(),

    categoryId: z.string().optional(), // need passed from parent
    parentNoteId: z.string().optional(),

    groupId: z.string().optional(),

    stared: z.boolean(),
    hidden: z.boolean(),
})

const NoteForm = ({ existingNote, mode, groupId, setMode }: {
    existingNote?: DetailedNote,
    mode: 'Edit' | 'Create' | 'Close',
    groupId?: string,
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>
}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: existingNote?.id,
            title: existingNote?.title,
            status: existingNote?.status || 'Draft',

            description: existingNote?.description || '',
            
            categoryId: existingNote?.categoryId || undefined,
            parentNoteId: existingNote?.parentNoteId || undefined,
            
            groupId: groupId,

            stared: existingNote?.stared || false,
            hidden: existingNote?.hidden || false,
        }
    });
    const router = useRouter();
    const { isSubmitting, isValid } = form.formState;
    const [categoryForCreate, setCategoryForCreate] = useState<string>();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (mode == 'Create') {
                const data = {
                    basic: values,
                    extra: {
                        category: categoryForCreate?.toUpperCase(),
                    }
                }
    
                const noteResponse = axios.post('/api/note', data).then(value => {
                    if (value.status == 200) {
                        console.log(value);
                        // toast.success(value.data.message);
                        toast(ToastDone);
                        router.refresh();
                    }
                })
            }
            
            if (mode == 'Edit') {
                const data = {
                    basic: values,
                    extra: {
                        category: categoryForCreate?.toUpperCase(),
                    }
                }
    
                const noteResponse = axios.patch('/api/note', data).then(value => {
                    if (value.status == 200) {
                        console.log(value);
                        // toast.success(value.data.message);
                        toast(ToastDone);
                        router.refresh();
                    }
                })
            }
            toast(ToastLoading);
            setMode('Close');
        } catch (error) {
            console.log(error);
            // toast.error('Something Went Wrong');
            toast(ToastError);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                
                <div className="flex flex-row gap-2">
                    <FormField
                        name='title'
                        control={form.control}
                        disabled={isSubmitting}
                        render={({ field }) => {
                            return (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        Title
                                    </FormLabel>
                                    <Input
                                        {...field}
                                    >
                                    </Input>
                                </FormItem>
                            )
                        }}
                    >
                    </FormField>

                    {
                        mode == 'Create' &&
                        <FormItem className="w-full">
                            <FormLabel>
                                Category
                            </FormLabel>
                            <Input
                                defaultValue={existingNote?.category?.name}
                                onChange={(event) => {
                                    setCategoryForCreate(event.target.value.toUpperCase());
                                }}
                            />
                        </FormItem>
                    }
                    {
                        mode == 'Edit' &&
                        <FormItem className="w-full">
                            <FormLabel>
                                Category
                            </FormLabel>
                            <Input
                                defaultValue={existingNote?.category?.name}
                                onChange={(event) => {
                                    setCategoryForCreate(event.target.value);
                                }}
                            />
                        </FormItem>
                    }
                </div>

                <FormField
                    name={'description'}
                    control={form.control}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <Textarea
                                // className="w-fit"
                                    {...field}
                                />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    name='status'
                    control={form.control}
                    disabled={isSubmitting}
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    Status
                                </FormLabel>
                                <Combobox
                                    options={(extractLevelOneKeys(NoteStatus) as [string, ...string[]]).map(status => ({
                                        value: status,
                                        label: status.toLocaleUpperCase(),
                                    }))}
                                    {...field}
                                />
                            </FormItem>
                        )
                    }}
                >
                </FormField>

                <FormField
                    name='stared'
                    control={form.control}
                    disabled={isSubmitting}
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-row justify-between items-center">
                                <FormLabel>
                                    Star
                                </FormLabel>
                                <Switch
                                    checked={form.watch('stared')}
                                    onCheckedChange={(event) => {
                                        console.log(event);
                                        form.setValue('stared', event)
                                    }}
                                >
                                </Switch>
                            </FormItem>
                        )
                    }}
                >
                </FormField>

                <FormField
                    name='hidden'
                    control={form.control}
                    disabled={isSubmitting}
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-row justify-between items-center">
                                <FormLabel>
                                    Hidden
                                </FormLabel>
                                <Switch
                                    checked={form.watch('hidden')}
                                    onCheckedChange={(event) => {
                                        console.log(event);
                                        form.setValue('hidden', event)
                                    }}
                                >
                                </Switch>
                            </FormItem>
                        )
                    }}
                >
                </FormField>

                <div className="flex flex-row gap-2 justify-end">
                    <Button
                        className="bg-white border-2 border-gray-900 text-red-600 hover:bg-slate-100 basis-1/2"
                        type={'button'}
                        onClick={() => {
                            setMode('Close');
                        }}
                    >
                        <div className="flex items-center gap-2">
                            Cancel
                            <X className="w-4 h-4" />
                        </div>
                    </Button>
                    <Button
                        className="basis-1/2"
                        type="submit"
                    >
                        <div className="flex items-center gap-2">
                            Save
                            <Save className="w-4 h-4" />
                        </div>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default NoteForm;