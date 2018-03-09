import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const comma = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {
  state = {};

  componentWillMount(){
    axios.get('http://localhost:3030/prices').then((res) => {
      res.data.currentPrice = comma(res.data.currentPrice);
      res.data.yesterdayPrice = comma(res.data.yesterdayPrice);
      res.data.priceDifference = comma(res.data.priceDifference);
      res.data.priceDifference = res.data.priceDifference.substr(0, 1) + '$' + res.data.priceDifference.substr(1);
      this.setState(res.data);
    });
  }

  render() {
    return (
      <div className="App"> 
        
        <div className="title">BITCOIN PRICE</div>
        <div className="price">${this.state.currentPrice}</div>
        <div className="different">SINCE YESTERDAY</div>
        <div className="price">{this.state.priceDifference}</div>
      </div>
    );
  }
}

export default App;


