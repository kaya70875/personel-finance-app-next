import { Transactions } from '../types/finance';

export function isBillPaid(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();

  return date.getDate() < now.getDate();
}

export function isBillDue(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();

  return !isBillPaid(dateString) && date.getDate() - now.getDate() < 6;
}

export function formatMonthlyDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();

  let suffix;
  if (day >= 11 && day <= 13) {
    suffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
        break;
    }
  }

  return `Monthly - ${day}${suffix}`;
}

export function getUniqueCategories(transactions: Transactions[] | null) {
  // Filter out same categories for mapping over these categories without hardcoding.
  const uniqueCategories = Array.from(
    new Set(transactions?.map((transaction) => transaction.category))
  );

  return uniqueCategories;
}

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}