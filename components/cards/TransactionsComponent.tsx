'use client';

import './styles/_Transactions.scss';
import useFetch from '@hooks/useFetch';
import { useEffect, useMemo, useState } from 'react';
import Pagination from '@components/Pagination';
import TransactionFilter from '@components/filter/TransactionFilter';
import { Transactions } from '../../types/finance';
import TransactionsInfoWrapper from '@components/reusables/TransactionsInfoWrapper';
import { motion } from 'framer-motion';

interface TransactionsProps {
  transactionFilters: boolean;
  pagination?: boolean;
  postsCount?: number;
  posts?: Transactions[] | null;
  isRecurring?: boolean;
  sender?: string;
  middle?: string[];
  amount?: string;
}

export default function TransactionsComponent({ transactionFilters, pagination = true, postsCount = 10, posts
  , isRecurring = false, sender = 'Recipient / Sender', middle = ['Category', 'Transaction Date'], amount = 'Amount' }: TransactionsProps) {
  
  const { data, error, loading } = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(postsCount);
  const [filteredData, setFilteredData] = useState<Transactions[] | null | undefined>(null);

  const transactionData = data?.transactionsData ?? [];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  useEffect(() => {
    if (transactionData) {
      setFilteredData(isRecurring ? posts : transactionData);
    }
  }, [transactionData]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData?.slice(firstPostIndex, lastPostIndex);

  return (
    <motion.article 
      className="transactions-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {transactionFilters && (
        <motion.div variants={itemVariants}>
          <TransactionFilter
            transactionData={transactionData}
            setFilteredData={setFilteredData}
            currentPosts={filteredData!}
          />
        </motion.div>
      )}

      <motion.section 
        className="transactions-main-section"
        variants={itemVariants}
      >
        <motion.header 
          className="transactions-main-header"
          variants={itemVariants}
        >
          <motion.div 
            className="transaction-sender"
            whileHover={{ scale: 1.02 }}
          >
            <h5>{sender}</h5>
          </motion.div>
          <div className="transaction-middle">
            {middle?.map((item, index) => (
              <motion.h5 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                {item}
              </motion.h5>
            ))}
          </div>
          <motion.div 
            className="transaction-amount"
            whileHover={{ scale: 1.02 }}
          >
            <h5>{amount}</h5>
          </motion.div>
        </motion.header>

        <motion.div 
          className="transactions-info-section"
          variants={itemVariants}
        >
          {posts ? (
            <TransactionsInfoWrapper loading={loading} currentPosts={currentPosts!} isRecurring={isRecurring} />
          ) : (
            <TransactionsInfoWrapper loading={loading} currentPosts={currentPosts!} />
          )}
        </motion.div>
      </motion.section>

      {pagination && (
        <motion.section 
          className="transactions-button-section"
          variants={itemVariants}
        >
          <motion.button
            className="prev-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg fill="currentColor" height="11" viewBox="0 0 6 11" width="6" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.14656 10.8535L.146554 5.85353c-.04649-.04643-.08337-.10158-.10853-.16228-.02516-.06069-.03811-.12576-.03811-.19147s.01295-.13077.03811-.19147c.02516-.06069.06204-.11584.10853-.16228l5-.999997c.06993-.0700052.15906-.117689.2561-.13701419.09704-.01932521.19764-.0094229.28905.02845329.09141.0378763.16953.1020229.22447.1843199.05493.082297.08421.179044.08414.277991v10.000017c.00007.0989-.02921.1957-.08414.278-.05494.0823-.13306.1464-.22447.1843s-.19201.0478-.28905.0284c-.09704-.0193-.18617-.067-.25609-.137z" />
            </svg>
            <p>Prev</p>
          </motion.button>

          <motion.div 
            className="pagination-section"
            variants={itemVariants}
          >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filteredData?.length || 0}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </motion.div>

          <motion.button
            className="next-btn"
            onClick={() => setCurrentPage(prev => (filteredData && prev < Math.ceil(filteredData.length / postsPerPage)) ? prev + 1 : prev)}
            disabled={currentPage === Math.ceil((filteredData?.length ?? 0) / postsPerPage)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p>Next</p>
            <svg fill="currentColor" height="11" viewBox="0 0 6 11" width="6" xmlns="http://www.w3.org/2000/svg">
              <path d="M.853506.146465l5 5c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147s-.01295.13077-.03811.19147c-.02517.06069-.06205.11584-.10853.16228l-5 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z" />
            </svg>
          </motion.button>
        </motion.section>
      )}
    </motion.article>
  );
}
