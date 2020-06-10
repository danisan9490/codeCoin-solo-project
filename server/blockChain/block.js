const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.counter = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    let trans = JSON.stringify(this.transactions);
    return SHA256(this.timestamp + this.previousHash + trans + this.counter).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.counter++;
      this.hash = this.calculateHash();
    }
    console.log('Mined block: ' + this.hash);
  }
}

module.exports = Block;