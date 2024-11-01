import useCardActions from '@hooks/useCardActions';
import { formatCurrency, formatPercentage } from '@utils/helpers';
import React, { useState } from 'react';

interface PotActionsProps {
    total: number;
    target: number;
    _id: string;
    actionType: 'add' | 'withdraw';
}

export default function PotActions({ total, target, _id, actionType }: PotActionsProps) {
    const { handleUpdateCard } = useCardActions();
    const [newAmount, setNewAmount] = useState(0);

    const isAddition = actionType === 'add';
    const progressBarColor = isAddition ? '#277C78' : '#C94736';

    const calculateNewTotal = () => isAddition ? total + newAmount : total - newAmount;
    const calculateNewAmountBarWidth = () => (newAmount / target) * 100;

    const handleClick = () => {
        handleUpdateCard({ total: calculateNewTotal() }, _id, 'pot');
    };

    return (
        <>
            <div className="new-amount">
                <p>New Amount</p>
                <h2>{formatCurrency(calculateNewTotal())}</h2>
            </div>

            <div className='progress-bar' style={{ height: '10px' }}>
                <div className="progress" style={{ width: `${(total / target) * 100}%`, backgroundColor: '#201F24' }}></div>
                <div className="progress" style={{ width: `${formatPercentage(calculateNewAmountBarWidth())}`, backgroundColor: progressBarColor, borderRadius: '0 10px 10px 0' }}></div>
            </div>

            <div className="progress-info">
                <h4 style={{ color: isAddition ? undefined : '#C94736' }}>{formatPercentage(calculateNewAmountBarWidth()) || 0}</h4>
                <h5>Target of ${target}</h5>
            </div>

            <label>Amount to {isAddition ? 'Add' : 'Withdraw'}</label>
            <input
                type="text"
                className="modal-input-item"
                onChange={(e) => setNewAmount(parseInt(e.currentTarget.value) || 0)}
            />

            <button className="add-button" onClick={handleClick}>
                {isAddition ? 'Confirm Addition' : 'Confirm Withdrawal'}
            </button>
        </>
    );
}
