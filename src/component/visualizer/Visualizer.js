import {Component} from "react";
import ReactDOM from 'react-dom';
import Graph from './Graph.js'

class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.result = "";
    }

    processProgram = (program) => {
        try {
            document.getElementById("container").innerHTML ="";
            let graph = new Graph();
            this.result = eval(program);
        } catch (err) {
            console.log("Invalid Syntax");
        }
    }

    render() {
        return (
            <div style={{backgroundColor: 'mintcream', height: "100%"}}>
                <p style={{whiteSpace: "pre-wrap"}}>
                    <svg width="200" height="200" id = "container">

                    </svg>
                </p>
                <button onClick={() => this.processProgram(this.props.program)}>Run</button>
            </div>
        );
    }
}

export default Visualizer;