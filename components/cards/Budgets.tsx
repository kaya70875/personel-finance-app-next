import React from 'react'
import './styles/_Budgets.scss';
import PieChart from '@components/graphs/PieChart';
import CardVisuals from './CardVisuals';
import useFetch from '@hooks/useFetch';
import OverviewCardHeaderSection from '@components/reusables/OverviewCardHeaderSection';
import Skeleton from 'react-loading-skeleton';

interface BudgetsProps {
    headerSection: boolean;
    isFullPage?: boolean;
}

export default function Budgets({ headerSection, isFullPage = false }: BudgetsProps) {

    const { data, error, loading } = useFetch();
    if (error) return <div>{error}</div>


    return (
        <div className={`budgets-wrapper ${isFullPage ? 'budgets-wrapper--main' : ''}`}>
            {headerSection && (
                <header className="budgets-inline-header">
                    <OverviewCardHeaderSection name='Budgets' loading={loading} href="/budgets" />
                </header>
            )}

            <div className='chart-main'>
                {loading ? (
                    <Skeleton width={'128px'} height={'128px'} circle />
                ) : (
                    <PieChart />
                )}
                <div className='budget-visuals'>
                    {isFullPage && (
                        <div className='spending-summary'>
                            <h3>Spending Summary</h3>
                        </div>
                    )}
                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width : '125px' }}>
                            <Skeleton width={'100%'} height={'20px'} />
                            <Skeleton width={'100%'} height={'20px'} />
                            <Skeleton width={'100%'} height={'20px'} />
                            <Skeleton width={'100%'} height={'20px'} />
                        </div>
                    ) : (
                        data?.budgetsData.map((budget, index) => (
                            <CardVisuals
                                cardHeader={budget.category}
                                cardPrice={budget.maximum}
                                cardVisualColor={budget.theme}
                                cardSpend={budget.spend}
                                isFullPage={isFullPage}
                                key={index}
                            />
                        ))
                    )}

                </div>


            </div>

        </div>
    )
}
