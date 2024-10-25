'use client';

import TransactionsComponent from '@components/cards/TransactionsComponent';
import OverviewCard from '@components/OverviewCard'
import useFetch from '@hooks/useFetch'
import './_global.scss';
import { useTransactionDetails } from '@context/RecurBillsContext';

export default function page() {

  const {data , error , loading} = useFetch();

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>

  const transactionsData = data?.transactionsData ?? [];
  const recurrings = transactionsData.filter(transaction => (
    transaction.recurring === true
  ));

  const totalRecurrings = recurrings.reduce((total, transaction) => {
    return (total + transaction.amount)
  }, 0)

  const { totalBills, totalCount, paidTotal, paidCount, dueTotal, dueCount } = useTransactionDetails();

  return (
    <div className="home">
        <div className="page-header">
            <h1>Recurring Bills</h1>
        </div>

        <div className="recurrings-wrapper">
          <section className="recurrings-info-section">
            <OverviewCard cardHeader='Total Bills' cardPrice={Math.abs(totalBills)} isActive={true} hasImage={true}/>
            <div className="summary">
              <h4>Summary</h4>
              <div className="paid-bills">
                <p>Paid Bills</p>
                <h4>{paidCount}(${paidTotal})</h4>
              </div>
              <div className="total-upcomings">
                <p>Total Upcomings</p>
                <h4>$252</h4>
              </div>
              <div className="due-soon">
                <p className='p--alert'>Due Soon</p>
                <h4 className='h4--alert'>{dueCount}(${dueTotal})</h4>
              </div>
            </div>
          </section>
          <section className="recurrings-filter-section">
            <TransactionsComponent 
            transactionFilters={true} pagination={false}
            posts={recurrings} isRecurring={true}
            sender='Bill Title'
            middle={['Due Date']}
            amount='Amount'/>
          </section>
        </div>
    </div>
  )
}
