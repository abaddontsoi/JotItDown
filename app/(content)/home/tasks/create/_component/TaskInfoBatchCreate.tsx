import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskInfoStatus } from "@prisma/client";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod"

const formSchema =
    z.object({
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

export default function TaskInfoBatchCreate() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tasks: [{
                title: "",
                description: "",
                deadline: new Date(),
                status: TaskInfoStatus.Draft,
                parentContentBlockid: "",
                groupId: "",
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "tasks",
    });

    const onSubmit = async (data: FormSchema) => {
        console.log(data);
    }

    return (
        <div>
            <Form {...form}>
                <div className="flex gap-2 mb-4 w-full justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        onClick={() => fields.length > 1 && remove(fields.length - 1)}
                    >
                        Remove Last Task
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={() => append({
                            title: "",
                            description: "",
                            deadline: new Date(),
                            status: TaskInfoStatus.Draft,
                            parentContentBlockid: "",
                            groupId: "",
                        })}
                    >
                        Add Task
                    </button>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        {
                            fields.map((field, index) => (
                                <Card key={field.id}>
                                    <CardHeader>
                                        <CardTitle>Task {index + 1}</CardTitle>
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
                                            name={`tasks.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <Input placeholder="Description" {...field} />
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
                                                        value={field.value.toString()}
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
                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.parentContentBlockid`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Parent Content Block</FormLabel>
                                                    <Input placeholder="Parent Content Block ID" {...field} />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.groupId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Group</FormLabel>
                                                    <Input placeholder="Group ID" {...field} />
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