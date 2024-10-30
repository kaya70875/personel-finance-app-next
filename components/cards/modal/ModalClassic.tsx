import Dropdown from '@components/dropdowns/Dropdown';
import { Transactions } from '../../../types/finance';
import { colors } from '@utils/colors';
import { getUniqueCategories } from '@utils/helpers';
import React, { useState } from 'react'

interface ModalClassicProps {
    transactionsData: Transactions[];
    category : string;
    theme : string;
    maximum : number;
}

export default function ModalClassic({ transactionsData , category , maximum ,theme}: ModalClassicProps) {

    const uniqueCategories = getUniqueCategories(transactionsData);

    const [activeDropdownItem , setActiveDropdownItem] = useState({
        budgetCategory : category,
        budgetTheme : theme,
      });

    return (
        <>
            <div className="inputs-wrapper">
                <div className="modal-input">
                    <label>Budget Category</label>
                    <Dropdown buttonName={activeDropdownItem.budgetCategory}>
                        {uniqueCategories.map(category => (
                            <li className='dropdown-item' key={category} onClick={() => {
                                setActiveDropdownItem({
                                    ...activeDropdownItem,
                                    budgetCategory : category,
                                })
                            }}>
                                <p>{category}</p>
                            </li>
                        ))}
                    </Dropdown>

                    <label htmlFor="spend">Maximum Spend</label>
                    <input type="numeric" value={maximum} placeholder='$ e.g.2000' className='modal-input-item' />

                    <label>Theme</label>
                    <Dropdown buttonName={
                        theme
                    }>
                        {Object.entries(colors).map(([colorName, colorValue]) => (
                            <li key={colorName} className='color-option'>
                                <div className='ellipse' style={{ backgroundColor: colorValue }}></div>
                                <p>{colorName}</p>
                            </li>
                        ))}
                    </Dropdown>
                </div>
            </div>
            <button className="add-button">Save Changes</button>
        </>
    )
}
