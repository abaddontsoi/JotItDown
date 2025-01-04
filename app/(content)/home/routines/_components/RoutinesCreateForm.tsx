'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Minus, Plus, Save, X } from "lucide-react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Update the helper component for inline alignment
function RequiredLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-baseline">
            <span>{children}</span>
            <span className="text-destructive ml-1 leading-none">*</span>
        </div>
    );
}

export default function RoutineCreateForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            routines: [{
                title: "",
                description: "",
                targetCount: undefined,
                startDate: new Date(),
                intervalInDays: 1,
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "routines",
    });

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
                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fields.length > 1 && remove(fields.length - 1)}
                            disabled={fields.length <= 1}
                            className="transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fields.length < 5 && append({
                                title: "",
                                description: "",
                                targetCount: undefined,
                                startDate: new Date(),
                                intervalInDays: 1,
                            })}
                            disabled={fields.length >= 5}
                            className="transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            {fields.length} {fields.length === 1 ? 'routine' : 'routines'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/home/routines')}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" /> Cancel
                        </Button>
                        <Button type="submit" className="flex items-center gap-2">
                            <Save className="w-4 h-4" /> Create
                        </Button>
                    </div>
                </div>

                {/* Routine Forms */}
                <div className="grid gap-6">
                    {fields.map((field, index) => (
                        <Card key={field.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    Routine {index + 1}
                                    {fields.length > 1 && (
                                        <span className="text-sm text-muted-foreground font-normal">
                                            of {fields.length}
                                        </span>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Title */}
                                <FormField
                                    control={form.control}
                                    name={`routines.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <RequiredLabel>Title</RequiredLabel>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter routine title" {...field} />
                                            </FormControl>
                                            <FormMessage />
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
                                                <Textarea 
                                                    placeholder="Enter routine description"
                                                    className="resize-none h-20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Start Date */}
                                    <FormField
                                        control={form.control}
                                        name={`routines.${index}.startDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <RequiredLabel>Start Date</RequiredLabel>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="datetime-local"
                                                        value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
                                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* End Date */}
                                    <FormField
                                        control={form.control}
                                        name={`routines.${index}.endDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="datetime-local"
                                                        value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                                                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Interval */}
                                    <FormField
                                        control={form.control}
                                        name={`routines.${index}.intervalInDays`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <RequiredLabel>Interval (Days)</RequiredLabel>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="h-9"
                                                            onClick={() => field.onChange(Math.max(1, field.value - 1))}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            className="text-center h-9"
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="h-9"
                                                            onClick={() => field.onChange(field.value + 1)}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Target Count */}
                                    <FormField
                                        control={form.control}
                                        name={`routines.${index}.targetCount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Target Count</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        placeholder="Enter target count"
                                                        onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                        value={field.value || ''}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </form>
        </Form>
    );
} 