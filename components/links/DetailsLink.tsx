import Link from 'next/link'
import React from 'react'
import rightArrow from '@public/assets/images/icon-caret-right.svg';
import Image from 'next/image';

export default function DetailsLink({href} : {href : string}) {
    return (
        <>

            <Link href={href}>See Details <span style={{ marginLeft: '.75em' }}>
                <Image src={rightArrow}
                    width={10}
                    height={10}
                    alt="right-arrow"
                /></span></Link>
        </>
    )
}
