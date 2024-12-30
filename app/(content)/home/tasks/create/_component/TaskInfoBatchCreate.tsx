'use client';

import { ToastDone, ToastError, ToastLoading } from "@/components/self-defined/toast-object";
import { DetailedNote } from "@/components/self-defined/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentBlock, Group, TaskInfoStatus } from "@prisma/client";
import { format } from "date-fns";
import { CheckIcon, MinusIcon, PlusIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
    tasks: z.array(z.object({
        title: z.string().optional(),
        description: z.string(),
        deadline: z.date().or(z.string()),
        status: z.enum(Object.values(TaskInfoStatus) as [string, ...string[]]),
        parentContentBlockid: z.string().optional(),
        groupId: z.string().optional(),
    }))
});

type FormSchema = z.infer<typeof formSchema>;

interface TaskInfoBatchCreateProp {
    notes: DetailedNote[];
    groups: Group[];
}

export default function TaskInfoBatchCreate({ notes, groups }: TaskInfoBatchCreateProp) {

    const router = useRouter();
    
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tasks: [{
                title: "",
                description: "",
                deadline: new Date(),
                status: TaskInfoStatus.Draft,
            }]
        }
    });

    const [selectedNote, setSelectedNote] = useState<DetailedNote>();
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
    const handleSelectNote = (noteId: string) => {
        const note = notes.find((note) => note.id === noteId);
        setSelectedNote(note);
        setContentBlocks(note?.contentBlocks || []);
    }

    const handleCancel = () => {
        router.push('/home/tasks');
    }

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "tasks",
    });

    const onSubmit = async (data: FormSchema) => {
        try {
            // console.log(data);
            toast(ToastLoading);
            const response = await fetch('/api/task/create-batch', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.status === 200) {
                router.push('/home/tasks');
                router.refresh();
                toast(ToastDone);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full h-[1px] bg-gray-200 my-2"></div>
                    <div className="flex gap-2 mb-2 w-full justify-between items-center">
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant={'outline'}
                                className="border-2 border-slate-500"
                                onClick={() => fields.length > 1 && remove(fields.length - 1)}
                            >
                                <MinusIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                type="button"
                                variant={'outline'}
                                className="border-2 border-slate-500"
                                onClick={() => append({
                                    title: "",
                                    description: "",
                                    deadline: new Date(),
                                    status: TaskInfoStatus.Draft,
                                })}
                            >
                                <PlusIcon className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex flex-row gap-2">
                            <Button
                                type="button"
                                variant={'cancel'}
                                className="flex flex-row items-center gap-1"
                                onClick={handleCancel}
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant={'default'}
                                className="flex flex-row items-center gap-1"
                            >
                                <CheckIcon className="w-5 h-5" />
                                Submit
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {
                            fields.map((field, index) => (
                                <Card key={field.id}>
                                    <CardHeader>
                                        <CardTitle>New Task {index + 1}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-row gap-2 flex-wrap">
                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Task name</FormLabel>
                                                    <Input placeholder="Task name" {...field} />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.deadline`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Deadline</FormLabel>
                                                    <Input
                                                        type="datetime-local"
                                                        value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
                                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.status`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={TaskInfoStatus.Draft}>Draft</SelectItem>
                                                            <SelectItem value={TaskInfoStatus.Pending}>Pending</SelectItem>
                                                            <SelectItem value={TaskInfoStatus.Running}>Running</SelectItem>
                                                            <SelectItem value={TaskInfoStatus.Done}>Done</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Belong to which note */}
                                        <FormItem>
                                            <FormLabel>Note {'(Optional)'}</FormLabel>
                                            <Select defaultValue={selectedNote?.id} onValueChange={handleSelectNote}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select note" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {notes.map((note) => (
                                                        <SelectItem
                                                            value={note.id}
                                                            key={note.id}
                                                        >
                                                            {note.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>

                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.parentContentBlockid`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Content Block {'(Optional)'}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select parent content block" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {contentBlocks.map((contentBlock) => (
                                                                <SelectItem value={contentBlock.id} key={contentBlock.id}>{contentBlock.title}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />


                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.groupId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Group {'(Optional)'}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select group" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {groups.map((group) => (
                                                                <SelectItem value={group.id} key={group.id}>{group.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem className="w-full" >
                                                    <FormLabel>Description</FormLabel>
                                                    <Textarea className="max-h-[200px] w-full" placeholder="Task Description" {...field} />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}