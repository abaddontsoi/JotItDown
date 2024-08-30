import { Category, ContentBlock, Note, TaskInfo } from "@prisma/client";

export type UrgentTasks = TaskInfo & {
    parentContentBlock: ContentBlock & {
        parentNote: Note,
    }
}

export type UrgentCard = {
    title: string | null,
    description: string,
    deadline: Date,
    parentNote: Note
}

export type DetailedNote = Note & {
    category?: Category,
    parentNote?: DetailedNote,
    contentBlocks?: (ContentBlock & {
        TaskInfo?: TaskInfo[]
    })[]
    childrenNotes?: DetailedNote[]
}