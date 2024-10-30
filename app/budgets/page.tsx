'use client';

import Budgets from '@components/cards/Budgets';
import './_global.scss';
import BudgetsInfoCard from '@components/cards/BudgetsInfoCard';
import { useState } from 'react';
import Modal from '@components/cards/Modal';
import Dropdown from '@components/dropdowns/Dropdown';
import { getUniqueCategories } from '@utils/helpers';
import { colors } from '@utils/colors';
import useFetch from '@hooks/useFetch';
import useAdd from '@hooks/useAdd';

export default function page() {
  const { data, loading, error } = useFetch();
  const { handleAddCard } = useAdd();

  const [budgetData, setBudgetData] = useState({
    category: '',
    maximum: 0,
    theme: '',
  });

  const transactionsData = data?.transactionsData ?? [];
  const budgetsData = data?.budgetsData ?? [];

  const [isPopped, setIsPopped] = useState(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState({
    budgetCategory: 'Choose a category',
    budgetTheme: 'Choose a color',
  });

  const handleClick = () => {
    setIsPopped(prev => !prev);
  }

  const handleAddBudget = () => {
    handleAddCard(budgetData, 'addBudget', setIsPopped);
  };

  const uniqueCategories = getUniqueCategories(transactionsData);

  return (
    <div className="home">
      <header className="page-header">
        <h1>Budgets</h1>
        <button className="add-button" onClick={handleClick}>+ Add New Budget</button>
        {isPopped && (
          <Modal onClose={setIsPopped} modalHeaderText={'Add New Budget'} modalDesc={'Choose a category to set a spending budget. These categories can help you monitor spending.'}>
            <div className="inputs-wrapper">
              <div className="modal-input">
                <label>Budget Category</label>
                <Dropdown buttonName={activeDropdownItem.budgetCategory}>
                  {uniqueCategories.map(category => (
                    <li className='dropdown-item' key={category} onClick={() => {
                      setBudgetData({
                        ...budgetData,
                        category: category,
                      })
                      setActiveDropdownItem({
                        ...activeDropdownItem,
                        budgetCategory: category,
                      });
                    }}>
                      <p>{category}</p>
                    </li>
                  ))}
                </Dropdown>

                <label htmlFor="spend">Maximum Spend</label>
                <input type="numeric" placeholder='$ e.g.2000' className='modal-input-item' onChange={(e) => setBudgetData({
                  ...budgetData,
                  maximum: parseInt(e.target.value),
                })} />

                <label>Theme</label>
                <Dropdown buttonName={
                  activeDropdownItem.budgetTheme
                }>
                  {Object.entries(colors).map(([colorName, colorValue]) => (
                    <li key={colorName} className='color-option' onClick={() => {
                      setBudgetData({
                        ...budgetData,
                        theme: colorValue,
                      })
                      setActiveDropdownItem({
                        ...activeDropdownItem,
                        budgetTheme: colorName,
                      });
                    }}>
                      <div className='ellipse' style={{ backgroundColor: colorValue }}></div>
                      <p>{colorName}</p>
                    </li>
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
                key={budget._id}
                budget={budget}
                filteredTransactions={filteredTransactions}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}
