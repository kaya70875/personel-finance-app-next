import EditDropdown from '@components/dropdowns/EditDropdown';
import { Pots } from '../../types/finance';
import InfoCardHeader from './atomic/InfoCardHeader';
import './styles/_PotCard.scss';
import ModalClassic from './modal/ModalClassic';

interface PotCardProps {
  pot: Pots;
}

export default function PotCard({ pot }: PotCardProps) {

  const { name, target, total, _id, theme } = pot;
  let progressBarWidth = (total / target) * 100;

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
          <h2>${total}</h2>
        </div>
        <div className="progress-bar" style={{ height: '10px' }}>
          <div className="progress" style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: theme }}></div>
        </div>
        <div className="progress-bar-info">
          <p>{progressBarWidth}%</p>
          <p>Target of ${target}</p>
        </div>
      </div>

      <section className="pot-buttons-wrapper">
        <button className="add-button add-button--light">+ Add Money</button>
        <button className="add-button add-button--light">Withdraw</button>
      </section>

    </div>
  )
}
