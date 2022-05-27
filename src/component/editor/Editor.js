import {Component} from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";
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
                    theme={this.props.theme}
                    height="100%"
                    width="100%"
                    fontSize={14}
                    onChange={(newValue)=>{this.props.visuals_trigger(newValue)}}
                    defaultValue={this.props.value}
                    name={this.props.editor_id}
                    id={this.props.editor_id}
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false
                    }}
                />
            </div>
        );
    }
}

export default Editor;