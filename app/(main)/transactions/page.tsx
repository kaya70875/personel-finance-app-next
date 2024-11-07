import './_global.scss';
import TransactionsComponent from '@components/cards/TransactionsComponent'

const Transactions = () => {

  return (
    <div className="home">
      <header className="page-header">
        <h1>Transactions</h1>
      </header>
      <TransactionsComponent transactionFilters={true} 
      sender='Recipient / Sender'
      middle={['Category' , 'Transaction Date']}
      amount='Amount'
      />
    </div>
  )
}

export default Transactions