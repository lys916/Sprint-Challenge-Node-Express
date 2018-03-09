import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
const newPost = {
    title: "Title from react app",
    contents: "lskjdfsd"
  }

class App extends Component {
  state = { posts:[], prices: [] };

  getPost = () => {
    axios.get('http://localhost:3030/posts').then((res) => {
      console.log(res.data.results);
      this.setState({ posts: res.data.results });
    });
  }

  addPost = () => {
    axios.post('http://localhost:3030/posts', newPost).then((res) => {
      console.log(res);
    });
  }

  getPrices = () => {
    axios.get('http://localhost:3030/prices').then((res) => {
      let prices = Object.keys(res.data).map((key) => {
        return {name: key, price: res.data[key].USD};
      });
      this.setState({prices: prices});
      });
  }

  componentDidMount(){
    this.getPrices();
    setInterval(() => {
      this.getPrices();
    }, 10000);
  }

  render() {

    return (
      <div className="App">
        <div className="buttons">
          <button onClick={() => {this.getPost()}}>Get Posts</button>
          <button onClick={() => {this.addPost()}}>Add Post</button>
        </div>
        <div className="posts">
          {this.state.posts.map((post) => {
            return (
              <div className="post">
                <div>{post.name}</div>

              </div>
            );
          })}
           {this.state.prices.map((price) => {
              return (
              <div>
                <div className="price"></div>
                <div>{price.name} : {price.price}</div>
              </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;


