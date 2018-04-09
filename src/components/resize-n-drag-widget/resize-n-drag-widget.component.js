import React, { PureComponent } from 'react'
import Rnd from 'react-rnd';
import WidgetContainer from '../widget-components';

export default class RndWidgetComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.onResizeStop = this.onResizeStop.bind(this);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    onResizeStop(e, direction, ref, delta, position) {
        this.props.updateWidgetSize(ref.offsetWidth, ref.offsetHeight, this.props.widget)
    }

    onResizeStart(e, direction, ref, delta, position) {
        this.props.updateWidgetZIndex(this.props.widget);
    }

    onDragStop(e, position) {
        this.props.updateWidgetPosition(position.x, position.y, this.props.widget);
    }

    onDragStart(e, position) {
        this.props.updateWidgetZIndex(this.props.widget);
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
            <Rnd
                default={{ x: widget.x, y: widget.y, width: widget.width, height: widget.height }}
                onResizeStop={this.onResizeStop}
                onResizeStart={this.onResizeStart}
                onDragStop={this.onDragStop}
                onDragStart={this.onDragStart}
                resizeHandleClasses={resizeHandleClasses}
                disableDragging={this.props.disableDrag}
                enableResizing={enableResizingValue}
                z={widget.z}
                bounds='.dashboard-layout'
                _freeBottomBounds={true}
            // position={{ x: widget.x, y: widget.y }}
            >
                <WidgetContainer key={widget.id}
                    widget={widget}
                    toggleSettingsMenu={this.props.toggleSettingsMenu}
                />
            </Rnd>
        )
    }
}