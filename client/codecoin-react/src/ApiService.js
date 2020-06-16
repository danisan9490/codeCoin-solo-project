const BASE_URL = "http://localhost:4000";

// function getEvents() {
//   return fetchRequest('/events');
// }

function generateUser(body) {
  return fetchRequest('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}
function generateTransaction(body) {
  return fetchRequest('/addtrans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

function mineBlock(body) {
  return fetchRequest('/mine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

function getBalance(publicKey, dir) {
  return fetchRequest(`/balance/${publicKey}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
}

function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => {
      console.log(err);
    });
}

export default {
  generateUser,
  generateTransaction,
  getBalance,
  mineBlock
}