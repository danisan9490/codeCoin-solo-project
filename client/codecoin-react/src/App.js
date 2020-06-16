import React, { useState } from 'react';
import './App.css';
import ApiService from './ApiService';

import NavBar from './components/NavBar/navBar';
import NewUserForm from './components/Banking/newUser/newUserForm';
import GetBalanceForm from './components/Banking/Balance/balanceForm';
import AddTransaction from './components/Banking/TransacForm/transactionForm';
import MineBlock from './components/Banking/mineBlock/mineblock';
import Balance from './components/Banking/Balance/balance';

function App() {

  const [state, setState] = useState([]);
  // useEffect(() => {
  //   ApiService.getEvents()
  //     .then(events => setEvents(events));
  // }, [])

  function generateUser(body) {
    ApiService.generateUser(body)
    // .then(event => setEvents((events) => [...events, event]));
  }
  function generateTransaction(body) {
    ApiService.generateTransaction(body)
    // .then(event => setEvents((events) => [...events, event]));
  }
  function mineBlock(body) {
    ApiService.mineBlock(body)
      .then(alert("block mined"));
  }
  function getBalance(body) {
    ApiService.getBalance(body)
      .then(state => (setState(state)));
  }

  return (
    <div className="App">
      <NavBar />
      <NewUserForm generateUser={generateUser} />
      <GetBalanceForm getBalance={getBalance} />
      <Balance state={state} />
      <AddTransaction generateTransaction={generateTransaction} />
      <MineBlock mineBlock={mineBlock} />
    </div>
  );
}

export default App;
