'use client';

import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { DetailedCashFlowRecord, DialogModes } from "./types";
import { CashFlowType } from "@prisma/client";
import CashFlowRecordForm from "./CashFlowRecordForm";

interface CashFlowRecordDialogProp {
    existingRecord?: DetailedCashFlowRecord;
    mode: DialogModes;
    recordType: CashFlowType;
    setMode: Dispatch<SetStateAction<DialogModes>>;
    setRecordType: Dispatch<SetStateAction<CashFlowType>>;
    setExistingRecord: Dispatch<SetStateAction<DetailedCashFlowRecord | undefined>>;
}

const CashFlowRecordDialog = (
    {
        existingRecord,
        mode,
        recordType,
        setMode,
        setRecordType,
        setExistingRecord
    }: CashFlowRecordDialogProp
) => {
    return (
        <>
            <Dialog open={mode != 'Close'} onOpenChange={() => {
                setMode('Close');
            }}>
                <DialogContent>
                    <DialogTitle>
                        {mode} {recordType} Record
                    </DialogTitle>

                    <CashFlowRecordForm
                        mode={mode}
                        existingDetailedCashFlowRecord={existingRecord}
                        type={recordType}
                        setType={setRecordType}
                        setMode={setMode}
                        setDetailedCashFlowRecord={setExistingRecord} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CashFlowRecordDialog;