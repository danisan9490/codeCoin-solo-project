class Transaction {
  constructor(fromAddressPublicKey, toAddressPublicKey, amount) {
    this.fromAddressPublicKey = fromAddressPublicKey;
    this.toAddressPublicKey = toAddressPublicKey;
    this.amount = amount;
  }
}

module.exports = Transaction;