'use client';

import Budgets from '@components/cards/Budgets';
import './_global.scss';
import BudgetsInfoCard from '@components/cards/BudgetsInfoCard';
import useFetch from '@hooks/useFetch';
import { useState } from 'react';
import Modal from '@components/cards/Modal';
import Dropdown from '@components/dropdowns/Dropdown';
import { getUniqueCategories } from '@utils/helpers';
import { colors } from '@utils/colors';

export default function page() {
  const { data, loading, error } = useFetch();

  const transactionsData = data?.transactionsData ?? [];
  const budgetsData = data?.budgetsData ?? [];

  const [isPopped, setIsPopped] = useState(false);
  const [budgetData, setBudgetData] = useState({
    category: '',
    maximum: 0,
    theme: '',
  });

  const handleClick = () => {
    setIsPopped(prev => !prev);
  }

  const handleAddBudget = async () => {
    try {
      const response = await fetch('/api/addBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setIsPopped(false);
        window.location.reload();
      } else {
        console.error('Error adding budget');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const uniqueCategories = getUniqueCategories(transactionsData);

  return (
    <div className="home">
      <header className="page-header">
        <h1>Budgets</h1>
        <button className="add-button" onClick={handleClick}>+ Add New Budget</button>
        {isPopped && (
          <Modal onClose={setIsPopped} modalHeaderText={'Budget'} modalDesc={'Choose a category to set a spending budget. These categories can help you monitor spending.'}>
            <div className="inputs-wrapper">
              <div className="modal-input">
                <label>Budget Category</label>
                <Dropdown buttonName='Entertainment'>
                  {uniqueCategories.map(category => (
                    <p key={category} onClick={() => setBudgetData({
                      ...budgetData,
                      category: category,
                    })}>{category}</p>
                  ))}
                </Dropdown>

                <label htmlFor="spend">Maximum Spend</label>
                <input type="numeric" placeholder='$ e.g.2000' className='modal-input-item' onChange={(e) => setBudgetData({
                  ...budgetData,
                  maximum: parseInt(e.target.value),
                })} />

                <label>Theme</label>
                <Dropdown buttonName={
                  'Choose a color'
                }>
                  {Object.entries(colors).map(([colorName, colorValue]) => (
                    <div key={colorName} className='color-option' onClick={() => setBudgetData({
                      ...budgetData,
                      theme: colorValue,
                    })}>
                      <div className='ellipse' style={{ backgroundColor: colorValue }}></div>
                      <p>{colorName}</p>
                    </div>
                  ))}
                </Dropdown>
              </div>
            </div>
            <button className="add-button" onClick={handleAddBudget}>Add Budget</button>
          </Modal>
        )}

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
                spend={budget.spend | 0}
                posts={filteredTransactions}
              />
            );
          })}

        </div>
      </div>
    </div>
  )
}
