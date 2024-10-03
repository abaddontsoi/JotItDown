import { Account } from "@prisma/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import AccountTransactionForm from "./AccountTransactionForm";
import { DialogModes } from "./types";

interface AccountTransactionDialogProps {
    mode: DialogModes;
    allAccounts: Account[]
    setMode: (mode: DialogModes) => void
}

export function AccountTransactionDialog(
    {
        mode,
        allAccounts,
        setMode,
    }: AccountTransactionDialogProps
) {
    return (
        <Dialog open={mode != 'Close'}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Account Transaction</DialogTitle>
                    <DialogDescription>
                        Enter the details of your transaction below.
                    </DialogDescription>
                </DialogHeader>

                {/* Transaction Form */}
                <AccountTransactionForm 
                allAccounts={allAccounts}
                mode={mode}
                setMode={setMode}
                />
            </DialogContent>
        </Dialog>
    );
}