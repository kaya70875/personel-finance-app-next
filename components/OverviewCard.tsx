import React from 'react'
import '@components/styles/_OverviewCard.scss'
import Image from 'next/image';
import billImage from '@public/assets/images/icon-recurring-bills.svg';
import { formatCurrency } from '@utils/helpers';
import { motion } from 'framer-motion';

interface OverviewCardProps {
  cardHeader: string;
  cardPrice: number;
  isActive?: boolean;
  hasImage?: boolean;
  loading?: boolean;
}

const OverviewCard = ({ cardHeader, cardPrice, isActive, hasImage, loading }: OverviewCardProps) => {
  return (
    <motion.div 
      className={`overview-card-wrapper ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Loading...
        </motion.div>
      ) : (
        <>
          {hasImage && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Image
                src={billImage}
                alt='bill'
                width={48}
                height={48} 
              />
            </motion.div>
          )}
          <motion.header 
            className="overview-card-header-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {cardHeader}
          </motion.header>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {formatCurrency(cardPrice)}
          </motion.h1>
        </>
      )}
    </motion.div>
  )
}

export default OverviewCard
