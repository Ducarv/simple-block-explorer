export interface BlockProps {
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

export interface Transaction {
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

export interface Input {
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

export interface SpendingOutpoint {
  tx_index: number
  n: number
}

export interface Out {
  type: number
  spent: boolean
  value: number
  spending_outpoints: SpendingOutpoint[]
  n: number
  tx_index: number
  script: string
  addr: string
}