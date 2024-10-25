import InfoCardHeader from './atomic/InfoCardHeader';
import './styles/_PotCard.scss';

interface PotCardProps {
  category: string;
  cardTheme: string;
  total: number;
  target : number
}

export default function PotCard({ category, cardTheme, total , target }: PotCardProps) {

  let progressBarWidth = (total / 1000) * 100;

  return (
    <div className="pot-wrapper">
      <InfoCardHeader category={category} cardTheme={cardTheme} />
      <div className="pot-details">
        <div className="pot-details-info">
          <p>Total Saved</p>
          <h2>${total}</h2>
        </div>
        <div className="progress-bar" style={{ height: '10px' }}>
          <div className="progress" style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: cardTheme }}></div>
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
