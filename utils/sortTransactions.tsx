import { Transactions } from '../types/finance';

export function sortTransactions(transactions: Transactions[] | null, sortBy: string): Transactions[] {

    if (!transactions) return [];

    if (sortBy === 'Latest') {
        return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'Oldest') {
        return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'A-Z') {
        return transactions.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Z-A') {
        return transactions.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'Highest') {
        return transactions.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'Lowest') {
        return transactions.sort((a, b) => a.amount - b.amount);
    }
    return transactions;
}