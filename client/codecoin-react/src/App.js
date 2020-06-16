import React from 'react';
import './App.css';
import ApiService from './ApiService';

import NavBar from './components/NavBar/navBar';
import NewUserForm from './components/Banking/newUser/newUserForm';
import GetBalanceForm from './components/Banking/Balance/balanceForm';
import AddTransaction from './components/Banking/TransacForm/transactionForm';
import MineBlock from './components/Banking/mineBlock/mineblock';

function App() {

  // const [events, setEvents] = useState([]);
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
    // .then(event => setEvents((events) => [...events, event]));
  }
  function getBalance(body) {
    ApiService.getBalance(body)
    // .then(event => setEvents((events) => [...events, event]));
  }

  return (
    <div className="App">
      <NavBar />
      <NewUserForm generateUser={generateUser} />
      <GetBalanceForm getBalance={getBalance} />
      <AddTransaction generateTransaction={generateTransaction} />
      <MineBlock mineBlock={mineBlock} />
    </div>
  );
}

export default App;
