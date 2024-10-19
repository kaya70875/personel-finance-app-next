import DetailsLink from '@components/links/DetailsLink';
import React from 'react'
import './styles/_Budgets.scss';
import BudgetsGraph from '@components/graphs/PieChart';

interface BudgetsProps {
    headerSection : boolean;
    gridType : string;
}

export default function Budgets({headerSection , gridType} : BudgetsProps) {
  return (
    <div className="budgets-wrapper">
        {headerSection && (
            <header className="budgets-inline-header">
                <h2>Budgets</h2>
                <DetailsLink href='/budgets'/>
            </header>
        )}

        <BudgetsGraph />
    </div>
  )
}
