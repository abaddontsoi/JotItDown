'use client';

import { DetailedRoutine } from "@/components/self-defined/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { Minus, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ToastDone, ToastError } from "@/components/self-defined/toast-object";
import axios from "axios";
import { useRoutineContext } from "@/app/contexts/routines/routine/RoutineContext";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    startDate: z.date().or(z.string()),
    endDate: z.date().or(z.string()).optional(),
    targetCount: z.number().optional(),
    intervalInDays: z.number().min(1, "Interval must be at least 1").default(1),
});

export default function RoutineEditFormSingle() {
    const router = useRouter();
    const { routine, setIsEditing } = useRoutineContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: routine?.title || "",
            description: routine?.description || "",
            startDate: routine?.startDate || new Date(),
            endDate: routine?.endDate || undefined,  
            targetCount: routine?.targetCount || undefined,
            intervalInDays: routine?.intervalInDays || 1,
        },
    });
    if (!routine) return null;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/routine/${routine.id}`, values);

            if (response.status === 200) {
                toast(ToastDone);
                setIsEditing(false);
                router.refresh();
            }
        } catch (error) {
            toast(ToastError);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter routine description"
                                    className="resize-none"
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
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
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
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date (Optional)</FormLabel>
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
                        name="intervalInDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Interval (Days)</FormLabel>
                                <FormControl>
                                    <div className="flex items-stretch gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-9"
                                            onClick={() => field.onChange(Math.max(1, field.value - 1))}
                                        >
                                            <Minus className="h-4 w-4" />
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
                                            <Plus className="h-4 w-4" />
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
                        name="targetCount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Count (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        placeholder="Enter target count"
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-4">
                    <Button type="submit" className="w-full">
                        <span className="flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}