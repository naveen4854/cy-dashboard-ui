import React, { PureComponent } from 'react';

import WidgetComponent from '../widget-components'
import RndWidgetComponent from '../resize-n-drag-widget';

export default class DashboardLayoutComponent extends PureComponent {
    render() {
        return (
            <div dir="ltr" className="dashboard-layout">
                {
                    _.map(this.props.dashboard.widgets, widget =>
                        <RndWidgetComponent
                            key={widget.id}
                            widget={widget}
                            mode={this.props.dashboard.mode}
                            ToggleSettingsMenu={this.props.ToggleSettingsMenu}
                            onResizeStop={this.onResizeStop}
                            onResizeStart={this.onResizeStart}
                            onDragStop={this.onDragStop}
                            onDragStart={this.onDragStart}
                        />
                    )
                }
            </div>
        )
    }
}