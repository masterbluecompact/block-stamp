# blockstamp

## Description
blockstamp is a tool that gets the block number that is closest (floor) to a given timestamp using binary search.

## Installation

`npm i "@t0mcr8se/blockstamp"`

## Usage

```ts
import {getBlockByTimestamp, getParallelBlocks} from "@t0mcr8se/blockstamp"
import Web3 from "web3"

const main = async() =>{
  const fuseWeb3 = new Web3(new Web3.providers.HttpProvider("https://rpc.fuse.io"))
  const sometime = 1622892258
  const fuseBlock = await getBlockByTimestamp(fuseWeb3, sometime)

  console.log(`${sometime} : ${fuseBlock.timestamp} : ${fuseBlock.number}`)

  const bscWeb3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"))
  // get the block on bsc that coincides with block `fuseBlock` on fuse (parallel block)
  const bscBlock = await getParallelBlocks(fuseWeb3, bscWeb3, fuseBlock.number) 

  console.log(`${bscBlock.timestamp} : ${bscBlock.number}`)
  console.log(`${fuseBlock.timestamp} : ${fuseBlock.number}`)
}
main.then()
```

## Credits
to me)

## License
[MIT](https://github.com/masterbluecompact/block-stamp/blob/main/LICENSE)