import React, { PureComponent } from 'react'
import Resizable from 're-resizable';
import WidgetContainer from '../widget-components';

export default class ResizableWidgetComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResizeStop = this.onResizeStop.bind(this);
    }

    onResizeStart(e, direction, ref) {
        e.stopPropagation()
        this.props.updateDraggable(true);
    }

    onResizeStop(e, direction, ref, d) {
        const { columnIndex, rowIndex } = this.props
        e.stopPropagation()
        this.props.updateDraggable(false);
        let comboWidgetId = 102020202;
        this.props.updateMatrix(comboWidgetId, columnIndex, rowIndex, d);
    }

    render() {
        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0",
            display: 'block',
            alignItems: 'inherit',
            justifyContent: 'center'
        };
        let resizeHandleClasses = {
            bottomRight: "bottomRight",
            bottomLeft: "bottomLeft",
            topLeft: "topLeft",
            topRight: "topRight"
        }
        const { cell, rowIndex, columnIndex } = this.props
        return (
            <Resizable
                style={style}
                enable={{
                    bottom: columnIndex == 0,
                    right: rowIndex == 0,
                    left: false,
                    bottomLeft: false,
                    bottomRight: false,
                    top: false,
                    topLeft: false,
                    topRight: false
                }}
                size={{
                    width: cell.width,
                    height: cell.height
                }}
                handleWrapperClass={resizeHandleClasses}
                defaultSize={{
                    width: cell.width,
                    height: cell.height
                }}
                onResizeStart={this.onResizeStart}
                onResizeStop={this.onResizeStop}
            >
                <WidgetContainer key={cell.id}
                    // mode={this.props.dashboard.mode}
                    widget={cell}
                // toggleSettingsMenu={this.props.toggleSettingsMenu}
                />
            </Resizable>
        )
    }
}