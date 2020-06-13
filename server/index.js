const express = require('express');
const bodyParser = require('body-parser');
const Peer = require('./p2p-Server');

const app = express();
const PORT = parseFloat(process.env.PORT);
app.use(bodyParser.json());

const Blockchain = require('./blockChain/blockChain');
const Transaction = require("./blockChain/transaction");
const codeCoin = new Blockchain();

const peerServer = new Peer(PORT + 1, codeCoin);
app.get('/blocks', (req, res) => {
  res.json(codeCoin);
})

app.post('/mine', (req, res) => {
  codeCoin.mineNewBlock(req.body.minerAddress);
  console.log('New block added:', codeCoin.chain[codeCoin.chain.length - 1]);
  console.log('New reward added:', codeCoin.pendingTransactions);

  peerServer.sendChain();
  res.redirect('/blocks')
})


app.post('/addtrans', (req, res) => {
  codeCoin.addTransaction(new Transaction(req.body.fromAddress, req.body.toAddress, req.body.amount));
  console.log('Last transaction added:', codeCoin.pendingTransactions[codeCoin.pendingTransactions.length - 1]);
  peerServer.sendChain();
  res.redirect('/blocks')
})
// console.log(JSON.stringify(codeCoin, null, 6));


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});


//  PORT=4000 nodemon index.js