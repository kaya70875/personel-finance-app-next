'use client';

import Modal from '@components/cards/Modal';
import './_global.scss';
import PotCard from '@components/cards/PotCard';
import useFetch from '@hooks/useFetch';
import ModalClassic from '@components/cards/modal/ModalClassic';
import { useState } from 'react';

export default function page() {

    const { data, error, loading } = useFetch();

    const potsData = data?.potsData ?? [];

    const [isPopped, setIsPopped] = useState(false);

    const handleClick = () => {
        setIsPopped(prev => !prev);
    }

    return (
        <div className="home">
            <header className="page-header">
                <h1>Pots</h1>
                <button className="add-button" onClick={handleClick}>+ Add New Pot</button>
                <Modal isPopped={isPopped} modalHeaderText='Pot' modalDesc='Create a pot to set savings targets. These can help keep you on track with your savings goals.' onClose={setIsPopped}>
                    <ModalClassic actionType='add' setIsPopped={setIsPopped} cardType='pot' />
                </Modal>
            </header>
            <div className="pots-wrapper">
                {potsData.map((pot, index) => (
                    <PotCard
                        key={index}
                        pot={pot}
                        loading={loading}
                    />

                ))}
            </div>
        </div>
    )
}
