import React, { useState } from 'react';
import './App.css';
import ApiService from './ApiService';

import NavBar from './components/NavBar/navBar';
import NewUserForm from './components/Banking/newUser/newUserForm';
import GetBalanceForm from './components/Banking/Balance/balanceForm';
import AddTransaction from './components/Banking/TransacForm/transactionForm';
import MineBlock from './components/Banking/mineBlock/mineblock';

function App() {

  const [stateKeys, setStateKeys] = useState([])
  const [stateBalance, setStateBalance] = useState([]);

  function generateUser(body) {
    ApiService.generateUser(body)
      .then(stateKeys => (setStateKeys(stateKeys)));
  }
  function generateTransaction(body) {
    ApiService.generateTransaction(body)
      .then(alert("Added to Pending Transactions"));
  }
  function mineBlock(body) {
    ApiService.mineBlock(body)
      .then(alert("Block successfully mined"));
  }
  function getBalance(body) {
    ApiService.getBalance(body)
      .then(stateBalance => setStateBalance(stateBalance));
  }

  return (
    <div className="App">
      <NavBar />
      <div>
        <GetBalanceForm
          getBalance={getBalance}
          stateBalance={stateBalance} />
        <AddTransaction generateTransaction={generateTransaction} />
        <NewUserForm
          generateUser={generateUser}
          stateKeys={stateKeys}
        />
      </div>

      <MineBlock mineBlock={mineBlock} />

    </div>
  );
}

export default App;
