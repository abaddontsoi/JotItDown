import { CashFlowType } from "@prisma/client";
import { z } from "zod";

export const CashFlowRecordFormSchmea = z.object({
    id: z.string().optional(),
    title: z.string(),
    value: z.number().or(z.string()),
    description: z.string().optional(),
    type: z.enum(Object.values(CashFlowType) as [string, ...string[]]),
    category: z.string(),
    isLongTermUsage: z.boolean().default(false),
})