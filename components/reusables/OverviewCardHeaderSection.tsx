import DetailsLink from '@components/links/DetailsLink'
import OverviewSkeleton from '@components/skeletons/OverviewSkeleton'
import React from 'react'

interface OverviewCardHeaderSectionProps {
    loading: boolean;
    href: '/budgets' | '/transactions' | '/recurrings' | '/pots';
    name: 'Budgets' | 'Transactions' | 'Recurring Bills' | 'Pots';
}

export default function OverviewCardHeaderSection({loading , href , name} : OverviewCardHeaderSectionProps) {
    return (
        <>
            {loading ? (
                <OverviewSkeleton height="2rem" />
            ) : (
                <>
                    <h3>{name}</h3>
                    <DetailsLink href={href} />
                </>
            )}
        </>
    )
}
