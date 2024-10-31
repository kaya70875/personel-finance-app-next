import useUpdate from '@hooks/useUpdate';
import React, { useState } from 'react'

interface PotActionsProps {
    total: number;
    target: number;
    _id : string;
    actionType : 'add' | 'withdraw';
}

export default function PotActions({ total, target , _id , actionType}: PotActionsProps) {

    const { handleUpdateCard } = useUpdate();

    const [newAmount, setNewAmount] = useState(0);

    let progressBarWidth = (total / target) * 100;
    let newAmountBarWidth = (newAmount / target) * 100;

    const handleClick = () => {
        let newTotal;

        if(actionType === 'add') {
            newTotal = total + newAmount;
        } else {
            newTotal = total - newAmount;
        }

        handleUpdateCard({ total: newTotal }, _id, 'pot');
    }
    return (
        <>
            <div className="new-amount">
                <p>New Amount</p>
                <h2>${actionType === 'add' ? (total + newAmount || total) : (total - newAmount)}</h2>
            </div>

            <div className='progress-bar' style={{ height: '10px' }}>
                <div className="progress" style={{ width: `${progressBarWidth.toString()}%`, backgroundColor: '#201F24' }}></div>
                <div className="progress" style={{ width: `${newAmountBarWidth.toString()}%`, backgroundColor: actionType === 'add' ? '#277C78' : '#C94736', borderRadius: '0 10px 10px 0' }}></div>
            </div>

            <div className="progress-info">
                {actionType === 'add' ? (
                    <h4>{(newAmount / target) * 100 || 0}%</h4>
                ) : (
                    <h4 style={{color : '#C94736'}}>{(newAmount / target) * 100 || 0}%</h4>
                )}
                
                <h5>Target of ${target}</h5>
            </div>

            <label>Amount to Add</label>
            <input type="text" className="modal-input-item" onChange={(e) => setNewAmount(
                parseInt(e.currentTarget.value),
            )} />

            <button className="add-button" onClick={handleClick}>{actionType === 'add' ? 'Confirm Addition' : 'Confirm Withdrawal'}</button>
        </>
    )
}
