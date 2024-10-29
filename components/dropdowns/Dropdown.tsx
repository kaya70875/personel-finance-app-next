'use client';

import Image from 'next/image';
import './_Dropdown.scss';

import arrowDown from '@public/assets/images/icon-caret-down.svg';
import { ReactNode, useState } from 'react';

interface DropdownProps {
    buttonName: string | ReactNode;
    children : ReactNode;
}

export default function Dropdown({ buttonName , children }: DropdownProps) {

    const [isOpen , setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(prev => (!prev));
    }

    return (
        <div className="dropdown" onClick={handleOpen}>
            <div className="dropdown-button-wrapper">
                <button className="dropdown-btn">{buttonName}</button>
                <Image 
                src={arrowDown}
                alt='arrow'
                width={12}
                height={12}
                />
            </div>
            <div className={`dropdown-menu ${isOpen ? 'active' : ''}`}>
                <ul className="dropdown-items">
                    {children}
                </ul>
            </div>
        </div>
    )
}
