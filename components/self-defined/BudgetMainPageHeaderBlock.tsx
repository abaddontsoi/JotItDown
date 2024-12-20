'use client';

import { $Enums, CashFlowType } from "@prisma/client";
import { SetStateAction, useState } from "react";
import BudgetMainPageHeader from "./BudgetMainPageHeader";
import { DetailedCashFlowRecord, Modes } from "./types";
import CashFlowRecordDialog from "./CashFlowRecordDialog";

interface BudgetMainPageProp {
    allDetailedCashFlow: DetailedCashFlowRecord[]
}

const BudgetMainPageHeaderBlock = (
    {
        allDetailedCashFlow
    }: BudgetMainPageProp
) => {

    const [mode, setMode] = useState<Modes>('Close');
    const [recordType, setRecordType] = useState<CashFlowType>(CashFlowType.Debit);
    const [cashFlowRecord, setExistingCashFlowRecord] = useState<DetailedCashFlowRecord | undefined>();

    return (
        <>
            <CashFlowRecordDialog 
            existingRecord={cashFlowRecord}
            mode={mode} 
            recordType={recordType} 
            setMode={setMode} 
            setRecordType={setRecordType} 
            setExistingRecord={setExistingCashFlowRecord} 
            />
            <BudgetMainPageHeader
                setRecordType={setRecordType}
                setMode={setMode}
            />
        </>
    )
}

export default BudgetMainPageHeaderBlock;