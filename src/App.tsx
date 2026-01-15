import { useState } from 'react'
import './App.css'

interface BlockProps {
  hash: string
  ver: number
  prev_block: string
  mrkl_root: string
  time: number
  bits: number
  next_block: number[]
  fee: number
  nonce: number
  n_tx: number
  size: number // Bytes
  block_index: number
  main_chain: boolean
  height: number
  weight: number
  tx: Transaction[]
}

interface Transaction {
  hash: string
  ver: number
  vin_sz: number
  vout_sz: number
  size: number
  weight: number
  fee: number
  relayed_by: string
  lock_time: number
  tx_index: number
  double_spend: number
  time: number
  block_index: number
  block_height: number
  inputs: Input[]
  out: Out[]
}

interface Input {
  sequence: number
  witness: string
  script: string
  index: number
  prev_out: {
    type: number
    spent: boolean
    value: number
    spending_outpoints: SpendingOutpoint[]
    n: number
    tx_index: number
    script: string
  }
}

interface SpendingOutpoint {
  tx_index: number
  n: number
}

interface Out {
  type: number
  spent: boolean
  value: number
  spending_outpoints: SpendingOutpoint[]
  n: number
  tx_index: number
  script: string
  addr: string
}

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
