import React from 'react';
import './App.css';
import Calendar from './Components/Calendar'
import Modal from './Components/Modal'
function App() {
  return (
    <div className="App" >
     <img src={require('./images/logo-large.png')} width='300' />
     
<Calendar />
    </div>
  );
}

export default App;
