'use client';

import './_EditDropdown.scss';
import './_Dropdown.scss';
import Image from 'next/image';
import editButton from '@public/assets/images/icon-ellipsis.svg';
import { useState } from 'react';
import useDelete from '@hooks/useDelete';
import Modal from '@components/cards/Modal';

interface EditDropdownProps {
    header: string;
    id : string;
    type : string;
}

export default function EditDropdown({ header , id , type}: EditDropdownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [isPopped , setIsPopped] = useState(false);
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
                        <p className='red' onClick={() => setIsPopped(true)}>Delete {header}</p>
                    </li>
                </ul>
            </div>
            {isPopped && (
                <Modal modalHeaderText={`Delete '${header}' ?`} modalDesc={`Are you sure you want to delete this ${header} ? This action cannot be reversed , and all the
                data inside it will be removed forever.`} onClose={setIsPopped}>
                    <button onClick={handleDelete} className="card-delete">Yes , Confirm Deletion</button>
                    <button onClick={() => setIsPopped(false)} className="card-back">No , Go Back</button>
                </Modal>
            )}
        </div>
    )
}