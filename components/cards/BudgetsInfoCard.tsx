'use client';

import DetailsLink from '@components/links/DetailsLink';
import './styles/_BudgetsInfoCard.scss';
import TransactionsComponent from './TransactionsComponent';
import { Budgets, Transactions } from '../../types/finance';
import CardVisuals from './CardVisuals';
import InfoCardHeader from './atomic/InfoCardHeader';
import EditDropdown from '@components/dropdowns/EditDropdown';
import ModalClassic from './modal/ModalClassic';

interface BudgetsInfoCardProps {
    budget: Budgets;
    filteredTransactions: Transactions[];
}

export default function BudgetsInfoCard({ budget, filteredTransactions }: BudgetsInfoCardProps) {

    let progressBarWidth = (budget.spend / budget.maximum) * 100;

    const { theme, maximum, spend, _id, category } = budget;

    return (
        <div className="budgets-info-card-wrapper">
            <section className="budgets-info-card-top">
                <InfoCardHeader category={category} theme={theme}>
                    <EditDropdown category={category} id={_id} type={'Budget'}>
                        <ModalClassic category={category} maximum={maximum} theme={theme} />
                    </EditDropdown>
                </InfoCardHeader>
                <div className="budgets-info-card-progress">
                    <p>Maximum of ${maximum}</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: theme }}></div>
                    </div>
                </div>
                <div className="budgets-info-card-visuals">
                    <CardVisuals cardHeader='Spent' cardPrice={15} cardVisualColor={theme} cardSpend={spend} />
                    <CardVisuals cardHeader='Remaining' cardPrice={maximum - spend} cardVisualColor={'transparent'} />
                </div>
            </section>

            <section className="budgets-info-card-bottom">
                <header className="budgets-info-card-header">
                    <h3>Latest Spending</h3>
                    <DetailsLink header='See All' href='/transactions' />
                </header>
                <div className="budgets-info-card-transactions-section">
                    <TransactionsComponent
                        transactionFilters={false}
                        pagination={false}
                        posts={filteredTransactions}
                        amount=''
                        middle={[]}
                        sender=''
                    />
                </div>
            </section>
        </div>
    )
}