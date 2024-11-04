'use client';

import './_EditDropdown.scss';
import './_Dropdown.scss';
import Image from 'next/image';
import editButton from '@public/assets/images/icon-ellipsis.svg';
import { useState } from 'react';
import Modal from '@components/cards/Modal';
import useCardActions from '@hooks/useCardActions';
interface EditDropdownProps {
    type: string;
    id: string;
    category: string;
    children: React.ReactNode;
}

export default function EditDropdown({ type, id, category, children }: EditDropdownProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [deletePop, setDeletePop] = useState(false);
    const [editPop, setEditPop] = useState(false);
    const { handleDeleteCard } = useCardActions();

    const handleOpen = () => {
        setIsOpen(prev => (!prev));
    }

    const handleDelete = () => {
        if (id) {
            handleDeleteCard(id, type.toLowerCase());
        }
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
                        <p onClick={() => setEditPop(true)}>Edit {category}</p>
                        <p className='red' onClick={() => setDeletePop(true)}>Delete {category}</p>
                    </li>
                </ul>
            </div>

            {/* Delete Modal */}
            <Modal isPopped={deletePop} modalHeaderText={`Delete '${category}' ?`} modalDesc={`Are you sure you want to delete this ${category} ? This action cannot be reversed , and all the
                data inside it will be removed forever.`} onClose={setDeletePop}>
                <button onClick={handleDelete} className="card-delete">Yes , Confirm Deletion</button>
                <button onClick={() => setDeletePop(false)} className="card-back">No , Go Back</button>
            </Modal>

            {/* Edit Modal */}
            <Modal isPopped={editPop} modalHeaderText={`Edit ${category}`} modalDesc={`As your ${type}s change , feel free to update your spending limits.`} onClose={setEditPop}>
                {children}
            </Modal>
        </div>
    )
}