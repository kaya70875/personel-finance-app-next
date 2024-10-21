import React from 'react'
import '@components/styles/_OverviewCard.scss'

interface OverviewCardProps {
    cardHeader : string;
    cardPrice : number;
    isActive? : boolean;
}

const OverviewCard = ({cardHeader , cardPrice , isActive} : OverviewCardProps) => {
  return (
    <div className={`overview-card-wrapper ${isActive ? 'active' : ''}`}>
        <header className="overview-card-header-section">
            {cardHeader}
        </header>
        <h1>{cardPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
    </div>
  )
}

export default OverviewCard
