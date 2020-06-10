
const Block = require('./block');
const BlockChain = require('./blockChain')
const Transaction = require('./transaction')

let codeCoin = new BlockChain()

// codeCoin.validateBlockChain()
codeCoin.mineNewBlock('Dani')
codeCoin.mineNewBlock('Dani')

// codeCoin.addTransaction(new Transaction('Dani', 'Juan', 20))
codeCoin.getBalanceOfAddress('Dani')


// console.log(JSON.stringify(codeCoin, null, 6))


