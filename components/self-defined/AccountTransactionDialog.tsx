import { Account, ItemAccount } from "@prisma/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import AccountTransactionForm from "./AccountTransactionForm";
import { DetailedTransaction, DialogModes } from "./types";

interface AccountTransactionDialogProps {
    mode: DialogModes;
    allAccounts: ItemAccount[]
    transaction?: DetailedTransaction;
    setMode: (mode: DialogModes) => void
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