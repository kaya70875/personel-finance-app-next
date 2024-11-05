import { formatCurrency } from '@utils/helpers';
import './styles/_CardVisuals.scss';

interface CardVisualsProps {
  cardVisualColor: string;
  cardHeader: string;
  cardPrice: number;
  cardSpend?: number;
  isFullPage?: boolean;
}

const CardVisuals = ({ cardVisualColor, cardHeader, cardPrice, cardSpend, isFullPage }: CardVisualsProps) => {
  return (
    <div className={`card-visual-container ${isFullPage ? 'card-visual-container--main' : ''}`} style={{ '--card-visual-color': cardVisualColor } as React.CSSProperties}>
      <div className="card-visual-info">
        <p>{cardHeader}</p>
        <div className="card-extra-info">
          {isFullPage ? (
            <>
              <h4>{formatCurrency(cardSpend || 0)}
              </h4>
              <p>
                of {formatCurrency(cardPrice)}
              </p>
            </>

          ) : (
            <h4>{formatCurrency(cardPrice)}</h4>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardVisuals;
