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
    let fromAddPendingBalance = this.getPendingBalanceFromAddress(transaction.fromAddress);
    let newBalance = fromAddBalance - fromAddPendingBalance;

    if (newBalance < transaction.amount) return console.log('Sorry, you do not have enough money. Try to mine the next block to get more codeCoins.');
    else return this.pendingTransactions.push(transaction);
  }

  mineNewBlock(minerAddress) {

    if (this.validateBlockChain() === true) {

      /* -- MINING THE BLOCK --*/
      console.log(`Block validation: ${this.validateBlockChain()}`);
      console.log(`Mining the block...`);

      let date = new Date(Date.now());
      let oldHash = this.chain[this.chain.length - 1];
      let block = new Block(date.toString(), this.pendingTransactions);
      block.previousHash = oldHash.hash;
      block.mineBlock(this.difficulty);

      /* -- ADD REWARD TO MINERADDRESS -- */
      this.chain.push(block);
      this.pendingTransactions = [
        new Transaction('codeCoin reward', minerAddress, this.miningReward)
      ];

      /* -- CHANGE DIFFICULTY --*/
      const previousDate = Date.parse(block.timestamp);
      const newDate = Date.parse(oldHash.timestamp);
      if ((previousDate + 60000) < newDate && this.difficulty > 1) 'this.difficulty--';
      else this.difficulty++;
      console.log(`New difficulty: ${this.difficulty}`);

    } else {
      console.log(`Mining the block...`);
      console.log(`Error, Block validation: ${this.validateBlockChain()}`);
    }
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

  getPendingBalanceFromAddress(address) {
    let pendingBalanceFromAddress = 0;
    for (const transaction of this.pendingTransactions) {
      if (transaction.fromAddress === address) pendingBalanceFromAddress += transaction.amount;
    }
    return pendingBalanceFromAddress;
  }

  getPendingBalanceToAddress(address) {
    let pendingBalanceToAddress = 0;
    for (const transaction of this.pendingTransactions) {
      if (transaction.toAddress === address) pendingBalanceToAddress += transaction.amount;
    }
    return pendingBalanceToAddress;
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

  // replaceChain(newChain) {
  //   if (newChain.length <= this.chain.length) {
  //     console.log('Recived change shorter than current chain');
  //   } else if (!this.validateBlockChain(newChain)) {
  //     console.log('New chain not valid');
  //   } else {
  //     console.log('Replacing current chain for newchain');
  //     this.chain = newChain;
  //   }
  // }

}

module.exports = BlockChain;