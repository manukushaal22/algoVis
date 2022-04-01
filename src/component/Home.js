import {Component} from "react";
import Visualizer from "./visualizer/Visualizer";
import Help from "./help/Help";
import Editor from "./editor/Editor";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            program: ""
        };
    }

    triggerVisuals = (code_string) => {
        this.setState({
            program: code_string
        });
    }

    render() {
        return (
            <div style={{display: 'flex', width: "100%", height: "100vh", backgroundColor:"green"}}>
                <div style={{width: "60%"}}>
                    <Visualizer program={this.state.program}/>
                </div>
                <div style={{width: "40%", resize:"horizontal"}}>
                    <div>
                        <Help/>
                    </div>
                    <div>
                        <Editor visuals_trigger={this.triggerVisuals}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;