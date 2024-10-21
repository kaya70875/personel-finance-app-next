import Link from 'next/link'
import React from 'react'
import rightArrow from '@public/assets/images/icon-caret-right.svg';
import Image from 'next/image';

interface DetailsLinkProps {
    href: string;
    header? : string;
}

export default function DetailsLink({href , header = 'See Details'} : DetailsLinkProps) {
    return (
        <>

            <Link href={href}>{header}<span style={{ marginLeft: '.75em' }}>
                <Image src={rightArrow}
                    width={10}
                    height={10}
                    alt="right-arrow"
                /></span></Link>
        </>
    )
}
