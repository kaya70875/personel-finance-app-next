import './_global.scss';
import TransactionsComponent from '@components/cards/TransactionsComponent'

const Transactions = () => {

  return (
    <main className="transactions">
      <header className="page-header">
        <h1>Transactions</h1>
      </header>
      <TransactionsComponent transactionFilters={true} />
    </main>
  )
}

export default Transactions