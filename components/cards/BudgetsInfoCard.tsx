import DetailsLink from '@components/links/DetailsLink';
import './styles/_BudgetsInfoCard.scss';
import TransactionsComponent from './TransactionsComponent';
import { Transactions } from '../../types/finance';
import Image from 'next/image';
import CardVisuals from './CardVisuals';
import EditDropdown from '@components/dropdowns/EditDropdown';
import Dropdown from '@components/dropdowns/Dropdown';

interface BudgetsInfoCardProps {
    category: string;
    cardTheme: string;
    maximum: number;
    spend: number;
    posts: Transactions[] | null;
}

export default function BudgetsInfoCard({ category, cardTheme, maximum, spend, posts }: BudgetsInfoCardProps) {

    let progressBarWidth = (spend / maximum) * 100;

    return (
        <div className="budgets-info-card-wrapper">
            <section className="budgets-info-card-top">
                <header className="budgets-info-card-header">
                    <div className="budgets-info-card-header-details">
                        <button className="ellipse" style={{ backgroundColor: cardTheme }}></button>
                        <h3>{category}</h3>
                    </div>
                    <div className="budgets-edit">
                        
                        <EditDropdown header='Budgets'/>
                    </div>

                </header>
                <div className="budgets-info-card-progress">
                    <p>Maximum of ${maximum}</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: cardTheme }}></div>
                    </div>
                </div>
                <div className="budgets-info-card-visuals">
                    <CardVisuals cardHeader='Spent' cardPrice={15} cardVisualColor={cardTheme} cardSpend={spend} />
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
                        posts={posts}
                    />
                </div>
            </section>
        </div>
    )
}