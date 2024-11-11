import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './_OverviewSkeleton.scss'

interface OverviewSkeletonProps {
    height : string;
    count? : number | 0;
}

export default function OverviewSkeleton({height , count} : OverviewSkeletonProps) {
  return (
    <div className="skeleton-overview-wrapper">
        <Skeleton width={'100%'} height={height} count={count} style={{display : "flex"}} baseColor="#e0e0e0" highlightColor="#f0f0f0" />
    </div>
  )
}
