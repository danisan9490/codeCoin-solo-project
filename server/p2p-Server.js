var swarm = require('discovery-swarm')
const crypto = require('crypto')
const defaults = require('dat-swarm-defaults')

class Peer {
  sendChain() {
    const peers = Object.values(this.peers);
    peers.forEach(peer => {
      peer.conn.write(JSON.stringify(this.blockchain));
    });
  }

  constructor(port, blockchain) {
    this.blockchain = blockchain;
    this.peers = [];
    this.connSeq = 0;
    console.log('Starting P2P...')
    const myId = crypto.randomBytes(32);
    console.log('Your identity: ' + myId.toString('hex'))

    var config = defaults({
      id: myId
    })

    var sw = swarm(config);

    sw.listen(port);
    sw.join("########"); // can be any id/name/hash

    sw.on("connection", (conn, info) => {
      const seq = this.connSeq;
      const peerId = info.id.toString('hex')

      console.log("connected from ", peerId);

      conn.on("data", (data) => {
        console.log(JSON.parse(data));
      });

      conn.on("close", () => {
        if (this.peers[peerId].seq === seq) {
          delete this.peers[peerId]
        }
      });

      if (!this.peers[peerId]) {
        this.peers[peerId] = {}
      }
      this.peers[peerId].conn = conn;
      this.peers[peerId].seq = seq;
      this.connSeq++
    });

  }
}

module.exports = Peer;


