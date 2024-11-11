import './styles/_RecurringOverviewCard.scss';
import { useTransactionDetails } from '@context/RecurBillsContext';
import { formatCurrency } from '@utils/helpers';
import OverviewCardHeaderSection from '@components/reusables/OverviewCardHeaderSection';
import OverviewSkeleton from '@components/skeletons/OverviewSkeleton';

export default function RecurringOverviewCard() {

    const { dueTotal, paidTotal, totalCount, loading, error } = useTransactionDetails();

    if (error) {
        return <div>An error occured!</div>
    }
    return (
        <div className="recurring-overview-card-wrapper">
            <header className="overview-card-header-section">
                <OverviewCardHeaderSection loading={loading} href='/recurrings' name='Recurring Bills' />
            </header>

            <div className="recurring-overview-cards">
                {loading ? (
                    <OverviewSkeleton height='2rem' count={3} />
                ) : (
                    <>
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
                    </>
                )}

            </div>
        </div>
    )
}
