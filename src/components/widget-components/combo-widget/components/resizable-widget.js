import React, { PureComponent } from 'react'
import Resizable from 're-resizable';
import WidgetComponent from '../../widget/widget.component';

export default class ResizableWidgetComponent extends PureComponent {
    onResizeStop(e, direction, ref, d, columnIndex, rowIndex) {
        console.log(e, direction, ref, d, columnIndex, rowIndex, 'onResizeStop')
    }

    onResizeStart(e, direction, ref) {
        console.log(e, direction, ref, 'onResizeStart')
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
                onResizeStop={this.onResizeStart}
                onResizeStop={(e, direction, ref, d) => this.onResizeStop(e, direction, ref, d, columnIndex, rowIndex)}
            >
                <WidgetComponent key={cell.id}
                    // mode={this.props.dashboard.mode}
                    widget={cell}
                // toggleSettingsMenu={this.props.toggleSettingsMenu}
                />
            </Resizable>
        )
    }
}