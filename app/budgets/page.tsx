'use client';

import Budgets from '@components/cards/Budgets';
import './_global.scss';

export default function page() {
  return (
    <div className="home">
        <header className="page-header">
            <h1>Budgets</h1>
        </header>
        <div className="budgets-main">
            <Budgets headerSection={false}
             chartWidth={'50%'}
             />
            <div className="budget-cards">

            </div>
        </div>
    </div>
  )
}
