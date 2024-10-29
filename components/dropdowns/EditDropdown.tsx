'use client';

import './_EditDropdown.scss';
import './_Dropdown.scss';
import Image from 'next/image';
import editButton from '@public/assets/images/icon-ellipsis.svg';
import { useState } from 'react';
import useDelete from '@hooks/useDelete';

interface EditDropdownProps {
    header: string;
    id : string;
    type : string;
}

export default function EditDropdown({ header , id , type}: EditDropdownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const { deleteItem } = useDelete();

    const handleOpen = () => {
        setIsOpen(prev => (!prev));
    }

    const handleDelete = () => {
        deleteItem(id , type);
        window.location.reload();
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
                        <p className='red' onClick={handleDelete}>Delete {header}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
