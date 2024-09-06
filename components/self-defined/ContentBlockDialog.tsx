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
import { DetailedContentBlock } from "./types";
import ContentBlockForm from "./ContentBlockForm";

const ContentBlockDialog = ({ mode, existingContentBlock, defaultParentNodeId, setMode, setContentBlock }: {
    mode: 'Edit' | 'Create' | 'Close'
    existingContentBlock?: DetailedContentBlock,
    defaultParentNodeId?: string
    setMode: Dispatch<SetStateAction<"Edit" | "Create" | "Close">>
    setContentBlock: Dispatch<SetStateAction<DetailedContentBlock | undefined>>
}) => {
    return (
        <Dialog
            open={
                mode != 'Close'
            }
            onOpenChange={
                () => {
                    setContentBlock(undefined);
                    setMode('Close');
                }
            }
        >
            <DialogContent className="w-[90%]">
                <DialogTitle className="text-xl">{mode} Content Block</DialogTitle>
                <ContentBlockForm
                    mode={mode}
                    existingContentBlock={existingContentBlock}
                    defaultParentNodeId={defaultParentNodeId}
                    setMode={setMode}
                    setContentBlock={setContentBlock}
                />
            </DialogContent>
        </Dialog>
    )
}

export default ContentBlockDialog;