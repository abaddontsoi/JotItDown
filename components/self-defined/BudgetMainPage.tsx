'use client';

import { $Enums, CashFlowType } from "@prisma/client";
import { SetStateAction, useState } from "react";
import BudgetMainPageHeader from "./BudgetMainPageHeader";
import { DetailedCashFlowRecord, DialogModes } from "./types";
import CashFlowRecordDialog from "./CashFlowRecordDialog";

interface BudgetMainPageProp {
    allDetailedCashFlow: DetailedCashFlowRecord[]
}

const BudgetMainPage = (
    {
        allDetailedCashFlow
    }: BudgetMainPageProp
) => {

    const [mode, setMode] = useState<DialogModes>('Close');
    const [recordType, setRecordType] = useState<CashFlowType>('Income');
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

export default BudgetMainPage;