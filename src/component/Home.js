import {Component} from "react";
import Visualizer from "./visualizer/Visualizer";
import Editor from "./editor/Editor";

class Home extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        let defaultStyle = '{\n' +
            '\t"node": {\n' +
            '\n' +
            '\t},\n' +
            '\n' +
            '\t"edge": {\n' +
            '\n' +
            '\t},\n' +
            '\n' +
            '\t"array": {\n' +
            '\n' +
            '\t}\n' +
            '}'
        this.state = {
            program: "",
            style: defaultStyle
        };
    }

    triggerVisuals = (code_string) => {
        this.setState({
            program: code_string
        });
    }

    setStyle=  (style) => {
        this.setState({
            style: style
        })
    }

    render() {
        return (
            <div style={{display: 'flex', width: "100%", height: "100vh", backgroundColor:"green", marginTop:45}}>

                <div style={{width: "60%"}}>
                    <Visualizer program={this.state.program} style={this.state.style} speed={this.props.speed}/>
                </div>
                <div style={{width: "40%", resize:"horizontal"}}  >
                    <div hidden={!this.props.styling}>
                        <Editor editor_id={"style"} value={this.state.style} visuals_trigger={this.setStyle} theme={"dracula"}/>
                    </div>
                    <div hidden={this.props.styling}>
                        <Editor editor_id={"code"} visuals_trigger={this.triggerVisuals} theme={"solarized_dark"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;