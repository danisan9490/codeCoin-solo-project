const SHA256 = require("crypto-js/sha256");

class User {
  constructor() {
    this.publickey = "";
    this.privateKey = "";
  }

  createUser(name, userName, password) {

    this.privateKey = SHA256(name + userName + password).toString();
    this.publickey = SHA256(SHA256(name + userName + password).toString()).toString();

  }

}


module.exports = User;
