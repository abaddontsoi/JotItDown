'use client';

import { z } from "zod";
import { Modes } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastError } from "./toast-object";
import { Group, Note } from "@prisma/client";
import { Combobox } from "../ui/combobox";
import { Button } from "../ui/button";
import axios from "axios";
import { Save, X } from "lucide-react";

interface NoteShareFormProp {
    note: Note;
    groups: Group[];
    setMode: (mode: Modes) => void;
}

const formSchema = z.object({
    id: z.string(),
    groupId: z.string().optional(),
})

export default function NoteShareForm(
    {
        note,
        groups,
        setMode,
    }: NoteShareFormProp
) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: note.id,
            groupId: note.groupId || undefined,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = {
                id: values.id,
                groupId: values.groupId && values.groupId.length > 0 ? values.groupId : null, 
            }
            axios.patch('/api/note/share_group', data).then(response => {
                if (response.status == 200) {
                    toast(ToastDone);
                    setMode('Close');
                }
            }).catch(error => {
                console.log(error);
                toast(ToastError);
            })
        } catch (error) {
            console.log(error);
            toast(ToastError);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        name="groupId"
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Select a group to share</FormLabel>
                                    <Combobox
                                        options={groups.map(g => ({
                                            value: g.id,
                                            label: g.name,
                                        }))}
                                        {...field}
                                    />
                                </FormItem>
                            )
                        }}
                    />

                    <div className="w-full flex items-center gap-2">
                        <Button
                            onClick={() => setMode('Close')}
                            className="basis-1/2"
                            variant={'cancel'}
                        >
                            <div className="flex items-center gap-2">
                                Cancel
                                <X className="w-4 h-4" />
                            </div>
                        </Button>
                        <Button
                            type="submit"
                            className="basis-1/2"
                        >
                            <div className="flex items-center gap-2">
                                Save
                                <Save className="w-4 h-4" />
                            </div>
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}