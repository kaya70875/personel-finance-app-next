import Link from 'next/link'
import React from 'react'
import SvgIcon from '@components/reusables/SvgIcon';

interface DetailsLinkProps {
    href: string;
    header? : string;
}

export default function DetailsLink({href , header = 'See Details'} : DetailsLinkProps) {
    return (
        <>
            <Link href={href}>{header}<span style={{ marginLeft: '.75em' }}>
                <SvgIcon path='caret-right'/></span></Link>
        </>
    )
}