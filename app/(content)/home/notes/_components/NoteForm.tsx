'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { DetailedNote } from "./types";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    status: z.enum(['Draft', 'Pending', 'Running', 'Done']),

    categoryId: z.string().optional(), // need passed from parent
    parentNoteId: z.string().optional(),

    stared: z.boolean(),
    hidden: z.boolean(),
})

const NoteForm = ({existingNote, mode, setMode}: {
    existingNote?: DetailedNote,
    mode: 'Edit' | 'Create' | 'Close'
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>
}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: 'Draft',
            stared: false,
            hidden: false
        }
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Form {...form}>
            <form>

                <div className="flex flex-row gap-2 justify-end">
                    <Button type={'submit'}>Submit</Button>
                    <Button 
                    className="bg-white border-2 border-gray-900 text-red-600 hover:bg-slate-100"
                    type={'button'}
                    onClick={() => {
                        setMode('Close');
                    }}>Cancel</Button>
                </div>
            </form>
        </Form>
    )
}

export default NoteForm;