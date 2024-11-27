'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import AccountCard from "./AccountCard";
import { DetailedAccountRecord, Modes } from "./types";
import { useState } from "react";
import { AccountTransactionDialog } from "./AccountTransactionDialog";
import AccountDialog from "./AccountDialog";

interface AccountCardsContainerProp {
    records: DetailedAccountRecord[]
}

const AccountCardsContainer = (
    {
        records
    }: AccountCardsContainerProp
) => {
    const [mode, setMode] = useState<Modes>('Close');
    const [accountMode, setAccountMode] = useState<Modes>('Close');
    const [account, setAccount] = useState<DetailedAccountRecord>();
    return (
        <div>
            {/* Transaction dialog */}
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

            <div className="flex flex-row items-center justify-between w-full px-4 bg-slate-100 py-2">
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
                        variant={'outline'}
                    >
                        <Plus />
                        Account
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2 px-4">
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
            </div>
        </div>
    )
}

export default AccountCardsContainer;