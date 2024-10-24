import { Transactions } from '../../types/finance';
import Image from 'next/image';

interface TransactionsInfoWrapperProps {
    currentPosts: Transactions[];
}

export default function TransactionsInfoWrapper({ currentPosts } : TransactionsInfoWrapperProps) {
    return (
        <>
            {currentPosts?.map((transaction, index) => (
                <div className='transactions-info-wrapper' key={index}>
                    <div className="transaction-sender">
                        <Image
                            src={transaction.avatar.replace('.', '')}
                            alt={transaction.name}
                            width={48}
                            height={48}
                            className='avatar'
                        />
                        <h4>{transaction.name}</h4>
                    </div>

                    <div className="transaction-middle">
                        <h5>{transaction.category}</h5>
                        <h5>{new Date(transaction.date).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}</h5>
                    </div>

                    <div className="transaction-amount">
                        <h4 style={transaction.amount > 0 ? { color: '#277C78' } : { color: '#201F24' }}>
                            ${transaction.amount}
                        </h4>
                        <h5 className='date-q'>{new Date(transaction.date).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}</h5>
                    </div>
                </div>
            ))}
        </>
    )
}
