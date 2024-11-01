import EditDropdown from '@components/dropdowns/EditDropdown';
import { Pots } from '../../types/finance';
import InfoCardHeader from './atomic/InfoCardHeader';
import './styles/_PotCard.scss';
import ModalClassic from './modal/ModalClassic';
import { useState } from 'react';
import Modal from './Modal';
import PotActions from '@components/reusables/PotActions';
import { formatCurrency, formatPercentage } from '@utils/helpers';

interface PotCardProps {
  pot: Pots;
}

export default function PotCard({ pot }: PotCardProps) {

  const { name, target, total, _id, theme } = pot;

  const [isModalOpen, setIsModalOpen] = useState({
    moneyModal: false,
    withdrawModal: false,
  })

  let progressBarWidth = (total / target) * 100;

  const handleCloseModal = () => {
    setIsModalOpen({
      moneyModal: false,
      withdrawModal: false,
    });
  };

  return (
    <div className="pot-wrapper">
      <InfoCardHeader category={name} theme={theme} >
        <EditDropdown category={name} id={_id} type={'Pot'}>
          <ModalClassic cardType='pot' id={_id} actionType='update' name={name} price={target} theme={theme} />
        </EditDropdown>
      </InfoCardHeader>
      <div className="pot-details">
        <div className="pot-details-info">
          <p>Total Saved</p>
          <h2>{formatCurrency(total)}</h2>
        </div>
        <div className="progress-bar" style={{ height: '10px' }}>
          <div className="progress" style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: theme }}></div>
        </div>
        <div className="progress-bar-info">
          <p>{formatPercentage(progressBarWidth)}</p>
          <p>Target of ${target}</p>
        </div>
      </div>

      <section className="pot-buttons-wrapper">
        <button className="add-button add-button--light" onClick={() => setIsModalOpen({ ...isModalOpen, moneyModal: true })}>+ Add Money</button>
        <button className="add-button add-button--light" onClick={() => setIsModalOpen({ ...isModalOpen, withdrawModal: true })}>Withdraw</button>
      </section>

      {isModalOpen.moneyModal && (
        <Modal onClose={handleCloseModal} modalHeaderText={`Add to '${name}'`} modalDesc='Add your savings to reach your ultimate goal. Keep going I believe you can accomplish this.'>
          <PotActions actionType='add' _id={_id} target={target} total={total}/>
        </Modal>
      )}

      {isModalOpen.withdrawModal && (
        <Modal onClose={handleCloseModal} modalHeaderText={`Withdraw from '${name}'`} modalDesc='Withdraw from your savings to betray yourself for not reacing your ultimate goal. Keep going like this and you will be broke soon.'>
          <PotActions actionType='withdraw' _id={_id} target={target} total={total}/>
        </Modal>
      )}

    </div>
  )
}
