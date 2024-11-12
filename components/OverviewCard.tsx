import React from 'react'
import '@components/styles/_OverviewCard.scss'
import Image from 'next/image';

import billImage from '@public/assets/images/icon-recurring-bills.svg';
import { formatCurrency } from '@utils/helpers';

interface OverviewCardProps {
    cardHeader : string;
    cardPrice : number;
    isActive? : boolean;
    hasImage? : boolean;
    loading? : boolean;
}

const OverviewCard = ({cardHeader , cardPrice , isActive , hasImage , loading} : OverviewCardProps) => {
  return (
    <div className={`overview-card-wrapper ${isActive ? 'active' : ''}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
          <h1>{formatCurrency(cardPrice)}</h1>
        </>
      )}
    </div>
  )
}

export default OverviewCard
