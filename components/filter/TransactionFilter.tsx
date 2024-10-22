'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import searchIcon from '@public/assets/images/icon-search.svg';
import Dropdown from '@components/dropdowns/Dropdown';
import { Transactions } from '../../types/finance';
import { sortTransactions } from '@utils/sortTransactions';

interface TransactionFilterProps {
    transactionData: Transactions[] | null;
    setFilteredData: React.Dispatch<React.SetStateAction<Transactions[] | null | undefined>>;
    currentPosts: Transactions[] | null;
}

export default function TransactionFilter({ transactionData, setFilteredData, currentPosts }: TransactionFilterProps) {

    const [currentSearch, setCurrentSearch] = useState('');
    const [currentCategory, setCurrentCategory] = useState('Transactions');
    const [currentSortBy, setCurrentSortBy] = useState('Latest');

    useEffect(() => {
        const filteredTransactions = currentPosts?.filter(transaction => transaction.name.toLowerCase().includes(currentSearch.toLowerCase()));
        setFilteredData(filteredTransactions);
    }, [currentSearch]);

    // Filter out same categories for mapping over these categories without hardcoding.
    const uniqueCategories = Array.from(
        new Set(transactionData?.map((transaction) => transaction.category))
    );


    const handleCategorySorting = (currentIndex: number) => {
        const currentCategory = uniqueCategories[currentIndex];
        console.log(currentCategory);

        const categorizedTransactions = transactionData?.filter(transaction => transaction.category === currentCategory);
        setFilteredData(categorizedTransactions);
        setCurrentCategory(currentCategory);
    }

    const handleSortBy = (currentIndex: number) => {
        const currentSortBy = sortBy[currentIndex];

        const sortedTransactions = sortTransactions(currentPosts, currentSortBy);

        setFilteredData(sortedTransactions);
        setCurrentSortBy(currentSortBy);
    }

    const sortBy = ['Latest', 'Oldest', 'A-Z', 'Z-A', 'Highest', 'Lowest'];

    return (
        <section className="transactions-filter-section">
            <div className="search-input">
                <input type="text"
                    placeholder='Search transaction' onChange={(e) => setCurrentSearch(e.target.value)} />
                <Image src={searchIcon} alt="search icon" width={16} height={16} />
            </div>
            <div className="actual-filters">
                <div className="sort-by-wrapper">
                    <h5>Sort By</h5>
                    <Dropdown buttonName={currentSortBy}>
                        {sortBy.map((sort, index) => (
                            <p onClick={() => handleSortBy(index)} key={index}>{sort}</p>
                        ))}
                    </Dropdown>

                </div>
                <div className="category-wrapper">
                    <h5>Category</h5>
                    <Dropdown buttonName={currentCategory}>
                        {uniqueCategories.map((category, index) => (
                            <p onClick={() => handleCategorySorting(index)} key={index}>{category}</p>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </section>
    )
}
