import axios from "axios";
import { useEffect, useState } from "react";
import { Balance, Budgets, Pots, Transactions } from '../types/finance';

interface Data {
    balanceData : Balance;
    budgetsData : Budgets[];
    transactionData : Transactions;
    potsData : Pots[];
}

const useFetch = () => {

    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Data>(`api/getData`);
                setData(response.data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong.');
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, []);

    return { data, loading, error }
}

export default useFetch;