'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import AccountCard from "./AccountCard";
import { DetailedAccountRecord, DialogModes } from "./types";
import { useState } from "react";
import { AccountTransactionDialog } from "./AccountTransactionDialog";
import AccountDialog from "./AccountDialog";
import { ItemAccount } from "@prisma/client";

interface AccountCardsContainerProp {
    records: DetailedAccountRecord[]
}

const AccountCardsContainer = (
    {
        records
    }: AccountCardsContainerProp
) => {
    const [mode, setMode] = useState<DialogModes>('Close');
    const [accountMode, setAccountMode] = useState<DialogModes>('Close');
    const [account, setAccount] = useState<DetailedAccountRecord>();
    return (
        <>
            <AccountTransactionDialog
                allAccounts={records}
                mode={mode}
                setMode={setMode}
            />

            {/* Create Account Dialog */}
            <AccountDialog
                account={account}
                mode={accountMode}
                setMode={setAccountMode}
            />

            <div className="flex flex-row items-center justify-between">
                <h1 className="text-2xl">Accounts</h1>

                <div className="flex flex-row items-center justify-between gap-2">
                    {/* A button for create transaction */}
                    <Button
                        type="button"
                        className="flex flex-row items-center gap-2 w-fit"
                        onClick={() => setMode('Create')}
                    >
                        <Plus />
                        Transaction
                    </Button>
                    <Button
                        type="button"
                        className="flex flex-row items-center gap-2 w-fit"
                        onClick={() => setAccountMode('Create')}
                    >
                        <Plus />
                        Account
                    </Button>
                </div>
            </div>

            {
                records.map(record => (
                    <AccountCard
                        key={record.id}
                        record={record}
                        setAccount={setAccount}
                        setMode={setAccountMode}
                    />
                ))
            }
        </>
    )
}

export default AccountCardsContainer;