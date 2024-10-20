import './styles/_CardVisuals.scss';

interface CardVisualsProps {
    cardVisualColor: string;
    cardHeader: string;
    cardPrice: number;
}

const CardVisuals = ({ cardVisualColor, cardHeader, cardPrice }: CardVisualsProps) => {
  return (
    <div className='card-visual-container' style={{'--card-visual-color': cardVisualColor} as React.CSSProperties}>
        <div className="card-visual-info">
            <p>{cardHeader}</p>
            <h4>${cardPrice}</h4>
        </div>
    </div>
  )
}

export default CardVisuals
