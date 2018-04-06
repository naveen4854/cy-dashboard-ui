import React, { PureComponent } from 'react';

import WidgetContainer from '../widget-components'
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
                            toggleSettingsMenu={this.props.toggleSettingsMenu}
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