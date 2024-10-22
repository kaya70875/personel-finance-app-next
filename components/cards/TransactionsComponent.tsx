'use client';

import Image from 'next/image';
import './styles/_Transactions.scss';
import useFetch from '@hooks/useFetch';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '@components/Pagination';
import TransactionFilter from '@components/filter/TransactionFilter';
import { Transactions } from '../../types/finance';

interface TransactionsProps {
  transactionFilters: boolean;
  pagination?: boolean;
}

export default function TransactionsComponent({ transactionFilters, pagination=true }: TransactionsProps) {
  const { data, error, loading } = useFetch();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // Manage filtered data
  const [filteredData, setFilteredData] = useState<Transactions[] | null | undefined>(null);

  const transactionData = useMemo(() => data?.transactionsData ?? [], [data]);

  // When fetching is done, set the filtered data initially
  useEffect(() => {
    if(transactionData) {
      setFilteredData(transactionData);
    }
  }, [transactionData]);

  // Calculate pagination based on filtered data
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData?.slice(firstPostIndex, lastPostIndex);

  return (
    <article className="transactions-wrapper">
      {transactionFilters && (
        <TransactionFilter
          transactionData={transactionData}  // Provide the full data for filtering
          setFilteredData={setFilteredData}
          currentPosts={currentPosts!}
        />
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
          {currentPosts?.map((transaction, index) => (
            <div className='transactions-info-wrapper' key={index}>
              <div className="transaction-sender">
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
                <h5>{new Date(transaction.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}</h5>
              </div>

              <div className="transaction-amount">
                <h4 style={transaction.amount > 0 ? { color: '#277C78' } : { color: '#201F24' }}>
                  ${transaction.amount}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {pagination && (
        <section className="transactions-button-section">
          <button 
            className="prev-btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <svg fill="currentColor" height="11" viewBox="0 0 6 11" width="6" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.14656 10.8535L.146554 5.85353c-.04649-.04643-.08337-.10158-.10853-.16228-.02516-.06069-.03811-.12576-.03811-.19147s.01295-.13077.03811-.19147c.02516-.06069.06204-.11584.10853-.16228l5-.999997c.06993-.0700052.15906-.117689.2561-.13701419.09704-.01932521.19764-.0094229.28905.02845329.09141.0378763.16953.1020229.22447.1843199.05493.082297.08421.179044.08414.277991v10.000017c.00007.0989-.02921.1957-.08414.278-.05494.0823-.13306.1464-.22447.1843s-.19201.0478-.28905.0284c-.09704-.0193-.18617-.067-.25609-.137z" fill="currentColor" />
            </svg>
            <p>Prev</p>
          </button>

          <div className="pagination-section">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredData?.length || 0}  // Use filtered data length for pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>

          <button 
            className="next-btn" 
            onClick={() => setCurrentPage(prev => (filteredData && prev < Math.ceil(filteredData.length / postsPerPage)) ? prev + 1 : prev)}
            disabled={currentPage === Math.ceil((filteredData?.length ?? 0) / postsPerPage)}
          >
            <p>Next</p>
            <svg fill="currentColor" height="11" viewBox="0 0 6 11" width="6" xmlns="http://www.w3.org/2000/svg">
              <path d="M.853506.146465l5 5c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147s-.01295.13077-.03811.19147c-.02517.06069-.06205.11584-.10853.16228l-5 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z" fill="currentColor" />
            </svg>
          </button>
        </section>
      )}
    </article>
  );
}
