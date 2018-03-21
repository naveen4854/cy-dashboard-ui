import React, { PureComponent } from 'react';
import Rnd from 'react-rnd';

import Widget from '../widgets'

export default class DashboardLayoutComponent extends PureComponent {

    onResizeStop(widget, e, direction, ref, delta, position) {
        // this.props.UpdateWidgetSize(ref.offsetWidth, ref.offsetHeight, widget.id)
    }

    onResizeStart(widget, e, direction, ref, delta, position) {
        // this.props.UpdateWidgetZIndex({}, {}, widget);
    }

    onDragStop(widget, e, position) {
        // this.props.UpdateWidgetPosition(position.x, position.y, widget.id);
    }

    onDragStart(widget, e, position) {
        // this.props.UpdateWidgetZIndex({}, {}, widget);
    }

    render() {
        let enableResizingValue = {
            bottom: !this.props.static,
            bottomLeft: !this.props.static,
            bottomRight: !this.props.static,
            left: !this.props.static,
            right: !this.props.static,
            top: !this.props.static,
            topLeft: !this.props.static,
            topRight: !this.props.static,
        };

        let resizeHandleClasses = {
            bottomRight: "bottomRight",
            bottomLeft: "bottomLeft",
            topLeft: "topLeft",
            topRight: "topRight"
        };

        return (
            <div dir="ltr" className="dashboard-layout">
                {
                    _.map(this.props.dashboard.widgets, widget =>
                        <Rnd key={widget.id} default={{ x: widget.x, y: widget.y, width: widget.width, height: widget.height }}
                            onResizeStop={this.onResizeStop.bind(this, widget)}
                            onResizeStart={this.onResizeStart.bind(this, widget)}
                            onDragStop={this.onDragStop.bind(this, widget)}
                            onDragStart={this.onDragStart.bind(this, widget)}
                            enableResizing={enableResizingValue}
                            resizeHandleClasses={resizeHandleClasses}
                            disableDragging={this.props.static ? true : false}
                            z={widget.z}
                            bounds='.dashboard-layout'
                            _freeBottomBounds={true}
                        >
                            <Widget key={widget.id} mode={this.props.dashboard.mode} widget={widget} />
                        </Rnd>
                    )
                }
            </div>
        )
    }
}