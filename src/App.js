import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import Home from "./component/Home";

class App extends Component {
  render() {
    return (
        <div className="App">
          <Home></Home>
        </div>
    );
  }
}

export default App;
