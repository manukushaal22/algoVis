import {Component} from "react";
import ReactDOM from 'react-dom';
import {Graph, GraphDefault} from './Graph.js'
import {Array} from "./Array";
import {Timer,Styles, DebugQueue} from './common'

class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.result = "";
        this.state = {
            running: false,
            debug: false
        }
        this.queue = [];
    }

    processProgram = (program, debug=false) => {
        try {
            if(program !== undefined){
                this.setState({
                    running: true
                })
            }
            document.getElementById("container").innerHTML = ` <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M 0 0 4 2 0 4 1 2" fill="#f00" />
                            </marker>
                        </defs>`;
            let GraphNode = Graph;
            let GraphDefaultNode = GraphDefault;
            let ArrayBox = Array;
            Timer.timer = 200
            Timer.unit = -this.props.speed
            let style = JSON.parse(this.props.style)
            Styles.node_color = style.node.color || "blue"
            Styles.edge_color = style.edge.color || "red"
            Styles.node_size = style.node.size || 20
            Styles.node_padding = style.node.padding || 50
            Styles.ele_color = style.array.color || "#002B36"
            Styles.arr_txt_color = style.array.txt_color || "#93A1A1"
            DebugQueue.debug = debug;
            DebugQueue.queue = []
            this.result = eval(program);
            if(DebugQueue.queue.length > 0){
                this.setState({
                    debug: true
                })
            }
            this.queue = DebugQueue.queue;
            document.getElementById("errorBox").innerHTML = "";
            document.getElementById("errorBox").hidden = true;
        } catch (err) {
            document.getElementById("errorBox").innerHTML = err;
            document.getElementById("errorBox").hidden = false;
            console.log(err)
        }
        let this_obj = this;
        setTimeout(function (){
            if(!debug)
                document.getElementById("reset").disabled = false;
            document.getElementById("vis").disabled = false;
            if(program !== undefined){
                this_obj.setState({
                    running: false
                })
            }
        }, Timer.timer)
    }

    cancel = () => {
        let id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        this.processProgram();
        this.setState({
            running: false,
            debug: false
        })
        this.queue = [];
    }

    consumeQueueAction = () => {
        let action = this.queue.shift();
        action();
        if(this.queue.length == 0){
            document.getElementById("reset").disabled = false;
            this.setState({
                debug: false
            })
        }
    }

    render() {
        return (
            <div style={{backgroundColor: 'mintcream', height: "100%"}}>
                {/*<p style={{whiteSpace: "pre-wrap"}}>*/}
                    <svg width="100%" height="80%" id = "container" style={{
                        backgroundColor:"lightgrey"
                    }}>
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" textAnchor="center" >
                            <text x="0" y="2">h</text>
                               <path d="M 0 0 4 2 0 4 1 2" fill="#f00" />
                            </marker>
                        </defs>

                    </svg>

                <button hidden={this.state.debug} className={"btn btn-lg btn-warning"} style={{
                    marginLeft:200,
                    marginBottom:20,
                    marginTop: 10
                }}onClick={() => {
                    document.getElementById("reset").disabled = true;
                    document.getElementById("vis").disabled = true;
                    this.processProgram(this.props.program, true);
                }} id="dbg">Debug</button>

                <button hidden={!this.state.debug} className={"btn btn-lg btn-success"} style={{
                    marginLeft:100,
                    marginBottom:20,
                    marginTop: 10
                }}onClick={() => {
                    document.getElementById("reset").disabled = true;
                    this.consumeQueueAction();
                }} id="nxt">Next</button>

                <button hidden={this.state.running || this.state.debug} id ="vis" className={"btn btn-lg btn-success"} style={{
                    marginLeft: 100,
                    marginBottom: 20,
                    marginTop: 10
                }} onClick={() => {
                    document.getElementById("reset").disabled = true;
                    document.getElementById("vis").disabled = true;
                    this.processProgram(this.props.program);
                }}>
                    Visualize
                </button>
                <button hidden={!(this.state.running || this.state.debug)} id ="vis" className={"btn btn-lg btn-warning"} style={{
                    marginLeft: 100,
                    marginBottom: 20,
                    marginTop: 10,
                }} onClick={() => {
                    this.cancel();
                }}>
                    Cancel
                </button>
                <button className={"btn btn-lg btn-danger"} style={{
                    marginLeft:100,
                    marginBottom:20,
                    marginTop: 10
                }}onClick={() => this.processProgram()} id="reset">Reset</button>
                <div id = "errorBox" hidden={true} style={{
                    color: '#D8000C',
                    backgroundColor: '#FFD2D2',
                    padding: 5
                }}>
                </div>
            </div>
        );
    }
}

export default Visualizer;
