'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { DetailedNote, Modes } from "./types";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
// import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { NoteStatus } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError, ToastLoading } from "./toast-object";
import { Save, X } from "lucide-react";
import { motion } from "framer-motion";


function extractLevelOneKeys<T extends object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof T>;
}

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    // status: z.enum(['Draft', 'Pending', 'Running', 'Done']).optional(),

    description: z.string().optional(),

    categoryId: z.string().optional(), // need passed from parent
    parentNoteId: z.string().optional(),

    groupId: z.string().optional(),

    stared: z.boolean(),
    hidden: z.boolean(),
})

interface NoteFormProps {
    existingNote?: DetailedNote;
    mode: Modes;
    groupId?: string;
    onCancel?: () => void;
}

const NoteForm = ({ 
    existingNote, 
    mode, 
    groupId,
    onCancel 
}: NoteFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: existingNote?.id,
            title: existingNote?.title,
            // status: existingNote?.status || undefined,

            description: existingNote?.description || '',
            
            categoryId: existingNote?.categoryId || undefined,
            parentNoteId: existingNote?.parentNoteId || undefined,
            
            groupId: groupId,

            stared: existingNote?.stared || false,
            hidden: existingNote?.hidden || false,
        }
    });
    const router = useRouter();
    const { isSubmitting, isValid } = form.formState;
    const [categoryForCreate, setCategoryForCreate] = useState<string>();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (mode == 'Create') {
                const data = {
                    basic: values,
                    extra: {
                        category: categoryForCreate?.toUpperCase(),
                    }
                }
    
                axios.post('/api/note', data).then(value => {
                    if (value.status == 200) {
                        console.log(value);
                        toast(ToastDone);
                        router.refresh();
                        router.push('/home/notes');
                    }
                }).catch(error => {
                    console.log(error);
                    toast(ToastError);
                });
            }
            
            if (mode == 'Edit') {
                const data = {
                    basic: values,
                    extra: {
                        category: categoryForCreate?.toUpperCase(),
                    }
                }
    
                axios.patch('/api/note', data).then(value => {
                    if (value.status == 200) {
                        console.log(value);
                        toast(ToastDone);
                        router.refresh();
                        router.push('/home/notes');
                    }
                }).catch(error => {
                    console.log(error);
                    toast(ToastError);
                }); 
            }
            toast(ToastLoading);
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            router.back();
        }
    };

    return (
        <Form {...form}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <motion.div 
                        className="flex flex-row gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FormField
                            name='title'
                            control={form.control}
                            disabled={isSubmitting}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Title</FormLabel>
                                    <Input {...field} />
                                </FormItem>
                            )}
                        />

                        <motion.div 
                            className="w-full"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {mode === 'Create' && (
                                <FormItem className="w-full">
                                    <FormLabel>Category</FormLabel>
                                    <Input
                                        defaultValue={existingNote?.category?.name}
                                        onChange={(event) => {
                                            setCategoryForCreate(event.target.value.toUpperCase());
                                        }}
                                    />
                                </FormItem>
                            )}
                            {mode === 'Edit' && (
                                <FormItem className="w-full">
                                    <FormLabel>Category</FormLabel>
                                    <Input
                                        defaultValue={existingNote?.category?.name}
                                        onChange={(event) => {
                                            setCategoryForCreate(event.target.value);
                                        }}
                                    />
                                </FormItem>
                            )}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <FormField
                            name={'description'}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea {...field} />
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <FormField
                            name='status'
                            control={form.control}
                            disabled={isSubmitting}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Combobox
                                        options={(extractLevelOneKeys(NoteStatus) as [string, ...string[]]).map(status => ({
                                            value: status,
                                            label: status.toLocaleUpperCase(),
                                        }))}
                                        {...field}
                                    />
                                </FormItem>
                            )}
                        />
                    </motion.div> */}

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <FormField
                            name='stared'
                            control={form.control}
                            disabled={isSubmitting}
                            render={({ field }) => (
                                <FormItem className="flex flex-row justify-between items-center">
                                    <FormLabel>Star</FormLabel>
                                    <Switch
                                        checked={form.watch('stared')}
                                        onCheckedChange={(event) => {
                                            console.log(event);
                                            form.setValue('stared', event)
                                        }}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name='hidden'
                            control={form.control}
                            disabled={isSubmitting}
                            render={({ field }) => (
                                <FormItem className="flex flex-row justify-between items-center">
                                    <FormLabel>Hidden</FormLabel>
                                    <Switch
                                        checked={form.watch('hidden')}
                                        onCheckedChange={(event) => {
                                            console.log(event);
                                            form.setValue('hidden', event)
                                        }}
                                    />
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div 
                        className="flex flex-row gap-2 justify-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Button
                            className="bg-white border-2 border-gray-900 text-red-600 hover:bg-slate-100 basis-1/2"
                            type="button"
                            onClick={handleCancel}
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
                    </motion.div>
                </form>
            </motion.div>
        </Form>
    );
};

export default NoteForm;