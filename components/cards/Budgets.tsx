import DetailsLink from '@components/links/DetailsLink';
import React from 'react'
import './styles/_Budgets.scss';
import PieChart from '@components/graphs/PieChart';
import CardVisuals from './CardVisuals';
import useFetch from '@hooks/useFetch';

interface BudgetsProps {
    headerSection: boolean;
    chartWidth? : string;
    cardDisplayStyle? : React.CSSProperties;
    cardInfoDisplayStyle? : React.CSSProperties;
}

export default function Budgets({ headerSection, chartWidth}: BudgetsProps) {

    const { data, error, loading } = useFetch();
    if (loading) return <div>loading</div>
    if (error) return <div>{error}</div>


    return (
        <div className='budgets-wrapper' style={{width : chartWidth}}>
            {headerSection && (
                <header className="budgets-inline-header">
                    <h3>Budgets</h3>
                    <DetailsLink href='/budgets' />
                </header>
            )}

            <div className='chart-main'>
                <PieChart />
                <div className='budget-visuals'>
                    {data?.budgetsData.map(budget => (
                        <CardVisuals
                            cardHeader={budget.category}
                            cardPrice={budget.maximum}
                            cardVisualColor={budget.theme}
                            cardSpend={budget.spend}
                        />
                    ))}
                </div>


            </div>

        </div>
    )
}
