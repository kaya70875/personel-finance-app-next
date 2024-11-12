'use client';

import TransactionsComponent from '@components/cards/TransactionsComponent';
import OverviewCard from '@components/OverviewCard'
import useFetch from '@hooks/useFetch'
import './_global.scss';
import { useTransactionDetails } from '@context/RecurBillsContext';
import { formatCurrency } from '@utils/helpers';
import Skeleton from 'react-loading-skeleton';

export default function page() {

  const { data, error, loading } = useFetch();

  if (error) return <div>Error! {error}</div>

  const transactionsData = data?.transactionsData ?? [];
  const recurrings = transactionsData.filter(transaction => (
    transaction.recurring === true
  ));

  const totalRecurrings = recurrings.reduce((total, transaction) => {
    return (total + transaction.amount)
  }, 0)

  const { totalBills, paidTotal, paidCount, dueTotal, dueCount } = useTransactionDetails();

  return (
    <div className="home">
      <div className="page-header">
        <h1>Recurring Bills</h1>
      </div>

      <div className="recurrings-wrapper">
        <section className="recurrings-info-section">
          <OverviewCard loading={loading} cardHeader='Total Bills' cardPrice={Math.abs(totalBills)} isActive={true} hasImage={true} />
          <div className="summary">
            {loading ? (
              <Skeleton width={'20%'} height={15} />
            ) : (
              <h4>Summary</h4>

            )}
            <div className="paid-bills">
              {loading ? (
                <div className="paid-sk-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton width={100} height={15} />
                  <Skeleton width={100} height={15} />
                </div>
              ) : (
                <>
                  <p>Paid Bills</p>
                  <h4>{paidCount}({formatCurrency(paidTotal)})</h4>
                </>
              )}

            </div>
            <div className="total-upcomings">
              {loading ? (
                <div className="total-sk-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton width={100} height={15} />
                  <Skeleton width={100} height={15} />
                </div>
              ) : (
                <>
                  <p>Total Upcomings</p>
                  <h4>$252</h4>
                </>
              )}

            </div>
            <div className="due-soon">
              {loading ? (
                <div className="due-sk" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton width={100} height={15} />
                  <Skeleton width={100} height={15} />
                </div>
              ) : (
                <>
                  <p className='p--alert'>Due Soon</p>
                  <h4 className='h4--alert'>{dueCount}({formatCurrency(dueTotal)})</h4>
                </>
              )}

            </div>
          </div>
        </section>
        <section className="recurrings-filter-section">
          <TransactionsComponent
            transactionFilters={true} pagination={false} // We can use pagination here if we want to paginate the recurring bills right now it is not a big data.
            posts={recurrings} isRecurring={true}
            sender='Bill Title'
            middle={['Due Date']}
            amount='Amount' />
        </section>
      </div >
    </div >
  )
}
