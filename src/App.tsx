import { useState } from 'react'
import './App.css'
import type { BlockProps } from './types/Block';
import btcLogo from "./assets/bitcoin-btc-logo.svg"

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
                <p><strong>Hash: </strong>{block?.hash}</p>
                <p><strong>Height: </strong>{block?.height}</p>
                <p><strong>Fee: </strong>{block.fee} sats</p>
                <p><strong>Previous block: </strong>{block.prev_block}</p>
                <p><strong>Merkle root: </strong>{block.mrkl_root}</p>
                <p><strong>Nonce: </strong>{block.nonce}</p>
                <p><strong>Size: </strong>{block.size} Bytes</p>
                <p><strong>Time: </strong>{formatUnixToDate(block.time).toLocaleDateString('en-US')}</p>
              </div>
              <div className='block-image'>
                <img src={btcLogo} alt="bitcoin-logo" />
              </div>
            </div>
          )}
        </div>

        <div className='block-transactions'>
          <h2>Transactions</h2>
          {block && (
            <div className='transactions-infos'>
              <span><strong>Total: </strong>{block?.n_tx}</span>
            </div>
          )}
          <div className='transactions-list'>
            {block?.tx && (
              block.tx.map((tx) => (
                <div key={tx.hash} className='transaction-data'>
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
