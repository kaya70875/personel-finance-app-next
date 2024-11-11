import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './_OverviewSkeleton.scss'

export default function BudgetCardSkeleton() {
    return (
        <div className="budget-card-skeleton-wrapper" style={{ width: '100%' }}>
            <div className="bills-skeleton">
                <div className="bills-ellipse">
                    <Skeleton width={'48px'} circle height={'48px'} />
                </div>
                <div className="bills-text" style={{ width: '100%' }}>
                    <Skeleton width={'100%'} height={'2rem'} />
                </div>
            </div>

            <div className="max-progress-skeleton">
                <Skeleton width={'100%'} height={'2rem'} count={2} />
            </div>

            <div className="skeleton-visuals">
                <div className="sk-visual-left">
                    <Skeleton width={'100%'} height={'5rem'} />
                </div>
                <div className="sk-visual-right">
                    <Skeleton width={'100%'} height={'5rem'} />
                </div>
            </div>
        </div>
    )
}
