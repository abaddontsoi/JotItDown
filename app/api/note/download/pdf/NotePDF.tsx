import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

interface NotePDFProps {
    note: {
        title: string | null;
        contentBlocks?: Array<{
            title: string | null;
            content: string;
        }>;
    };
}

export function NotePDF({ note }: NotePDFProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>{note.title || 'Untitled Note'}</Text>
                
                {note.contentBlocks?.map((block, index) => (
                    <View key={index} style={styles.contentBlock}>
                        <Text style={styles.blockTitle}>
                            {block.title || `Content Block ${index + 1}`}
                        </Text>
                        <Text style={styles.content}>{block.content}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
} 