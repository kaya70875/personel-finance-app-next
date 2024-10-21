'use client';

import Image from 'next/image';
import './styles/_Transactions.scss';
import searchIcon from '@public/assets/images/icon-search.svg';
import useFetch from '@hooks/useFetch';
import Dropdown from '@components/dropdowns/Dropdown';

interface TransactionsProps {
  transactionFilters: boolean;
}

export default function TransactionsComponent({ transactionFilters }: TransactionsProps) {

  const { data, error, loading } = useFetch();

  if (loading) return <div>Loading</div>
  if (error) return <div>An error occured!</div>

  const transactionData = data?.transactionsData ?? [];

  // Filter out same categories for mapping over these categories without hardcoding.
  const uniqueCategories = Array.from(
    new Set(transactionData.map((transaction) => transaction.category))
  );

  return (
    <article className="transactions-wrapper">
      {transactionFilters && (
        <section className="transactions-filter-section">
          <div className="search-input">
            <input type="text"
              placeholder='Search transaction' />
            <Image src={searchIcon} alt="search icon" width={16} height={16} />
          </div>
          <div className="actual-filters">
            <div className="sort-by-wrapper">
              <h5>Sort By</h5>
              <Dropdown buttonName='Latest' >
                <p>Oldest</p>
                <p>A-Z</p>
                <p>Z-A</p>
                <p>Highest</p>
                <p>Lowest</p>
              </Dropdown>

            </div>
            <div className="category-wrapper">
              <h5>Category</h5>
              <Dropdown buttonName='Transactions'>
                {uniqueCategories.map(category => (
                  <p>{category}</p>
                ))}
              </Dropdown>
            </div>
          </div>
        </section>
      )}
      <section className="transactions-main-section">
        <header className="transactions-main-header">
          <div className="transaction-sender">
            <h5>Recipient/Sender</h5>
          </div>
          <div className="transaction-middle">
            <h5>Category</h5>
            <h5>Transaction Date</h5>
          </div>
          <div className="transaction-amount">
            <h5>Amount</h5>
          </div>
        </header>

        <div className="transactions-info-section">
          {transactionData.slice(0, 5).map((transaction, index) => (
            <div className='transactions-info-wrapper' key={index}>
              <div className="transaction-sender" key={index}>
                <Image
                  src={transaction.avatar.replace('.', '')}
                  alt={transaction.name}
                  width={48}
                  height={48}
                  className='avatar'
                />
                <h4>{transaction.name}</h4>
              </div>

              <div className="transaction-middle">
                <h5>{transaction.category}</h5>
                <h5>{transaction.date.toString()}</h5>
              </div>

              <div className="transaction-amount">
                <h5 style={transaction.amount > 0 ? { color: '#277C78' } : { color: '#201F24' }}>${transaction.amount}</h5>
              </div>
            </div>

          ))}


        </div>
      </section>
    </article>
  )
}
