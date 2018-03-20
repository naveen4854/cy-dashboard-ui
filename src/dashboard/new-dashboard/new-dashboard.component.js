

import React, { PureComponent } from 'react';

//TODO: change to container
import { WidgetsBar } from '../../components/widgets-bar';
import DashboardContainer from '../../components/dashboard';

export default class NewDashboard extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
    }
    componentDidUpdate() {
    }
    render() {
        return (
            <div className='background' >
                <div>
                    <WidgetsBar l={this.props.l} AddWidget={this.props.AddWidget} />
                </div>
                <div className="row">
                    <div className="col-md-12  col-sm-12  col-xs-12">
                        <DashboardContainer />
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