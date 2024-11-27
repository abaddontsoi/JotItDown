import { Account, ItemAccount } from "@prisma/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import AccountTransactionForm from "./AccountTransactionForm";
import { DetailedTransaction, Modes } from "./types";

interface AccountTransactionDialogProps {
    mode: Modes;
    allAccounts: ItemAccount[]
    transaction?: DetailedTransaction;
    setMode: (mode: Modes) => void
}

export function AccountTransactionDialog(
    {
        mode,
        allAccounts,
        transaction,
        setMode,
    }: AccountTransactionDialogProps
) {
    return (
        <Dialog
            open={mode != 'Close'}
            onOpenChange={() => setMode('Close')}
        >
            <DialogContent className="">
                <DialogTitle>Account Transaction</DialogTitle>
                <DialogDescription>
                    Enter the details of your transaction below.
                </DialogDescription>

                {/* Transaction Form */}
                <AccountTransactionForm
                    allAccounts={allAccounts}
                    transaction={transaction}
                    mode={mode}
                    setMode={setMode}
                />
            </DialogContent>
        </Dialog>
    );
}