import { Account, CashFlow, CashFlowCategory, CashFlowMtoMCategory, Category, ContentBlock, Note, TaskInfo } from "@prisma/client";

export type DialogModes = 'Create' | 'Edit' | 'Close';

export type DetailedTaskInfo = TaskInfo & {
    parentContentBlock: (ContentBlock & {
        parentNote: Note | null,
    }) | null
}
export type OverduedTasksInfo = DetailedTaskInfo

export type PromiseUrgentTasks = Promise<DetailedTaskInfo[]>
export type PromiseOverduedTasksInfos = Promise<OverduedTasksInfo[]>


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

export type PromiseDetailedNotes = Promise<DetailedNote[]>

export type DetailedCashFlowRecord = CashFlow & {
    CashFlowMtoMCategory: (CashFlowMtoMCategory & {
        cashFlowCategory: CashFlowCategory
    })[] | null
}

export type PromiseDetailedCashFlowRecords = Promise<DetailedCashFlowRecord[]>

export type DetailedAccountRecord = Account & {
    CashFlow: DetailedCashFlowRecord[]
}

export type PromiseDetailedAccountRecords = Promise<DetailedAccountRecord[]>