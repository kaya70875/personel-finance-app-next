import React from 'react'
import '@components/styles/_OverviewCard.scss'
import Image from 'next/image';

import billImage from '@public/assets/images/icon-recurring-bills.svg';

interface OverviewCardProps {
    cardHeader : string;
    cardPrice : number;
    isActive? : boolean;
    hasImage? : boolean;
}

const OverviewCard = ({cardHeader , cardPrice , isActive , hasImage} : OverviewCardProps) => {
  return (
    <div className={`overview-card-wrapper ${isActive ? 'active' : ''}`}>
        {hasImage && (
          <Image 
          src={billImage}
          alt='bill'
          width={48}
          height={48}/>
        )}
        <header className="overview-card-header-section">
            {cardHeader}
        </header>
        <h1>{cardPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
    </div>
  )
}

export default OverviewCard
