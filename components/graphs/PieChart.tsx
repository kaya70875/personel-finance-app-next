import useFetch from '@hooks/useFetch';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './_PieChart.scss';
import { Budgets, Pots } from '../../types/finance';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const { data: dt, loading, error } = useFetch();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;



    const budgetData = dt?.budgetsData || [];
    const potsData = dt?.potsData || [];

    const limit = budgetData.reduce((acc: number, currentValue: Budgets) => {
        return acc + currentValue.maximum;
    }, 0);

    const potsSum = potsData.reduce((acc: number, currentValue: Pots) => {
        return acc + currentValue.total;
    }, 0);

    const data = {
        datasets: [
            {
                data: budgetData.map((budget) => budget.maximum),
                backgroundColor: budgetData.map(budget => budget.theme),
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                enabled: true,
            },
        },
        cutout: '65%',
    };

    return (
        <div className="chart-container">
            <div className="chart-overlay">
                <h2>${potsSum}</h2>
                <p>of ${limit} limit</p>
            </div>
            <Doughnut data={data} options={options} className='chart-itself' />
        </div>
    );
}