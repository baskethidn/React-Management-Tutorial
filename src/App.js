import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';

const customers = [
  {
    'id' : 1,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '나동빈',
    'birthday' : '961222',
    'gender' : '남자',
    'job' : '대학생'
  },
  {
    'id' : 2,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '홍길동',
    'birthday' : '981222',
    'gender' : '남자',
    'job' : '프로그래머'
    },
  {
    'id' : 3,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '한소희',
    'birthday' : '960305',
    'gender' : '남자',
    'job' : '연예인'
  }      
]

class App extends Component {
  render()
  {
    return (
      <div>
        {
          customers.map(c => {
              return (
                <Customer 
                key={c.id}
                id ={c.id}
                image ={c.image}
                name= {c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job} />    
              );
          })
        }
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
