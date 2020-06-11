
const Block = require('./block');
const BlockChain = require('./blockChain');
const Transaction = require('./transaction');

let codeCoin = new BlockChain();


console.log(JSON.stringify(codeCoin, null, 6));