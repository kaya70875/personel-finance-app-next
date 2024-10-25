import { formatMonthlyDate, isBillDue, isBillPaid } from '@utils/helpers';
import { Transactions } from '../../types/finance';
import React from 'react'
import SvgIcon from './SvgIcon';

interface TransactionsInfoRecurProps {
    transaction: Transactions;
}

export default function TransactionsInfoRecur({ transaction }: TransactionsInfoRecurProps) {
    const isPaid = isBillPaid(transaction.date.toString());
    const isDue = isBillDue(transaction.date.toString());
    return (
        <>
            <h5 className='due-date' style={isPaid ? {color : '#277C78'} : {color : '#98908B'}}>{<span>{formatMonthlyDate(transaction.date.toString())}</span>} 
            {isPaid && <SvgIcon path="bill-paid"/>}
            {isDue && <SvgIcon path="bill-due"/>}
            </h5>
        </>
    )
}
