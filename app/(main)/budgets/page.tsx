'use client';

import Budgets from '@components/cards/Budgets';
import './_global.scss';
import BudgetsInfoCard from '@components/cards/BudgetsInfoCard';
import { useState } from 'react';
import Modal from '@components/cards/Modal';
import useFetch from '@hooks/useFetch';
import ModalClassic from '@components/cards/modal/ModalClassic';

export default function page() {
  const { data, loading, error } = useFetch();

  const transactionsData = data?.transactionsData ?? [];
  const budgetsData = data?.budgetsData ?? [];

  const [isPopped, setIsPopped] = useState<boolean>(false);

  const handleClick = () => {
    setIsPopped(prev => !prev);
  }

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
          {budgetsData.map(budget => {
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
          })}
        </div>
      </div>
    </div>
  )
}
