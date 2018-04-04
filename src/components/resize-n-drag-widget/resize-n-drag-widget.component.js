import React, { PureComponent } from 'react'
import Rnd from 'react-rnd';
import WidgetComponent from '../widget-components';

export default class RndWidgetComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.onResizeStop = this.onResizeStop.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }
    onResizeStop(e, direction, ref, delta, position) {
        // this.props.UpdateWidgetSize(ref.offsetWidth, ref.offsetHeight, widget.id)
    }

    onResizeStart(e, direction, ref, delta, position) {
        // this.props.UpdateWidgetZIndex({}, {}, widget);
    }

    onDragStop(e, position) {
        // this.props.UpdateWidgetPosition(position.x, position.y, widget.id);
    }

    onDragStart(e, position) {
        // this.props.UpdateWidgetZIndex({}, {}, widget);
    }

    render() {
        const { widget, mode } = this.props;
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
            <Rnd key={widget.id} default={{ x: widget.x, y: widget.y, width: widget.width, height: widget.height }}
                onResizeStop={this.onResizeStop}
                onResizeStart={this.onResizeStart}
                onDragStop={this.onDragStop}
                onDragStart={this.onDragStart}
                enableResizing={enableResizingValue}
                resizeHandleClasses={resizeHandleClasses}
                disableDragging={this.props.static ? true : false}
                z={widget.z}
                bounds='.dashboard-layout'
                _freeBottomBounds={true}
            >
                <WidgetComponent key={widget.id}
                    mode={mode}
                    widget={widget}
                    ToggleSettingsMenu={this.props.ToggleSettingsMenu}
                />
            </Rnd>
        )
    }
}