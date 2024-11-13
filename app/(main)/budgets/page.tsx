'use client';

import Budgets from '@components/cards/Budgets';
import './_global.scss';
import BudgetsInfoCard from '@components/cards/BudgetsInfoCard';
import { useState } from 'react';
import Modal from '@components/cards/Modal';
import useFetch from '@hooks/useFetch';
import ModalClassic from '@components/cards/modal/ModalClassic';
import BudgetCardSkeleton from '@components/skeletons/BudgetCardSkeleton';

export default function page() {
  const { data, loading, error } = useFetch();

  const transactionsData = data?.transactionsData ?? [];
  const budgetsData = data?.budgetsData ?? [];

  const [isPopped, setIsPopped] = useState<boolean>(false);

  const handleClick = () => {
    setIsPopped(prev => !prev);
  }

  if(error) return <div>Error</div>

  return (
    <div className="home">
      <header className="page-header">
        <h1>Budgets</h1>
        <button className="add-button" onClick={handleClick}>+ Add New Budget</button>
        <Modal isPopped={isPopped} onClose={setIsPopped} modalHeaderText={'Add New Budget'} modalDesc={'Choose a category to set a spending budget. These categories can help you monitor spending.'}>
          <ModalClassic cardType='budget' setIsPopped={setIsPopped} actionType='add' />
        </Modal>

      </header>
      <div className="budgets-main">
        <Budgets headerSection={false}
          isFullPage={true}
        />
        <div className="budgets-cards">
          {loading ? (
            <BudgetCardSkeleton />
          ) : (
            
            budgetsData.length > 0 ? (budgetsData.map(budget => {
              const filteredTransactions = transactionsData.filter(
                transaction => transaction.category === budget.category
              );
  
              return (
                <BudgetsInfoCard
                  key={budget._id}
                  budget={budget}
                  filteredTransactions={filteredTransactions}
                  cardType='budget'
                />
              );
            })) : (
              <div className="budgets-cards-empty">
                <h3>Your Budget Cards Shown Here.</h3>
                <p>Add Some budgets to get started!</p>
              </div>
            )
          )}
          
        </div>
      </div>
    </div>
  )
}
