import useFetch from '@hooks/useFetch';
import './_PieChart.scss';
import { Budgets } from '../../types/finance'

export default function PieChart() {
  const { data, loading, error } = useFetch();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const budgetData = data?.budgetsData || [];

  


  return(
    <div className='x-box'>

    </div>
  )
}