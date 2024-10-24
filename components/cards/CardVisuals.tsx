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
              <h3>${cardSpend}
              </h3>
              <p>
                of ${cardPrice}
              </p>
            </>

          ) : (
            <h3>${cardPrice}</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardVisuals;
