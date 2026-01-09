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
  const [node, setNode] = useState<BlockProps | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchBlock = async (formData: FormData) => {
    const hash = formData.get('hash')

    if(!hash) return;

    setLoading(true)

    const response = await fetch(`https://blockchain.info/rawblock/${hash}`)
    const data = await response.json();
    setNode(data as unknown as BlockProps);
    setLoading(false)
  }

  return (
    <>
      <form action={fetchBlock}>
        <input name='hash' />
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : 'Find'}
        </button>
      </form>

      <div>
        <h1>Node infos</h1>
        <div className='node-div'>
          {node && (
            <div className='node-basic-infos'>
              <p>{node.hash}</p>
              <p>{node.n_tx}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
