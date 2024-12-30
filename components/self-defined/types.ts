import { ItemAccount, CashFlow, CashFlowCategory, CashFlowMtoMCategory, Category, ContentBlock, Group, GroupUser, Invitation, Note, TaskInfo, Transaction, User, Routine, RoutineCheckRecord } from "@prisma/client";

export type Modes = 'Create' | 'Edit' | 'Close';

export type DetailedTaskInfo = TaskInfo & {
    parentContentBlock: (ContentBlock & {
        parentNote: Note | null;
    }) | null;
    belongTo?: User | null;
    group?: Group | null;
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

export type DetailedAccountRecord = ItemAccount & {
    CashFlow: DetailedCashFlowRecord[]
}

export type PromiseDetailedAccountRecords = Promise<DetailedAccountRecord[]>

export type DetailedGroup = Group & {
    GroupUser: (GroupUser & {
        user: User
    })[],
    updatedBy: User | null,
    TaskInfo?: DetailedTaskInfo[],
}

export type PromiseDetailedGroup = Promise<DetailedGroup[]>

export type DetailedInvitation = (Invitation & {
    to: User,
    from: User,
    group: Group | null,
}
)

export type PromiseDetailedInvitation = Promise<DetailedInvitation[]>

export type DetailedTransaction = Transaction & {
    from: CashFlow & {
        account: ItemAccount | null,
    },
    to: CashFlow & {
        account: ItemAccount | null,
    },
}

export type PromiseDetailedTransaction = Promise<DetailedTransaction[]>

// Routines
export type DetailedRoutineCheckRecord = RoutineCheckRecord & {
    routine?: Routine;
    checkBy: User;
}
export type DetailedRoutine = Routine & {
    RoutineCheckRecord: DetailedRoutineCheckRecord[];
}
export type PromiseDetailedRoutine = Promise<DetailedRoutine[]>
export type PromiseLatest5RoutineRecords = Promise<DetailedRoutineCheckRecord[]>