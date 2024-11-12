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

  const handleCloseModal = () => {
    setIsModalOpen({
      moneyModal: false,
      withdrawModal: false,
    });
  };

  let progressBarWidth = (total / target) * 100;
  return (
    <div className="pot-wrapper">
      <InfoCardHeader category={name} theme={theme}>
        {loading ? (
          <Skeleton width={100} height={10} />
        ) : (
          <EditDropdown category={name} id={_id} type={'Pot'}>
            <ModalClassic cardType="pot" id={_id} actionType="update" name={name} price={target} theme={convertThemeToString(theme)} />
          </EditDropdown>
        )}
      </InfoCardHeader>

      <div className="pot-details">
        <div className="pot-details-info">
          <p>Total Saved</p>
          {loading ? (
            <Skeleton width={80} height={30} />
          ) : (
            <h2>{formatCurrency(total)}</h2>
          )}
        </div>
        {loading ? (
          <Skeleton width="100%" height={10} />
        ) : (
          <div className="progress-bar" style={{ height: '10px' }}>
            <div className="progress" style={{ width: `${progressBarWidth}%`, backgroundColor: theme }}></div>
          </div>
        )}
        <div className="progress-bar-info">
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
        </div>
      </div>

      <section className="pot-buttons-wrapper">
        {loading ? (
          <div className="sk-buttons" style={{width : '100%' , display : 'flex' , gap : '4rem'}}>
            <div className="sk-button-1" style={{width : '100%'}}>
            <Skeleton width={'100%'} height={'4rem'} />

            </div>
            <div className="sk-button-2" style={{width : '100%'}}>
            <Skeleton width={'100%'} height={'4rem'} />
            </div>
          </div>
        ) : (
          <>
            <button className="add-button add-button--light" onClick={() => setIsModalOpen({ ...isModalOpen, moneyModal: true })}>
              + Add Money
            </button>
            <button className="add-button add-button--light" onClick={() => setIsModalOpen({ ...isModalOpen, withdrawModal: true })}>
              Withdraw
            </button>
          </>
        )}
      </section>

      {/* Modals for adding/withdrawing money */}
      <Modal isPopped={isModalOpen.moneyModal} onClose={handleCloseModal} modalHeaderText={`Add to '${name}'`} modalDesc="Add your savings to reach your ultimate goal. Keep going I believe you can accomplish this.">
        <PotActions actionType="add" _id={_id} target={target} total={total} />
      </Modal>

      <Modal isPopped={isModalOpen.withdrawModal} onClose={handleCloseModal} modalHeaderText={`Withdraw from '${name}'`} modalDesc="Withdraw from your savings to betray yourself for not reaching your ultimate goal. Keep going like this and you will be broke soon.">
        <PotActions actionType="withdraw" _id={_id} target={target} total={total} />
      </Modal>
    </div>
  );
}
