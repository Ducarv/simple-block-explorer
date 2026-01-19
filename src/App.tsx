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

  const formatUnixToDate = (time: number) => {
    return new Date(time * 1000)
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
            <div className='block-data-container'>
              <div className='block-infos'>
                <span>Hash: {block?.hash}</span>
                <p>Height: {block?.height}</p>
                <p>Fee: {block.fee} sats</p>
                <span>Previous block: {block.prev_block}</span>
                <span>Merkle root: {block.mrkl_root}</span>
                <p>Nonce: {block.nonce}</p>
                <p>Size: {block.size} Bytes</p>
                <p>Time: {String(formatUnixToDate(block.time).toLocaleDateString('en-US'))}</p>
              </div>
              <img src="../public/bitcoin-btc-logo.svg" alt="bitcoin-logo" />
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
