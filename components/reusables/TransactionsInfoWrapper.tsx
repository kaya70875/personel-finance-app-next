import { Transactions } from '../../types/finance';
import Image from 'next/image';
import TransactionsInfoRecur from './TransactionsInfoRecur';
import { formatCurrency } from '@utils/helpers';
import Skeleton from 'react-loading-skeleton'; // Ensure this is imported
import 'react-loading-skeleton/dist/skeleton.css';

interface TransactionsInfoWrapperProps {
    currentPosts: Transactions[];
    isRecurring?: boolean;
    loading?: boolean;
}

export default function TransactionsInfoWrapper({ currentPosts, isRecurring = false, loading }: TransactionsInfoWrapperProps) {
    return (
        <>
            {loading ? (
                <div className="transactions-info-wrapper">
                    <Skeleton width={'64px'} height={'64px'} circle />
                    <div className="transaction-sender-info">
                        <Skeleton width={'120px'} height={'20px'} />
                        <Skeleton width={'80px'} height={'15px'} />
                    </div>
                    <Skeleton width={'100%'} height={'20px'} />
                    <Skeleton width={'80%'} height={'15px'} />
                    <Skeleton width={'100px'} height={'20px'} />
                    <Skeleton width={'80px'} height={'15px'} />
                </div>
            ) : (
                currentPosts?.map((transaction, index) => (
                    <div className='transactions-info-wrapper' key={index}>
                        <div className="transaction-sender">
                            <Image
                                src={transaction.avatar.replace('.', '')}
                                alt={transaction.name}
                                width={48}
                                height={48}
                                className='avatar'
                            />

                            <div className="transaction-sender-info">
                                <h4>{transaction.name}</h4>
                                <h5>{transaction.category}</h5>
                            </div>
                        </div>

                        <div className="transaction-middle">
                            {isRecurring ? (
                                <TransactionsInfoRecur transaction={transaction} />
                            ) : (
                                <>
                                    <h5>{transaction.category}</h5>
                                    <h5>{new Date(transaction.date).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}</h5>
                                </>
                            )}
                        </div>

                        <div className="transaction-amount">
                            <h4 style={transaction.amount > 0 ? { color: '#277C78' } : { color: '#201F24' }}>
                                {transaction.amount > 0 ? '+' : ''}
                                {formatCurrency(transaction.amount)}
                            </h4>
                            <h5 className='date-q'>{new Date(transaction.date).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}</h5>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
