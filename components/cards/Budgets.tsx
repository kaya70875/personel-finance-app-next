import DetailsLink from '@components/links/DetailsLink';
import React from 'react'
import './styles/_Budgets.scss';
import PieChart from '@components/graphs/PieChart';
import CardVisuals from './CardVisuals';
import useFetch from '@hooks/useFetch';

interface BudgetsProps {
    headerSection: boolean;
    isFullPage?: boolean;
}

export default function Budgets({ headerSection, isFullPage = false }: BudgetsProps) {

    const { data, error, loading } = useFetch();
    if (loading) return <div>loading</div>
    if (error) return <div>{error}</div>


    return (
        <div className={`budgets-wrapper ${isFullPage ? 'budgets-wrapper--main' : ''}`}>
            {headerSection && (
                <header className="budgets-inline-header">
                    <h3>Budgets</h3>
                    <DetailsLink href='/budgets' />
                </header>
            )}

            <div className='chart-main'>
                <PieChart />
                <div className='budget-visuals'>
                    {isFullPage && (
                        <div className='spending-summary'>
                            <h3>Spending Summary</h3>
                        </div>
                    )}
                    {data?.budgetsData.map((budget, index) => (
                        <CardVisuals
                            cardHeader={budget.category}
                            cardPrice={budget.maximum}
                            cardVisualColor={budget.theme}
                            cardSpend={budget.spend}
                            isFullPage={isFullPage}
                            key={index}
                        />
                    ))}
                </div>


            </div>

        </div>
    )
}
