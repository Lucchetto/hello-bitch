import React from 'react';
import logo from './logo.svg';
import './App.css';
import Potato from './components/potato/Potato';
import TicTacToeBoard from './components/TicTacToeBoard/TicTacToeBoard';

function App() {
  return (
    <div className="App">
      <Potato text="asdsadasd" />
      <TicTacToeBoard />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
