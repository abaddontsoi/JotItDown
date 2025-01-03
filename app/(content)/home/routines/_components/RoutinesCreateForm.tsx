'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { optional, z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Minus, Plus, Save, X } from "lucide-react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { ToastDone, ToastError } from "@/components/self-defined/toast-object";

const formSchema = z.object({
    routines: z.array(
        z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string(),
            startDate: z.date().or(z.string()),
            endDate: z.date().or(z.string()).optional(),
            targetCount: z.number().optional(),
            intervalInDays: z.number().min(1, "Interval must be at least 1").default(1),
        }))
        .min(1, "At least one routine is required")
        .max(5, "At most 5 routines are allowed"),
});

export default function RoutineCreateForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            routines: [{
                title: "",
                description: "",
                targetCount: 1,
                startDate: new Date(),
                intervalInDays: 1,
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "routines",
        rules: {
            minLength: 1,
            maxLength: 5,
        }
    });

    const handleRemove = () => {
        if (fields.length > 1) {
            // Remove the last routine
            remove(fields.length - 1);
        }
    }

    const handleAppend = () => {
        if (fields.length < 5) {
            append({
                title: "",
                description: "",
                targetCount: 1,
                startDate: new Date(),
                intervalInDays: 1,
            });
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/routine', values);
            if (response.status === 200) {
                toast(ToastDone);
                router.push('/home/routines');
                router.refresh();
            }
        } catch (error) {
            toast(ToastError);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleRemove()}>
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" onClick={() => handleAppend()}>
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button type="button" variant="cancel" className="flex items-center gap-2">
                            <X className="w-4 h-4" /> Cancel
                        </Button>
                        <Button type="submit" className="flex items-center gap-2">
                            <Save className="w-4 h-4" /> Submit
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="p-4">
                            <CardHeader>
                                <CardTitle>
                                    New Routine {index + 1}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name={`routines.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name={`routines.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea className="max-h-[200px]" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex gap-2 w-full">
                                        {/* Start Date */}
                                        <FormField
                                            control={form.control}
                                            name={`routines.${index}.startDate`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Start Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
                                                            onChange={(e) => field.onChange(new Date(e.target.value))}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        {/* End Date */}
                                        <FormField
                                            control={form.control}
                                            name={`routines.${index}.endDate`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>End Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                                                            onChange={(e) => field.onChange(new Date(e.target.value))}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex gap-2 w-full">
                                        {/* Interval */}
                                        <FormField
                                            control={form.control}
                                            name={`routines.${index}.intervalInDays`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Interval in Days</FormLabel>
                                                    <FormControl>
                                                        <div className="flex gap-2 h-9">
                                                            <Button 
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => field.onChange(Math.max(1, Number(field.value) - 1))}
                                                                className="h-full"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </Button>
                                                            <Input 
                                                                type="number" 
                                                                value={field.value}
                                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                                className="text-center h-full"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => field.onChange(Number(field.value) + 1)}
                                                                className="h-full"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Target Count */}
                                        <FormField
                                            control={form.control}
                                            name={`routines.${index}.targetCount`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Target Count</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
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
                </div> */}
            </form>
        </Form>
    );
} 