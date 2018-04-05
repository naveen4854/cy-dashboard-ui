import React, { PureComponent } from 'react'
import ResizableWidgetComponent from './resizable-widget';
import WidgetComponent from '../../widget/widget.component';

export default class ComboCellComponent extends PureComponent {
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
            <td>
                <div className="cell" style={{ height: cell.height, width: cell.width }}>{
                    rowIndex == 0 || columnIndex == 0 ?
                        <ResizableWidgetComponent cell={cell} columnIndex={columnIndex} rowIndex={rowIndex} />
                        :
                        <WidgetComponent key={cell.id}
                            // mode={this.props.dashboard.mode}
                            widget={cell}
                            // toggleSettingsMenu={this.props.toggleSettingsMenu}
                        />
                }
                </div>
            </td>
        )
    }
}