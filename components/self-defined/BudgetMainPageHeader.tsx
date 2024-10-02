'use client';

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { DetailedCashFlowRecord, DialogModes } from "./types";
import { CashFlowType } from "@prisma/client";
import CashFlowRecordDialog from "./CashFlowRecordDialog";

interface BudgetMainPageHeaderProp {
    setRecordType: Dispatch<SetStateAction<CashFlowType>>
    setMode: Dispatch<SetStateAction<DialogModes>>
}

const BudgetMainPageHeader = ({
    setMode,
    setRecordType,
}: BudgetMainPageHeaderProp) => {
    return (
        <>
            <div className="flex flex-row text-5xl items-end justify-between">
                Budget
                <div className="flex flex-row gap-2">
                    <Button className="" onClick={() => {
                        setRecordType(CashFlowType.Debit);
                        setMode('Create');
                    }}>
                        <Plus></Plus>
                        Debit
                    </Button>
                    <Button className="" onClick={() => {
                        setRecordType(CashFlowType.Credit);
                        setMode('Create');
                    }}>
                        <Plus></Plus>
                        Credit
                    </Button>
                </div>
            </div>
        </>
    )
}

export default BudgetMainPageHeader;