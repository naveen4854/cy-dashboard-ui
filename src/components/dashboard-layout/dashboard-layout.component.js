import React, { PureComponent } from 'react';

import WidgetContainer from '../widget-components'
import RndWidgetComponent from '../resize-n-drag-widget';

export default class DashboardLayoutComponent extends PureComponent {
    render() {
        return (
            <div dir="ltr" className="dashboard-layout">
                {
                    _.map(this.props.widgets, (widget, i) =>
                        <RndWidgetComponent
                            key={i}
                            widget={widget}
                        />
                    )
                }
            </div>
        )
    }
}