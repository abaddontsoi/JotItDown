'use client';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Save, X } from "lucide-react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    isDaily: z.boolean().default(true),
    isWeekly: z.boolean().default(false),
    isMonthly: z.boolean().default(false),
    targetCount: z.number().min(1, "Target count must be at least 1").default(1),
});

export default function RoutineCreateForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            isDaily: true,
            isWeekly: false,
            isMonthly: false,
            targetCount: 1,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('/api/routine', values);
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "Routine created successfully",
                });
                router.push('/home/routines');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create routine",
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6">
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
                                        {...field} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Target Count */}
                    <FormField
                        control={form.control}
                        name="targetCount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Count</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        min={1}
                                        onChange={e => field.onChange(parseInt(e.target.value))}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Frequency Switches */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="isDaily"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <FormLabel>Daily Routine</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isWeekly"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <FormLabel>Weekly Routine</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isMonthly"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                    <FormLabel>Monthly Routine</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
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
                </div>
            </form>
        </Form>
    );
} 