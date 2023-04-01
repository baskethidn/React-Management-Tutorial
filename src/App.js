import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component {
  render()
  {
    return (
      <div className="gray-background">
          <img src={logo} alt="logo" />
          <h2>
            Let's develop menagement system!
          </h2>
      </div>
    );
  }
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello React Project!
        </p>
      </header>
    </div>
  );
} */

export default App;
