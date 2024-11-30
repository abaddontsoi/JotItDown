import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Transaction } from '@prisma/client';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
    },
    tableCell: {
        padding: 5,
        fontSize: 10,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    date: { width: '20%' },
    account: { width: '30%' },
    amount: { width: '20%' },
});

interface Props {
    transactions: any[];  // Replace 'any' with your transaction type
}

export function TransactionPDF({ transactions }: Props) {
    const totalAmount = transactions.reduce((sum, t) => sum + t.from.value, 0);

    return (
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Transactions Summary</Text>

            <View style={styles.table}>
                {/* Header */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, styles.date]}>Date</Text>
                    <Text style={[styles.tableCell, styles.account]}>From</Text>
                    <Text style={[styles.tableCell, styles.account]}>To</Text>
                    <Text style={[styles.tableCell, styles.amount]}>Amount</Text>
                </View>

                {/* Data Rows */}
                {transactions.map((t, i) => (
                    <View key={i} style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.date]}>
                            {new Date(t.createdAt).toLocaleDateString()}
                        </Text>
                        <Text style={[styles.tableCell, styles.account]}>
                            {t.from.account?.title || 'Unknown'}
                        </Text>
                        <Text style={[styles.tableCell, styles.account]}>
                            {t.to.account?.title || 'Unknown'}
                        </Text>
                        <Text style={[styles.tableCell, styles.amount]}>
                            {t.from.value.toFixed(2)}
                        </Text>
                    </View>
                ))}

                {/* Total Row */}
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, { width: '80%' }]}>Total</Text>
                    <Text style={[styles.tableCell, styles.amount]}>
                        {totalAmount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Page>
    );
}