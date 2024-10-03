'use client';

import { Account } from "@prisma/client";
import { DialogModes } from "./types";
import { z } from "zod";

interface AccountTransactionFormProp {
    mode: DialogModes;
    allAccounts: Account[],
    setMode: (mode: DialogModes) => void
}

const formSchema = z.object({
    from: z.string(),
    to: z.string(),
    value: z.number(),
    remark: z.string().optional(),
        
})

const AccountTransactionForm = (
    {
        mode,
        allAccounts,
        setMode
    }: AccountTransactionFormProp
) => {
    return (
        <></>
    )
}

export default AccountTransactionForm;