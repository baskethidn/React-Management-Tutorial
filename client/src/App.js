import './App.css';
import React, {Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


/*
  React 순서
  1) constructor()
  2) componentWillMount()
  3) render()
  4) compoentDidMount()
*/

/*
props or state => shouldComponentUpdate()
*/

const styles = theme => ({
  root : {
    with: '100%',
    marginTop : theme.spacing(4), 
    overflowX : "auto"
  },
  table : {minWidth: 1080},
  progress : {
    margin :theme.spacing(3)
  }
})

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      customers : '',
      completed : 0
    }
  }

  stateRefresh = () =>
  {
    this.setState(
      {
        customers : '',
        completed : 0
      }
    );
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }
  
     
  componentDidMount()
  {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0  : completed + 1});
  }

  render()
  {
    const {classes} = this.props
    return (
      <div>
      <Paper className = {classes.root}>
        <Table className = {classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.customers ? this.state.customers.map(c => { return (
                <Customer key={c.id} id ={c.id} image ={c.image} name= {c.name} birthday={c.birthday} gender={c.gender} job={c.job} />   
          ); 
          }) : 
              <TableRow>
                <TableCell colSpan="6" aligin="center"></TableCell>
                <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed}></CircularProgress>
              </TableRow>}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

// class App extends Component {
//   render()
//   {
//     return (
//       <div>
//         {
//           customers.map(c => {
//               return (
//                 <Customer 
//                 key={c.id}
//                 id ={c.id}
//                 image ={c.image}
//                 name= {c.name}
//                 birthday={c.birthday}
//                 gender={c.gender}
//                 job={c.job} />    
//               );
//           })
//         }
//       </div>
//     );
//   }
// }

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

export default withStyles(styles)(App);
