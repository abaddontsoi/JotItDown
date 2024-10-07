'use client';

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import AccountForm from "./AccountForm";
import { DetailedAccountRecord, DialogModes } from "./types";

interface AccountDialogProp {
    mode: DialogModes;
    account?: DetailedAccountRecord;
    setMode: (mode: DialogModes) => void;
}

const AccountDialog = (
    {
        mode,
        account,
        setMode,
    }: AccountDialogProp
) => {
    return (
        <>
            <Dialog open={mode != 'Close'} onOpenChange={() => setMode('Close')}>
                <DialogContent>
                    <DialogTitle>{mode} account</DialogTitle>

                    <AccountForm mode={mode} setMode={setMode} account={account} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AccountDialog;