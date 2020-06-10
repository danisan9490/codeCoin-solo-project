const Block = require('./block');
const Transaction = require("./transaction");

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 1;
    this.pendingTransactions = [];
    this.miningReward = 50;
  }

  createGenesisBlock() {
    let date = new Date(Date.now());
    return new Block(date.toString(), 'Genesis Block', '0');
  }

  addTransaction(transaction) {
    let fromAddBalance = this.getBalanceOfAddress(transaction.fromAddress);
    if (fromAddBalance === 0) return console.log('Sorry, your balance is 0. Try to mine the next block to get codeCoins');
    else if (fromAddBalance < transaction.amount) return console.log('Sorry, you do not have enough money. Try to mine the next block yo get more codeCoins');
    else this.pendingTransactions.push(transaction);
  }

  mineNewBlock(minerAddress) {
    //mining the block
    let date = new Date(Date.now());
    let oldHash = this.chain[this.chain.length - 1];
    let block = new Block(date.toString(), this.pendingTransactions);
    block.previousHash = oldHash.hash;
    block.mineBlock(this.difficulty);
    console.log('Block successfully mined');

    //add reward to minerAdress
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction('codeCoin, thank you for mining the block', minerAddress, this.miningReward)
    ];

    //change difficulty
    // console.log(Date.parse(oldHash.timestamp))
    // console.log(Date.parse(block.timestamp))
    const previousDate = Date.parse(block.timestamp);
    const newDate = Date.parse(oldHash.timestamp);
    if ((previousDate + 60000) < newDate && this.difficulty > 1) 'this.difficulty--';
    else this.difficulty++;
    console.log(this.difficulty);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) balance -= transaction.amount;
        if (transaction.toAddress === address) balance += transaction.amount;
      }
    }
    return balance;
  }

  validateBlockChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;
      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }
    return true;
  }

}

module.exports = BlockChain;