'use client';

import { z } from "zod";
import { DetailedContentBlock } from "./types";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskInfo, TaskInfoStatus } from "@prisma/client";
import { Label } from "../ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { Check, Plus, Save, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    content: z.string(),
    parentNoteId: z.string().optional()
})

const ContentBlockForm = ({ mode, existingContentBlock, defaultParentNodeId, setMode, setContentBlock }: {
    mode: 'Edit' | 'Create' | 'Close',
    existingContentBlock?: DetailedContentBlock,
    defaultParentNodeId?: string,
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
    setContentBlock: Dispatch<SetStateAction<DetailedContentBlock | undefined>>
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: existingContentBlock?.id || undefined,
            title: existingContentBlock?.title || undefined,
            parentNoteId: defaultParentNodeId,
            content: existingContentBlock?.content,
        }
    })

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            if (mode == 'Create') {
                const postRequest = axios.post('/api/content-block', values).then((value) => {
                    if (value.status == 200) {
                        toast(ToastDone);
                        router.refresh();
                    }
                });
                toast(ToastLoading);
                setContentBlock(undefined);
                setMode('Close');
            } else if (mode == 'Edit') {
                const postRequest = axios.patch('/api/content-block', values).then(value => {
                    if (value.status == 200) {
                        toast(ToastDone);
                        router.refresh();
                    }
                });
                toast(ToastLoading);
                setContentBlock(undefined);
                setMode('Close');
            }
        } catch (error) {
            console.log(error);
            toast({
                ...ToastError,
                variant: "destructive",
            });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Form Field for Title */}
                    <FormField
                        name={'title'}
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Title
                                    </FormLabel>
                                    <Input
                                        {...field}
                                    />
                                </FormItem>
                            )
                        }}
                    />

                    {/* Form Field for Content */}
                    <FormField
                        name={'content'}
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormItem className="text-lg">
                                    <FormLabel>
                                        Content
                                    </FormLabel>
                                    <Textarea
                                        {...field}
                                    />
                                </FormItem>
                            )
                        }}
                    />

                    {/* Submit Button */}
                    <div className="w-full flex flex-row-reverse mt-3 gap-1">
                        <Button className="basis-1/2" type="submit">
                            <div className="flex items-center gap-2">
                                Save
                                <Save className="w-4 h-4" />
                            </div>
                        </Button>
                        <Button 
                            className="basis-1/2 border-2 border-gray-900 bg-white text-red-500 hover:bg-slate-100"
                            type='reset'
                            onClick={() => {
                                setContentBlock(undefined);
                                setMode('Close');
                            }}
                        >
                            <div className="flex items-center gap-2">
                                Cancel
                                <X className="w-4 h-4" />
                            </div>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}

export default ContentBlockForm;