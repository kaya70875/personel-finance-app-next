'use client'

import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import searchIcon from '@public/assets/images/icon-search.svg';
import Dropdown from '@components/dropdowns/Dropdown';
import { Transactions } from '../../types/finance';
import { sortTransactions } from '@utils/sortTransactions';
import { getUniqueCategories } from '@utils/helpers';
import SvgIcon from '@components/reusables/SvgIcon';

interface TransactionFilterProps {
    transactionData: Transactions[] | null;
    setFilteredData: React.Dispatch<React.SetStateAction<Transactions[] | null | undefined>>;
    currentPosts: Transactions[] | null;
}

export default function TransactionFilter({ transactionData, setFilteredData, currentPosts }: TransactionFilterProps) {

    const [currentSearch, setCurrentSearch] = useState('');
    const [currentCategory, setCurrentCategory] = useState('All Transactions');
    const [currentSortBy, setCurrentSortBy] = useState('Latest');

    const [isMobile, setIsMobile] = useState(false);

    const [activeItem, setActiveItem] = useState<{ activeCategory: number | null; activeSort: number | null }>({
        activeCategory: 0,
        activeSort: 0,
    });

    // Helper function to reset filters
    const resetFilters = (currentIndex: number) => {
        setFilteredData(transactionData);
        setCurrentCategory('All Transactions');
        setCurrentSortBy('Latest');
        setActiveItem({ activeCategory: currentIndex, activeSort: currentIndex });
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };

        // Run on component mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        const filteredTransactions = transactionData?.filter(transaction => transaction.name.toLowerCase().includes(currentSearch.toLowerCase()));
        setFilteredData(filteredTransactions);
    }, [currentSearch]);

    const uniqueCategories = ['All Transactions', ...getUniqueCategories(transactionData)];

    const handleCategorySorting = (currentIndex: number) => {
        if (currentIndex === 0) {
            // If "All Transactions" is selected reset filters and sort by latest
            resetFilters(currentIndex);
        } else {
            const currentCategory = uniqueCategories[currentIndex];
            const categorizedTransactions = transactionData?.filter(
                transaction => transaction.category === currentCategory
            );
            setFilteredData(categorizedTransactions);
            setCurrentCategory(currentCategory);
            setActiveItem(prev => ({ ...prev, activeCategory: currentIndex }));
        }
    }

    const handleSortBy = (currentIndex: number) => {
        const currentSortBy = sortBy[currentIndex];

        const sortedTransactions = sortTransactions(currentPosts, currentSortBy);
        const dataToSort = [...sortedTransactions]; // Create a new referance so react will trigger a rerender. (Note that data is not changing in sorting actions!)
        setFilteredData(dataToSort);
        setCurrentSortBy(currentSortBy);
        setActiveItem(prev => ({ ...prev, activeSort: currentIndex }));
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
                    <Dropdown buttonName={isMobile ? <SvgIcon path='sort-mobile' /> : currentSortBy}>
                        {sortBy.map((sort, index) => (
                            <li className='dropdown-item' onClick={() => handleSortBy(index)} key={index}>
                                <p className={`p--black ${activeItem.activeSort === index ? 'active' : ''}`}>{sort}</p>
                            </li>
                        ))}
                    </Dropdown>

                </div>
                <div className="category-wrapper">
                    <h5>Category</h5>
                    <Dropdown buttonName={isMobile ? <SvgIcon path='filter-mobile' /> : currentCategory}>
                        {uniqueCategories.map((category, index) => (
                            <li className="dropdown-item" onClick={() => handleCategorySorting(index)} key={index}>
                                <p className={`p--black ${activeItem.activeCategory === index ? 'active' : ''}`}>{category}</p>
                            </li>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </section>
    )
}
