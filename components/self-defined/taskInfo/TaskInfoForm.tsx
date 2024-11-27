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
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import DatePicker from "@/components/ui/date-picker";

const formSchema = z.object({
    id: z.string().optional(),
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
    mode: Modes,
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
            id: existingTaskInfo?.id,
            parentContentBlockid: existingTaskInfo?.parentContentBlockid || parentContentBlockid, 
            groupId: groupId,

            title: existingTaskInfo?.title || undefined,
            description: existingTaskInfo?.description,
            deadline: existingTaskInfo?.deadline,
            status: existingTaskInfo?.status,
        }
    });

    const statuses: string[] = Object.values(TaskInfoStatus);
    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (mode == 'Create') {
                axios.post('/api/task', values).then(response => {
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
            if (mode == 'Edit') {
                axios.patch('/api/task', values).then(response => {
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
                                        form.setValue('deadline', new Date(event.target.value));
                                    }}
                                    defaultValue={format(existingTaskInfo?.deadline || new Date(), "yyyy-MM-dd'T'HH:mm")}
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

                <div className="flex flex-row gap-2 justify-end mt-[10px]">
                    <Button
                        className="bg-white border-2 border-gray-900 text-red-600 hover:bg-slate-100 basis-1/2"
                        type={'button'}
                        onClick={() => {
                            setMode('Close');
                        }}>Cancel</Button>
                    <Button
                        className="basis-1/2"
                        type="submit"
                        >Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default TaskInfoForm;