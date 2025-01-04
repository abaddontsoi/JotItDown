'use client';

import { TaskInfo, TaskInfoStatus } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DetailedTaskInfo, Modes } from "../types";
import { toast } from "@/components/ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "../toast-object";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CheckIcon, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DetailedNote } from "@/components/self-defined/types";
import { useState } from "react";
import { ContentBlock, Group } from "@prisma/client";

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string(),
    deadline: z.date().or(z.string()),
    status: z.enum(Object.values(TaskInfoStatus) as [string, ...string[]]),
    parentContentBlockid: z.string().optional(),
    groupId: z.string().optional(),
})

interface TaskInfoFormProp {
    existingTaskInfo?: TaskInfo,
    parentContentBlockid?: string,
    mode: Modes,
    groupId?: string,
    setTargetTaskInfo: (task?: DetailedTaskInfo) => void,
    setMode: (mode: Modes) => void,
    notes: DetailedNote[],
    groups: Group[],
}

const TaskInfoForm = ({
    mode,
    existingTaskInfo,
    parentContentBlockid,
    groupId,
    setMode,
    setTargetTaskInfo,
    notes,
    groups
}: TaskInfoFormProp) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: existingTaskInfo?.id,
            parentContentBlockid: existingTaskInfo?.parentContentBlockid || parentContentBlockid,
            groupId: existingTaskInfo?.groupId || groupId,
            title: existingTaskInfo?.title || "",
            description: existingTaskInfo?.description || "",
            deadline: existingTaskInfo?.deadline || new Date(),
            status: existingTaskInfo?.status || TaskInfoStatus.Draft,
        }
    });

    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            toast(ToastLoading);
            if (mode === 'Create') {
                const response = await axios.post('/api/task', values);
                if (response.status === 200) {
                    toast(ToastDone);
                    setTargetTaskInfo(undefined);
                    router.refresh();
                    setMode('Close');
                } else {
                    toast(ToastError);
                }
            } else if (mode === 'Edit') {
                const response = await axios.patch('/api/task', values);
                if (response.status === 200) {
                    toast(ToastDone);
                    setTargetTaskInfo(undefined);
                    router.refresh();
                    setMode('Close');
                } else {
                    toast(ToastError);
                }
            }
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    const [selectedNote, setSelectedNote] = useState<DetailedNote>();
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

    const handleSelectNote = (noteId: string) => {
        const note = notes.find((note) => note.id === noteId);
        setSelectedNote(note);
        setContentBlocks(note?.contentBlocks || []);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-2 justify-end mb-4">
                    <Button
                        type="button"
                        variant={'cancel'}
                        className="flex flex-row items-center gap-1"
                        onClick={() => setMode('Close')}
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
                        {mode === 'Create' ? 'Create' : 'Save'}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{mode === 'Create' ? 'New Task' : 'Edit Task'}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task name</FormLabel>
                                    <Input placeholder="Task name" {...field} />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="deadline"
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
                            name="status"
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

                        <FormItem>
                            <FormLabel>Note {'(Optional)'}</FormLabel>
                            <Select 
                                defaultValue={selectedNote?.id} 
                                onValueChange={handleSelectNote}
                            >
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
                            name="parentContentBlockid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content Block {'(Optional)'}</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select parent content block" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {contentBlocks.map((contentBlock) => (
                                                <SelectItem 
                                                    value={contentBlock.id} 
                                                    key={contentBlock.id}
                                                >
                                                    {contentBlock.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="groupId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group {'(Optional)'}</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {groups.map((group) => (
                                                <SelectItem 
                                                    value={group.id} 
                                                    key={group.id}
                                                >
                                                    {group.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea 
                                        className="max-h-[200px]" 
                                        placeholder="Task Description" 
                                        {...field} 
                                    />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}

export default TaskInfoForm;