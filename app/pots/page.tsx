'use client';

import Modal from '@components/cards/Modal';
import './_global.scss';
import PotCard from '@components/cards/PotCard';
import useFetch from '@hooks/useFetch';
import { useState } from 'react';
import Dropdown from '@components/dropdowns/Dropdown';
import { colors } from '@utils/colors';
import useAdd from '@hooks/useAdd';

export default function page() {

    const { data, error, loading } = useFetch();
    const { handleAddCard } = useAdd();

    const potsData = data?.potsData ?? [];

    const [isPopped, setIsPopped] = useState(false);
    const [potData, setPotData] = useState({
        name: '',
        target: 0,
        theme: '',
    })
    
    const handleAddPot = () => {
        handleAddCard(potData , 'addPot' , setIsPopped);
    }

    const handleClick = () => {
        setIsPopped(prev => !prev);
    }

    return (
        <div className="home">
            <header className="page-header">
                <h1>Pots</h1>
                <button className="add-button" onClick={handleClick}>+ Add New Pot</button>
                {isPopped && (
                    <Modal modalHeaderText='Pot' modalDesc='Create a pot to set savings targets. These can help keep you on track with your savings goals.' onClose={setIsPopped}>
                        <div className="inputs-wrapper">
                            <div className="modal-input">
                                <label>Pot Name</label>
                                <input type="text" placeholder='e.g Vacation Fund' className='modal-input-item' onChange={(e) => setPotData({
                                    ...potData,
                                    name: e.target.value,
                                })} />

                                <label>Target</label>
                                <input type="numeric" placeholder='$ e.g.2000' className='modal-input-item' onChange={(e) => setPotData({
                                    ...potData,
                                    target: parseInt(e.target.value),
                                })} />

                                <label>Theme</label>
                              <Dropdown buttonName={
                                    'Choose a color'
                                }>
                                    {Object.entries(colors).map(([colorName, colorValue]) => (
                                        <li key={colorName} className='color-option' onClick={() => setPotData({
                                            ...potData,
                                            theme: colorValue,
                                        })}>
                                            <div className='ellipse' style={{ backgroundColor: colorValue }}></div>
                                            <p>{colorName}</p>
                                        </li>
                                    ))}
                                </Dropdown>
                            </div>
                        </div>
                        <button className="add-button" onClick={handleAddPot}>Add Pot</button>
                    </Modal>
                )}
            </header>
            <div className="pots-wrapper">
                {potsData.map((pot, index) => (
                    <PotCard
                        key={index}
                        category={pot.name}
                        cardTheme={pot.theme}
                        total={pot.total}
                        target={pot.target}
                        id={pot._id}
                    />
                ))}
            </div>
        </div>
    )
}
