import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";
import { renderToBuffer } from '@react-pdf/renderer';
import { NotePDF } from './NotePDF';
import React from 'react';

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const data = await req.json();
        const { noteId } = data;

        const note = await db.note.findFirst({
            where: { id: noteId },
            include: {
                contentBlocks: true
            }
        });

        if (!note) {
            return new NextResponse(JSON.stringify({ message: 'Note not found' }), { status: 404 });
        }

        // Generate PDF
        const element = React.createElement(NotePDF, { note });
        const pdfBuffer = await renderToBuffer(element as React.ReactElement);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${note.title || 'note'}.pdf`
            }
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return new NextResponse(JSON.stringify({ message: 'Error generating PDF' }), { status: 500 });
    }
} 