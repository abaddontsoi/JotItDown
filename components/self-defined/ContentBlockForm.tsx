'use client';

import { z } from "zod";
import { DetailedContentBlock } from "./types";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { TaskInfo, TaskInfoStatus } from "@prisma/client";
import { Label } from "../ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { Plus } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
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
            title: existingContentBlock?.title || undefined,
            parentNoteId: defaultParentNodeId,
            content: existingContentBlock?.content
        }
    })

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/content-block', values);
            console.log(response);
            if (response.status == 200) {
                toast.success('Inserted');
                setContentBlock(undefined);
                router.refresh();
                setMode('Close');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
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
                        <Button className="basis-1/2">Save</Button>
                        <Button className="basis-1/2 border-2 border-gray-900 bg-white text-red-500 hover:bg-slate-100"
                            type='reset'
                            onClick={() => {
                                setContentBlock(undefined);
                                setMode('Close');
                            }}
                        >Cancel</Button>
                    </div>
                </form>
            </Form >
        </>
    )
}

export default ContentBlockForm;