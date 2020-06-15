import React from 'react';
import './App.css';

function App() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    ApiService.getEvents()
      .then(events => setEvents(events));
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
