

import React, { PureComponent } from 'react';

import { WidgetsBar } from '../../components/widgets-bar';


export default class NewDashboard extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps NewDashboard')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate NewDashboard')
    }
    render() {
        return (
            <div className='background' >
                <div>
                    <WidgetsBar l={this.props.l} />
                </div>
                <div className="row">
                    <div className="col-md-12  col-sm-12  col-xs-12">
                        hey!!
                        {/* <Dashboard
                            {...this.state} l={this.props.l}
                            ToggleEditorMenu={(w) => this.props.ToggleEditorMenu(w)}
                            ToggleSettingsMenu={(w) => this.props.ToggleSettingsMenu(w)}
                            DeleteWidget={(w) => this.props.DeleteWidget(w)}
                            PreviewActionPicture={(d, w) => this.props.PreviewActionPicture(d, w)}
                            UpdateWidgetSize={this.props.UpdateWidgetSize}
                            UpdateWidgetPosition={this.props.UpdateWidgetPosition}
                            UpdateWidgetZIndex={this.props.UpdateWidgetZIndex}
                        />
                        <SettingsContainer {...this.props} />
                        <EditorContainer {...this.props} title="Theme First Editor" /> */}
                    </div>
                </div>
            </div>
        )
    }
}