'use client';

import './_EditDropdown.scss';
import './_Dropdown.scss';
import Image from 'next/image';
import editButton from '@public/assets/images/icon-ellipsis.svg';
import { useState } from 'react';

interface EditDropdownProps {
    header: string;
}

export default function EditDropdown({ header }: EditDropdownProps) {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(prev => (!prev));
    }

    return (
        <div className='edit-dropdown' onClick={handleOpen}>
            <div className="edit-dropdown-button-wrapper">
                <Image
                    src={editButton}
                    alt="Edit"
                    width={12}
                    height={12}
                />
            </div>

            <div className={`edit-dropdown-menu ${isOpen ? 'active' : ''}`}>
                <ul className="edit-dropdown-items">
                    <li className="edit-dropdown-item">
                        <p>Edit {header}</p>
                        <p className='red'>Delete {header}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
