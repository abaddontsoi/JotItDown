'use client';

import { DetailedTransaction } from "@/components/self-defined/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/app/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecentTransactionsProps {
    transactions: DetailedTransaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card className="mt-2">
            <CardHeader className="px-6 flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </CardHeader>
            {isOpen && (
                <CardContent className="px-6">
                    <div className="space-y-4 pr-4 overflow-y-auto max-h-[320px]">
                        {transactions.slice(0, 5).map(t => (
                            <Card key={t.id} className="p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">
                                            {t.from.account?.title} → {t.to.account?.title}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {t.remark || 'No remark'}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">${t.from.value.toFixed(2)}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {formatDate(t.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    );
} 