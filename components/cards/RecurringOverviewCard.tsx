import DetailsLink from '@components/links/DetailsLink';
import './styles/_RecurringOverviewCard.scss';
import { useTransactionDetails } from '@context/RecurBillsContext';
import { formatCurrency } from '@utils/helpers';

export default function RecurringOverviewCard() {

    const {dueTotal , paidTotal , totalCount} = useTransactionDetails();

  return (
    <div className="recurring-overview-card-wrapper">
        <header className="overview-card-header-section">
            <h3>Recurring Bills</h3>
            <DetailsLink href='/recurring' header='See Details'/>
        </header>

        <div className="recurring-overview-cards">
            <div className="recurring-overview-card">
                <p>Paid Bills</p>
                <h3>{formatCurrency(paidTotal)}</h3>
            </div>
            <div className="recurring-overview-card">
                <p>Total Upcomings</p>
                <h3>{formatCurrency(totalCount)}</h3>
            </div>
            <div className="recurring-overview-card">
                <p>Due Soon</p>
                <h3>{formatCurrency(dueTotal)}</h3>
            </div>
        </div>
    </div>
  )
}
