'use client';

import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { TaskInfo, TaskInfoStatus } from "@prisma/client";
import { Form, FormField, FormItem } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import DatePicker from "../ui/date-picker";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DetailedTaskInfo, Modes } from "./types";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { Save, X } from "lucide-react";

const formSchema = z.object({
    title: z.string().optional(),
    description: z.string(),
    deadline: z.date(),
    status: z.enum(Object.values(TaskInfoStatus) as [string, ...string[]]),
    parentContentBlockid: z.string().optional(),

    groupId: z.string().optional(),
})

interface TaskInfoFormProp {
    existingTaskInfo?: TaskInfo,
    parentContentBlockid?: string,
    mode: 'Edit' | 'Create' | 'Close',
    groupId?: string,
    setTargetTaskInfo: (task?: DetailedTaskInfo) => void,
    setMode: (mode: Modes) => void,
}

const TaskInfoForm = ({
    mode,
    existingTaskInfo,
    parentContentBlockid,
    groupId,
    setMode,
    setTargetTaskInfo
}: TaskInfoFormProp) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            parentContentBlockid: existingTaskInfo?.parentContentBlockid || parentContentBlockid, 
            groupId: groupId,
        }
    });

    const statuses: string[] = Object.values(TaskInfoStatus);
    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (mode == 'Create') {
                const response = axios.post('/api/task', values).then(response => {
                    if (response.status == 200) {
                        toast(ToastDone);
                        setTargetTaskInfo(undefined);
                        router.refresh();
                        setMode('Close');
                    } else {
                        toast(ToastError);
                    }
                }).catch(error => {
                    console.log(error);
                    toast(ToastError);
                })
            }
            toast(ToastLoading);
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name='title'
                    control={form.control}
                    render={(
                        { field }
                    ) => {
                        return (
                            <FormItem>
                                <Label>Title</Label>
                                <Input
                                    {...field}
                                />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    name='description'
                    control={form.control}
                    render={(
                        { field }
                    ) => {
                        return (
                            <FormItem>
                                <Label>Description</Label>
                                <Textarea
                                    {...field}
                                />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    name='deadline'
                    control={form.control}
                    render={(
                        { field }
                    ) => {
                        return (
                            <FormItem>
                                <Label>Deadline</Label>
                                <Input
                                    type="datetime-local"
                                    onChange={(event) => {
                                        
                                        // console.log(event.target.value);
                                        form.setValue('deadline', new Date(event.target.value));
                                    }}
                                // {...field}
                                />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    name='status'
                    control={form.control}
                    render={(
                        { field }
                    ) => {
                        return (
                            <FormItem>
                                <Label>Status</Label>
                                <Combobox
                                    options={statuses.map(status => ({
                                        value: status,
                                        label: status.toUpperCase(),
                                    }))}
                                    {...field}
                                />
                            </FormItem>
                        );
                    }}
                />

                {/* <FormField
                    name='title'
                    control={form.control}
                    render={(
                        { field }
                    ) => {
                        return (
                            <FormItem>
                            </FormItem>
                        );
                    }}
                /> */}

                <div className="flex flex-row gap-2 justify-end mt-[10px]">
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

export default TaskInfoForm;