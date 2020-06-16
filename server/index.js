const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Peer = require('./p2p-Server');

const app = express();
const PORT = parseFloat(process.env.PORT);
app.use(cors());
app.use(bodyParser.json());

const Blockchain = require('./blockChain/blockChain');
const codeCoin = new Blockchain();
const peerServer = new Peer(PORT + 1, codeCoin);


app.get('/balance/:publicKey', async (req, res) => {
  try {
    const balance = codeCoin.getBalanceOfAddress(req.params.publicKey);
    const pendingBalance = codeCoin.getPendingBalanceToAddress(req.params.publicKey);
    // const transHistory = codeCoin.getHistoryOfAddress(req.params.publicKey);
    res.status(200);
    res.json({ balance, pendingBalance });
    console.log({ balance, pendingBalance });

  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
  // res.json(codeCoin);
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


//  PORT=3001 nodemon index.js
//  PORT=4000 nodemon index.js