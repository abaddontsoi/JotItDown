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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().optional(),
    description: z.string(),
    deadline: z.date(),
    status: z.enum(Object.values(TaskInfoStatus) as [string, ...string[]]),
    parentContentBlockid: z.string(),
})

interface TaskInfoFormProp {
    existingTaskInfo?: TaskInfo,
    parentContentBlockid?: string,
    mode: 'Edit' | 'Create' | 'Close',
    setTargetTaskInfo: Dispatch<SetStateAction<TaskInfo | undefined>>,
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>,
}

function enumToArray<T extends object>(enumObject: T): (keyof T)[] {
    return Object.values(enumObject) as (keyof T)[]
}


const TaskInfoForm = ({
    mode,
    existingTaskInfo,
    parentContentBlockid,
    setMode,
    setTargetTaskInfo
}: TaskInfoFormProp) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            parentContentBlockid: existingTaskInfo?.parentContentBlockid || parentContentBlockid, 
        }
    });

    const statuses: string[] = Object.values(TaskInfoStatus);
    // console.log(statuses);

    // TaskInfoStatus
    // console.dir(TaskInfoStatus, { depth: null });

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = axios.post('/api/task', values).then(response => {
                if (response.status == 200) {
                    toast.success('Task Created');
                    router.refresh();
                }
            }).finally(() => {
                // toast.success('Task Created');
            });
            setTargetTaskInfo(undefined);
            setMode('Close');
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong');
        }
        toast.success('Task Created');
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