import { Category, ContentBlock, Note, TaskInfo } from "@prisma/client";

export type UrgentTasks = TaskInfo & {
    parentContentBlock: ContentBlock & {
        parentNote: Note | null,
    }
}

export type UrgentCard = {
    title: string | null,
    description: string,
    deadline: Date,
    parentNote: Note | null
}

export type DetailedContentBlock = (ContentBlock & {
    taskInfo: TaskInfo[]
})
export type DetailedNote = Note & {
    category: Category | null,
    parentNote?: DetailedNote | null,
    contentBlocks?: DetailedContentBlock[]
    childrenNotes?: DetailedNote[]
}

export type DetailedCategory = Category & {
    parentCategory?: DetailedCategory
    // category: DetailedCategory[] | null
}