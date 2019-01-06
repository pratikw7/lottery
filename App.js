import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
     manager:'', players: [], bal: '', value:'', message:''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const bal = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, bal});
  }
  onSubmit = async(event) =>{
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();

    this.setState({message:'Waiting to add you...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    });
    this.setState({message:'You Entered!'});
  };

  onClick = async() =>{
    const accounts = await web3.eth.getAccounts();
  this.setState({message:'Waiting to pick...'});
  await lottery.methods.pickWinner().send({
    from: accounts[0]
  });
  this.setState({message:'Winner picked!'});
  };
  render() {
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}
        </p>
        <p>There are currently {this.state.players} people entered,
        </p>
        <p>There are competing to win {web3.utils.fromWei(this.state.bal, 'ether')} ether!
        </p>
        <p>
        <hr />
        <form onSubmit = {this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
             value = {this.state.value}
             onChange = {event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
          </form>
          <hr />
          <h4>Ready to pick winner?</h4>
          <button onClick = {this.onClick}>Pick a winner!</button>
        </p>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
