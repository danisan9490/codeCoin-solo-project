
const Block = require('./block');
const BlockChain = require('./blockChain');
const Transaction = require('./transaction');

let codeCoin = new BlockChain();

/* -- ACTIONS -- */
// codeCoin.mineNewBlock('Dani');
// codeCoin.getBalanceOfAddress('Dani');
// codeCoin.addTransaction(new Transaction('Dani', 'Juan', 20));


/* -- TESTING IF I CHANGE THE AMOUNT -- */
// console.log(`####################### ${JSON.stringify(codeCoin.chain[2].transactions[0].amount, null, 4)}`);
// codeCoin.mineNewBlock('Dani');
// codeCoin.mineNewBlock('Dani');
// codeCoin.chain[2].transactions[0].amount = 1000;
// console.log(`Dani tries to hack the system and increase the amount: ${codeCoin.getBalanceOfAddress('Dani')}`);
// codeCoin.mineNewBlock('Dani');
// codeCoin.chain[2].transactions[0].amount = 50;
// console.log(`Dani has to return the money :( The amount now is: ${codeCoin.getBalanceOfAddress('Dani')}`);
// console.log('Now Dani is sad... ');
// console.log(`####################### ${JSON.stringify(codeCoin.chain, null, 4)}`);
// codeCoin.mineNewBlock('Dani');

/* -- TESTING IF SEND MONEY -- */
// codeCoin.mineNewBlock('Dani');
// codeCoin.addTransaction(new Transaction('Dani', 'Juan', 20));
// console.log(`Dani balance: ${codeCoin.getBalanceOfAddress('Dani')}`);
// codeCoin.mineNewBlock('Dani');
// codeCoin.addTransaction(new Transaction('Dani', 'Juan', 20));
// codeCoin.mineNewBlock('Dani');

// console.log(`Juan balance: ${codeCoin.getBalanceOfAddress('Juan')}`);
// console.log(`Dani balance: ${codeCoin.getBalanceOfAddress('Dani')}`);


console.log(JSON.stringify(codeCoin, null, 6));