import DetailsLink from '@components/links/DetailsLink';
import './styles/_RecurringOverviewCard.scss';
import { useTransactionDetails } from '@context/RecurBillsContext';

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
                <h3>${paidTotal}</h3>
            </div>
            <div className="recurring-overview-card">
                <p>Total Upcomings</p>
                <h3>${totalCount}</h3>
            </div>
            <div className="recurring-overview-card">
                <p>Due Soon</p>
                <h3>${dueTotal}</h3>
            </div>
        </div>
    </div>
  )
}
