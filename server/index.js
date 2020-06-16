const express = require('express');
const bodyParser = require('body-parser');
const Peer = require('./p2p-Server');

const app = express();
const PORT = parseFloat(process.env.PORT);
app.use(bodyParser.json());

const Blockchain = require('./blockChain/blockChain');
const codeCoin = new Blockchain();
const peerServer = new Peer(PORT + 1, codeCoin);


app.get('/balance/:publicKey', (req, res) => {
  codeCoin.getBalanceOfAddress(req.params.publicKey);
  codeCoin.getPendingBalanceToAddress(req.params.publicKey);
  codeCoin.getHistoryOfAddress(req.params.publicKey)
  res.json(codeCoin);
})

app.post('/user', (req, res) => {
  codeCoin.generateUser(req.body.name, req.body.userName, req.body.password);
  peerServer.sendChain();
  res.redirect('/balance');
})

app.post('/mine', (req, res) => {
  codeCoin.mineNewBlock(req.body.publicMinerAddress);
  peerServer.sendChain();
  res.redirect('/balance');
})


app.post('/addtrans', (req, res) => {
  codeCoin.addTransaction(req.body.fromAddressPublicKey, req.body.toAddressPublicKey, req.body.amount, req.body.fromAddPrivateKey);
  peerServer.sendChain();
  res.redirect('/balance');
})


// console.log(JSON.stringify(codeCoin, null, 6));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});


//  PORT=4000 nodemon index.js