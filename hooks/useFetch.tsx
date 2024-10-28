import axios from "axios";
import { Balance, Budgets, Pots, Transactions } from '../types/finance';
import useSWR from "swr";

export interface Data {
    balanceData : Balance;
    budgetsData : Budgets[];
    transactionsData : Transactions[];
    potsData : Pots[];
}

const fetcher = async () => {
    const response = await axios.get<Data>(`api/getData`);
    return response.data;
}

const useFetch = () => {

    const {data , error , isValidating} = useSWR('api/getData', fetcher, {
        revalidateOnFocus : false,
        revalidateOnReconnect : false,
        revalidateOnMount : true,
    });

    return {
        data,
        loading : isValidating,
        error : error ? error.message : '',
    }
}

export default useFetch;