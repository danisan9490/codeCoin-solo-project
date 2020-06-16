const Block = require('./block');
const Transaction = require("./transaction");
const User = require("../wallet/createUser");
const SHA256 = require("crypto-js/sha256");


class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 1;
    this.pendingTransactions = [];
    this.miningReward = 50;
    this.usersPublicKeys = [];
  }

  createGenesisBlock() {
    let date = new Date(Date.now());
    return new Block(date.toString(), 'Genesis Block', '0');
  }

  generateUser(name, userName, password) {
    let newUser = new User();
    newUser.createUser(name, userName, password);

    if (this.usersPublicKeys.indexOf(newUser.publickey) >= 0) return console.log("User already exists.");
    this.usersPublicKeys.push(newUser.publickey);

    console.log('Your Public Key is: ', newUser.publickey);
    console.log('Your Private Key is: ', newUser.privateKey);
  }

  addTransaction(fromAddressPublicKey, toAddressPublicKey, amount, fromAddressPrivateKey) {
    if (fromAddressPublicKey === toAddressPublicKey) return console.log("Invalid transaction ")
    /*-- CHECK IF THE USER EXIST --*/
    if (this.usersPublicKeys.indexOf(toAddressPublicKey) >= 0) {
      let fromAddBalance = this.getBalanceOfAddress(fromAddressPublicKey);
      let fromAddPendingBalance = this.getPendingBalanceFromAddress(fromAddressPublicKey);
      let newBalance = fromAddBalance - fromAddPendingBalance;
      /*-- CHECK USER BALANCE --*/
      if (newBalance < amount) {
        return console.log('Sorry, you do not have enough money. Try to mine the next block to get more codeCoins.');

      } else {
        /*-- CHECKING SIGNATURE AND ADDING TRANSACTION--*/
        if (SHA256(fromAddressPrivateKey).toString() === fromAddressPublicKey) {
          let newTrans = new Transaction(fromAddressPublicKey, toAddressPublicKey, amount)
          this.pendingTransactions.push(newTrans)
          return console.log('Last transaction added:', newTrans);
        } else return console.log('Private key does not match with public key.');
      }

    } else return console.log('toAddressPublicKey does not exist.');
  }

  mineNewBlock(publicMinerAddress) {
    if (this.validateBlockChain() === true) {
      if (this.usersPublicKeys.indexOf(publicMinerAddress) >= 0) {
        /* -- MINING THE BLOCK --*/
        console.log(`Block validation: ${this.validateBlockChain()}`);
        console.log('Mining the block...');

        let date = new Date(Date.now());
        let oldHash = this.chain[this.chain.length - 1];
        let block = new Block(date.toString(), this.pendingTransactions);
        block.previousHash = oldHash.hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        console.log('New block added:', block);

        /* -- ADD REWARD TO publicMinerAddress -- */
        this.pendingTransactions = [
          new Transaction('codeCoin reward', publicMinerAddress, this.miningReward)
        ];
        console.log('New reward added:', this.pendingTransactions);

        /* -- CHANGE DIFFICULTY --*/
        // const previousDate = Date.parse(block.timestamp);
        // const newDate = Date.parse(oldHash.timestamp);
        // if ((previousDate + 60000) < newDate && this.difficulty > 1) this.difficulty--;
        // else this.difficulty++;
        // console.log(`New difficulty: ${this.difficulty}`);

      } else return console.log("This Public Key does not exist.");

    } else {
      console.log(`Mining the block...`);
      console.log(`Error, Block validation: ${this.validateBlockChain()}.`);
    }
  }

  getBalanceOfAddress(publicKey) {
    let balance = 0;
    if (this.usersPublicKeys.indexOf(publicKey) >= 0) {
      for (const block of this.chain) {
        for (const transaction of block.transactions) {
          if (transaction.fromAddressPublicKey === publicKey) balance -= transaction.amount;
          if (transaction.toAddressPublicKey === publicKey) balance += transaction.amount;
        }
      }

    } else return console.log("This Public Key does not exist.");

    console.log("Your balance is: ", balance);
    return balance;
  }

  getPendingBalanceFromAddress(publicKey) {
    let pendingBalanceFromAddress = 0;
    for (const transaction of this.pendingTransactions) {
      if (transaction.fromAddressPublicKey === publicKey) pendingBalanceFromAddress += transaction.amount;
    }
    return pendingBalanceFromAddress;
  }

  getPendingBalanceToAddress(publicKey) {
    let pendingBalanceToAddress = 0;
    if (this.usersPublicKeys.indexOf(publicKey) >= 0) {
      for (const transaction of this.pendingTransactions) {
        if (transaction.toAddressPublicKey === publicKey) pendingBalanceToAddress += transaction.amount;
      }

    } else return;
    console.log("Your pending balance is: ", pendingBalanceToAddress);
    return pendingBalanceToAddress;
  }

  getHistoryOfAddress(publicKey) {
    if (this.usersPublicKeys.indexOf(publicKey) >= 0) {
      // const transHistory = [];
      // const balance = 0;
      console.log("");
      console.log("-------------- COMPLETED TRANSACTIONS -------------------");
      for (const block of this.chain) {
        for (const transaction of block.transactions) {
          if (transaction.fromAddressPublicKey === publicKey) {
            // balance -= transaction.amount;
            // transHistory.push([transaction.toAddressPublicKey, balance]);
            // balance = 0;
            console.log("To:", transaction.toAddressPublicKey);
            console.log("Amount: -", transaction.amount);
            console.log("---------------");
          }
          if (transaction.toAddressPublicKey === publicKey) {
            // balance += transaction.amount;
            // transHistory.push([transaction.fromAddressPublicKey, balance]);
            // balance = 0;
            console.log("From:", transaction.fromAddressPublicKey);
            console.log("Amount: +", transaction.amount);
            console.log("---------------");
          }
        } //return transHistory;
      }
    } else return;
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