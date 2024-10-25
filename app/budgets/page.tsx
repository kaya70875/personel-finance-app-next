'use client';

import Budgets from '@components/cards/Budgets';
import './_global.scss';
import BudgetsInfoCard from '@components/cards/BudgetsInfoCard';
import useFetch from '@hooks/useFetch';
import AddButton from '@components/buttons/AddButton';

export default function page() {
  const { data, loading, error } = useFetch();

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  const transactionsData = data?.transactionsData ?? [];
  const budgetsData = data?.budgetsData ?? [];

  return (
    <div className="home">
      <header className="page-header">
        <h1>Budgets</h1>
        <AddButton buttonText='Budget'/>
      </header>
      <div className="budgets-main">
        <Budgets headerSection={false}
          isFullPage={true}
        />
        <div className="budgets-cards">
          {budgetsData.map(budget => {
            const filteredTransactions = transactionsData.filter(
              transaction => transaction.category === budget.category
            );

            return (
              <BudgetsInfoCard
                key={budget.category}
                category={budget.category}
                cardTheme={budget.theme}
                maximum={budget.maximum}
                spend={budget.spend}
                posts={filteredTransactions}
              />
            );
          })}

        </div>
      </div>
    </div>
  )
}
