import {Component} from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools"

class Editor extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{background: 'yellow', height: "100vh"}}>
                <AceEditor
                    mode="javascript"
                    theme="solarized_dark"
                    height="100%"
                    width="100%"
                    fontSize={14}
                    onChange={(newValue)=>{this.props.visuals_trigger(newValue)}}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true
                    }}
                />
            </div>
        );
    }
}

export default Editor;