import EditDropdown from '@components/dropdowns/EditDropdown';
import { Pots } from '../../types/finance';
import InfoCardHeader from './atomic/InfoCardHeader';
import './styles/_PotCard.scss';
import ModalClassic from './modal/ModalClassic';
import { useState } from 'react';
import Modal from './Modal';
import PotActions from '@components/reusables/PotActions';
import { formatCurrency, formatPercentage } from '@utils/helpers';
import { convertThemeToString } from '@utils/colors';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

interface PotCardProps {
  pot: Pots;
  loading?: boolean;
}

export default function PotCard({ pot, loading }: PotCardProps) {
  const { name, target, total, _id, theme } = pot;
  const [isModalOpen, setIsModalOpen] = useState({
    moneyModal: false,
    withdrawModal: false,
  });

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen({
      moneyModal: false,
      withdrawModal: false,
    });
  };

  let progressBarWidth = (total / target) * 100;

  return (
    <motion.div 
      className="pot-wrapper"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <InfoCardHeader category={name} theme={theme}>
          {loading ? (
            <Skeleton width={100} height={10} />
          ) : (
            <EditDropdown category={name} id={_id} type={'Pot'}>
              <ModalClassic cardType="pot" id={_id} actionType="update" name={name} price={target} theme={convertThemeToString(theme)} />
            </EditDropdown>
          )}
        </InfoCardHeader>
      </motion.div>

      <motion.div 
        className="pot-details"
        variants={itemVariants}
      >
        <div className="pot-details-info">
          <p>Total Saved</p>
          {loading ? (
            <Skeleton width={80} height={30} />
          ) : (
            <motion.h2
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {formatCurrency(total)}
            </motion.h2>
          )}
        </div>
        {loading ? (
          <Skeleton width="100%" height={10} />
        ) : (
          <div className="progress-bar" style={{ height: '10px' }}>
            <motion.div 
              className="progress" 
              style={{ backgroundColor: theme }}
              initial={{ width: 0 }}
              animate={{ width: `${progressBarWidth}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        )}
        <motion.div 
          className="progress-bar-info"
          variants={itemVariants}
        >
          {loading ? (
            <Skeleton width={40} height={20} />
          ) : (
            <h5>{formatPercentage(progressBarWidth)}</h5>
          )}
          {loading ? (
            <Skeleton width={80} height={20} />
          ) : (
            <p>Target of ${target}</p>
          )}
        </motion.div>
      </motion.div>

      <motion.section 
        className="pot-buttons-wrapper"
        variants={itemVariants}
      >
        {loading ? (
          <div className="sk-buttons" style={{width: '100%', display: 'flex', gap: '4rem'}}>
            <div className="sk-button-1" style={{width: '100%'}}>
              <Skeleton width={'100%'} height={'4rem'} />
            </div>
            <div className="sk-button-2" style={{width: '100%'}}>
              <Skeleton width={'100%'} height={'4rem'} />
            </div>
          </div>
        ) : (
          <>
            <motion.button 
              className="add-button add-button--light" 
              onClick={() => setIsModalOpen({ ...isModalOpen, moneyModal: true })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Add Money
            </motion.button>
            <motion.button 
              className="add-button add-button--light" 
              onClick={() => setIsModalOpen({ ...isModalOpen, withdrawModal: true })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Withdraw
            </motion.button>
          </>
        )}
      </motion.section>

      <Modal 
        isPopped={isModalOpen.moneyModal} 
        onClose={handleCloseModal} 
        modalHeaderText={`Add to '${name}'`} 
        modalDesc="Add your savings to reach your ultimate goal. Keep going I believe you can accomplish this."
      >
        <PotActions actionType="add" _id={_id} target={target} total={total} />
      </Modal>

      <Modal 
        isPopped={isModalOpen.withdrawModal} 
        onClose={handleCloseModal} 
        modalHeaderText={`Withdraw from '${name}'`} 
        modalDesc="Withdraw from your savings to betray yourself for not reaching your ultimate goal. Keep going like this and you will be broke soon."
      >
        <PotActions actionType="withdraw" _id={_id} target={target} total={total} />
      </Modal>
    </motion.div>
  );
}
