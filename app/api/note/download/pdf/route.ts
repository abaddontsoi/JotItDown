import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import React from 'react';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    contentBlock: {
        marginBottom: 20,
        padding: 10,
        border: '1 solid #eee',
    },
    blockTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    content: {
        fontSize: 12,
        lineHeight: 1.5,
    },
});

// Create Document Component
const NotePDF = ({ note }: { note: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>{note.title || 'Untitled Note'}</Text>
            
            {note.contentBlocks?.map((block: any, index: number) => (
                <View key={index} style={styles.contentBlock}>
                    <Text style={styles.blockTitle}>{block.title || `Content Block ${index + 1}`}</Text>
                    <Text style={styles.content}>{block.content}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

export async function POST(req: Request) {
    try {
        const user = await getUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        const data = await req.json();
        const { noteId } = data;

        // Fetch note with content blocks
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
        const element = React.createElement(Document, {}, 
            React.createElement(NotePDF, { note })
        );
        const pdfBuffer = await ReactPDF.renderToBuffer(element);

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