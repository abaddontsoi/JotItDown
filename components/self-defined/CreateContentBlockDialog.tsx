'use client';

import { Dispatch, SetStateAction } from "react";
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";

const CreateContentBlockDialog = ({ mode, setMode }: {
    mode: 'Edit' | 'Create' | 'Close'
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>
}) => {
    return (
        <>
            <Dialog open={
                mode != 'Close'
            }
                onOpenChange={
                    () => {
                        setMode('Close')
                    }
                }
            >
                <DialogContent>
                    <DialogTitle>{mode} Content Block</DialogTitle>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateContentBlockDialog;