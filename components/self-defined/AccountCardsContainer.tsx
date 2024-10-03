'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import AccountCard from "./AccountCard";
import { DetailedAccountRecord, DialogModes } from "./types";
import { useState } from "react";
import { AccountTransactionDialog } from "./AccountTransactionDialog";

interface AccountCardsContainerProp {
    records: DetailedAccountRecord[]
}

const AccountCardsContainer = (
    {
        records
    }: AccountCardsContainerProp
) => {
    const [mode, setMode] = useState<DialogModes>('Close');

    return (
        <>
            <AccountTransactionDialog 
            allAccounts={records}
            mode={mode} 
            setMode={setMode}
            />
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">Accounts</h1>
                {/* A button for create transaction */}
                <Button
                    type="button"
                    className="flex flex-row items-center gap-2 w-fit"
                    onClick={() => setMode('Create')}
                >
                    <Plus />
                    Transaction
                </Button>
            </div>

            {
                records.map(record => (
                    <AccountCard key={record.id} record={record} />
                ))
            }
        </>
    )
}

export default AccountCardsContainer;