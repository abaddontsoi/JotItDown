import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";
import { renderToBuffer } from '@react-pdf/renderer';
import { TransactionPDF } from './TransactionPDF';
import React from 'react';
import { Document } from '@react-pdf/renderer';

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const data = await req.json();
        const { startDate, endDate, fromAccountId, toAccountId } = data;

        // Fetch transactions with filters
        const transactions = await db.transaction.findMany({
            include: {
                from: {
                    include: {
                        account: true,
                    }
                },
                to: {
                    include: {
                        account: true,
                    }
                }
            },
            where: {
                belongToId: user.id,
                ...(startDate && { createdAt: { gte: new Date(startDate) } }),
                ...(endDate && { createdAt: { lte: new Date(endDate) } }),
                ...(fromAccountId && { from: { accountid: fromAccountId } }),
                ...(toAccountId && { to: { accountid: toAccountId } }),
            },
            orderBy: { createdAt: 'desc' }
        });

        // Generate PDF
        const element = React.createElement(Document, {}, 
            React.createElement(TransactionPDF, { transactions })
        );
        const pdfBuffer = await renderToBuffer(element);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=TransactionsSummary.pdf'
            }
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error generating PDF' }), { status: 500 });
    }
}