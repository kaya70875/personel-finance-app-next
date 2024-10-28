import DetailsLink from '@components/links/DetailsLink';
import './styles/_BudgetsInfoCard.scss';
import TransactionsComponent from './TransactionsComponent';
import { Transactions } from '../../types/finance';
import CardVisuals from './CardVisuals';
import InfoCardHeader from './atomic/InfoCardHeader';

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
                <InfoCardHeader category={category} cardTheme={cardTheme} />
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
                        amount=''
                        middle={[]}
                        sender=''
                    />
                </div>
            </section>
        </div>
    )
}