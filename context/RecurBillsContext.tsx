'use client';
import React, { createContext, useContext, useMemo } from 'react';
import useFetch from '@hooks/useFetch';
import { isBillDue, isBillPaid } from '@utils/helpers';
// Define types for context value
interface TransactionContextProps {
    totalBills: number;
    totalCount: number;
    paidTotal: number;
    paidCount: number;
    dueTotal: number;
    dueCount: number;
}

// Create the context
const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

// Create the Provider
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: transactionsData } = useFetch();

    const billsDetails = useMemo(() => {
        if (!transactionsData) return { totalBills: 0, totalCount: 0, paidTotal: 0, paidCount: 0, dueTotal: 0, dueCount: 0 };

        let totalBills = 0,
            paidTotal = 0,
            paidCount = 0,
            dueTotal = 0,
            dueCount = 0;
        const billsIds = transactionsData.transactionsData.filter((transaction) => transaction.recurring);
        const totalCount = billsIds.length;

        billsIds.forEach(({ date, amount }) => {
            const isPaid = isBillPaid(date.toString());
            const isDue = isBillDue(date.toString());

            totalBills += Math.abs(amount);
            if (isPaid) {
                paidTotal += Math.abs(amount);
                paidCount++;
            } else if (isDue) {
                dueTotal += Math.abs(amount);
                dueCount++;
            }
        });

        return { totalBills, totalCount, paidTotal, paidCount, dueTotal, dueCount };
    }, [transactionsData]);

    return <TransactionContext.Provider value={billsDetails}>{children}</TransactionContext.Provider>;
};

// Create a custom hook for consuming the context
export const useTransactionDetails = () => {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactionDetails must be used within a TransactionProvider');
    }
    return context;
};
