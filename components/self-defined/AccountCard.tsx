'use client';

import { CashFlowType } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DetailedAccountRecord, DetailedCashFlowRecord, Modes } from "./types";
import { toDDMMYYYY } from "@/utils/formatters/date-formatter";
import clsx from "clsx";
import { Settings, CalendarIcon, X, FilterIcon, Ban } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastDone, ToastErrorWithMessage } from "./toast-object";
import axios from "axios";

interface AccountCardProp {
    record: DetailedAccountRecord;
    setAccount?: (account: DetailedAccountRecord) => void;
    setMode?: (mode: Modes) => void;
}

const AccountCard = ({ record, setAccount, setMode }: AccountCardProp) => {
    const router = useRouter();
    const [collapse, setCollapse] = useState<boolean>(true);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    
    const cashFlows = record.CashFlow;
    const basic = record.originalCapital;

    const filteredCashFlows = cashFlows.filter(cash => {
        const cashDate = new Date(cash.createdAt);
        if (startDate && endDate) {
            return cashDate >= startDate && cashDate <= endDate;
        }
        if (startDate) {
            return cashDate >= startDate;
        }
        if (endDate) {
            return cashDate <= endDate;
        }
        return true;
    });
    
    const totalDebit = filteredCashFlows
        .filter(cash => cash.type == CashFlowType.Debit)
        .reduce((total: number, item: DetailedCashFlowRecord) => total + item.value, 0);
    
    const totalCredit = filteredCashFlows
        .filter(cash => cash.type == CashFlowType.Credit)
        .reduce((total: number, item: DetailedCashFlowRecord) => total + item.value, 0);
    
    const balance: number = totalDebit - totalCredit;

    const headers = ['Date', 'Category', 'Transfer In', 'Transfer Out'];

    const switchCollapse = () => setCollapse(prev => !prev);

    const handleSettingsClick = () => {
        if (setAccount && setMode) {
            setAccount(record);
            setMode('Edit');
        }
    };

    const clearFilters = () => {
        setStartDate(undefined);
        setEndDate(undefined);
    };

    const toggleFilter = () => setShowFilter(prev => !prev);

    const handleDisable = async () => {
        try {
            axios.patch('/api/accounting/account', {
                id: record.id,
                isDisabled: true
            }).then(response => {
                if (response.status === 200) {
                    router.refresh();
                    toast(ToastDone);
                }
            }).catch(error => {
                toast(ToastErrorWithMessage(error.response?.data?.message || "Failed to disable account"));
            }); 
        } catch (error: any) {
            toast(ToastErrorWithMessage(error.response?.data?.message || "Failed to disable account"));
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>{record.title}</CardTitle>
                            {record.description && (
                                <CardDescription>{record.description}</CardDescription>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={toggleFilter}
                                className={cn(showFilter && "bg-accent")}
                            >
                                <FilterIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={switchCollapse}>
                                {collapse ? 'Expand' : 'Collapse'}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleSettingsClick}>
                                <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleDisable}
                                title="Disable Account"
                            >
                                <Ban className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    {showFilter && (
                        <div className="flex justify-end">
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={cn(
                                                "justify-start text-left font-normal w-[130px]",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            {startDate ? format(startDate, "PP") : "Start"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={cn(
                                                "justify-start text-left font-normal w-[130px]",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            {endDate ? format(endDate, "PP") : "End"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="end">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={setEndDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                {(startDate || endDate) && (
                                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="overflow-y-auto max-h-[300px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{/* Actions */}</TableHead>
                            {headers.map(header => (
                                <TableHead className="text-center" key={header}>
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {!collapse && filteredCashFlows.map((cash, index) => (
                            <TableRow key={cash.id} className="text-center">
                                <TableCell />
                                <TableCell>
                                    {(index > 0 &&
                                        cash.createdAt.toDateString() === 
                                        filteredCashFlows[index - 1].createdAt.toDateString())
                                        ? ''
                                        : toDDMMYYYY(cash.createdAt)}
                                </TableCell>
                                <TableCell>{cash.category}</TableCell>
                                <TableCell>
                                    {cash.type === CashFlowType.Debit && cash.value}
                                </TableCell>
                                <TableCell>
                                    {cash.type === CashFlowType.Credit && cash.value}
                                </TableCell>
                            </TableRow>
                        ))}

                        {basic != null && basic > 0 && (
                            <TableRow className="text-center">
                                <TableCell />
                                <TableCell className="border-t-4">Basic</TableCell>
                                <TableCell className="border-t-4" />
                                <TableCell className={clsx(
                                    "text-center border-t-4",
                                    {
                                        "border-t-green-400": balance >= 0,
                                        "border-t-red-400": balance < 0,
                                    }
                                )}>
                                    {basic}
                                </TableCell>
                                <TableCell className={clsx(
                                    "text-center border-t-4",
                                    {
                                        "border-t-green-400": balance >= 0,
                                        "border-t-red-400": balance < 0,
                                    }
                                )} />
                            </TableRow>
                        )}

                        <TableRow className="text-center">
                            <TableCell />
                            <TableCell>Balance</TableCell>
                            <TableCell />
                            <TableCell className={!basic ? clsx(
                                "text-center border-t-4",
                                {
                                    "border-t-green-400": balance >= 0,
                                    "border-t-red-400": balance < 0,
                                }
                            ) : ""} />
                            <TableCell className={!basic ? clsx(
                                "text-center border-t-4",
                                {
                                    "border-t-green-400": balance >= 0,
                                    "border-t-red-400": balance < 0,
                                }
                            ) : ""}>
                                {(basic || 0) + balance}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AccountCard;