import Web3 from 'web3'
import { BlockTransactionString } from 'web3-eth'
import promiseRetry from 'promise-retry'

export const getBlock = async (web3: Web3, blockNumber: number): Promise<BlockTransactionString> =>
  promiseRetry(async (retry : any) => {
    const result = await web3.eth.getBlock(blockNumber)
    if (!result) {
      return retry('Error getting block data')
    }
    return result
  })

export const getBlockByTimestamp = async (web3: Web3, timestamp: number|string): Promise<BlockTransactionString> =>{
  // get the closest block to a given timestamp with binary search
  let lo = await getBlock(web3, 0),
      hi = await getBlock(web3, await web3.eth.getBlockNumber())

  if(typeof timestamp === 'string') timestamp = parseInt(timestamp)

  if(lo.timestamp > timestamp){
    throw "time cannot be before first block"
  } else if(hi.timestamp <= timestamp){
    return hi
  }
  while (lo.number < hi.number){
    let mid = await getBlock(web3, (lo.number + hi.number + 1)>>1)
    if(timestamp >= mid.timestamp){
      lo = mid
    } else {
      hi = await getBlock(web3, mid.number - 1)
    }
  }
  return lo;
} 

export const getParallelBlocks = async (sourceWeb3:Web3, destWeb3:Web3, blockNumber:number) : Promise<BlockTransactionString> =>{
  let knownBlock = await getBlock(sourceWeb3, blockNumber + 1) // blockNumber + 1; because getBlockByTimestamp returns the lowerbound block for a given timestamp
  return await getBlockByTimestamp(destWeb3, knownBlock.timestamp)
}