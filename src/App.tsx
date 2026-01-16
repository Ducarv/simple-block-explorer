import { useState } from 'react'
import './App.css'
import type { BlockProps } from './types/Block';

function App() {
  const [block, setBlock] = useState<BlockProps | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchBlock = async (formData: FormData) => {
    const hash = formData.get('hash')

    if(!hash) return;

    setLoading(true)

    const response = await fetch(`https://blockchain.info/rawblock/${hash}`)
    const data = await response.json();
    setBlock(data as unknown as BlockProps);
    setLoading(false)
  }

  return (
    <>
      <form action={fetchBlock}>
        <div className='search-div'>
          <input name='hash'  className='hash-input' placeholder='block hash'/>
          <button type='submit' disabled={loading} className='search-btn'>
            {loading ? 'Loading...' : 'Find'}
          </button>
        </div>
      </form>

      <div className='main-block-div'>
        <div className='block-info-div'>
          <h2>Block information</h2>
          {block && (
            <div className='block-infos'>
              <span>Hash: {block?.hash}</span>
              <p>Height: {block?.height}</p>
              <span>Previous block: {block.prev_block}</span>
              <p>Merkle root: {block.mrkl_root}</p>
            </div>
          )}
        </div>

        <div className='block-transactions'>
          <h2>Transactions</h2>
          {block && (
            <div className='transactions-infos'>
              <span>Total: {block?.n_tx}</span>
            </div>
          )}
          <div className='transactions-list'>
            {block?.tx && (
              block.tx.map((tx) => (
                <div className='transaction-data'>
                  <span>Hash: {tx.hash}</span>
                  <p>Amount: {tx.inputs[0].prev_out.value - tx.fee}</p>
                  <p>Fee: {tx.fee}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
