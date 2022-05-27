import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import Home from "./component/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylingTab: false,
            speed: -5
        };
    }

    render() {
    return (
        <div className="App">
        <nav className="navbar fixed-top navbar-dark bg-dark" style={{height: 45}}>
            <a className="navbar-brand" href="#" style={{
                paddingLeft:20,
                fontSize:20,
                marginBottom:10
            }}>AlgoVis</a>
            <div>
                <label style={{"color":"white", paddingBottom: 15, marginRight: 10}}>Speed</label>
                <input type="range" className="form-range" min="-1505" max="-5" step="50" id="speed"
                       onChange={()=>{this.setState({speed: document.getElementById("speed").value})}} style={{width:200, paddingTop: 10}} />
            </div>

            <form action="https://docs.google.com/document/d/1qfv-EPGBOCkneQRbURvS_p_iKA8lfKGQ5YEMYM4YP_Q/" target="_blank">
                <button href="#" className={"btn btn-sm btn-outline-light" } style={{
                    marginRight: -450,
                    marginBottom:20
                }} >
                    Documentation
                </button>
            </form>
            <button href="#" className={"btn btn-sm " +(this.state.stylingTab?"btn-success":"btn-outline-light") } style={{
                marginRight: 20,
                marginBottom:20
            }} onClick={() => {this.setState({stylingTab: !this.state.stylingTab})}}>
                Styling
            </button>

            
        </nav>
          <Home styling={this.state.stylingTab} speed={this.state.speed} />
        </div>
    );
    }
}

export default App;
