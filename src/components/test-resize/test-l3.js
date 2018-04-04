import React from 'react';
import Resizable from "re-resizable";
import './styles.css'
import _ from 'lodash'
export default class TestLayout2 extends React.Component {
    state = {
        matrix: [
            [{ title: 'content11', width: 80, height: 80 }, { title: 'content12', width: 80, height: 80 }, { title: 'content13', width: 80, height: 80 }],
            [{ title: 'content21', width: 80, height: 80 }, { title: 'content22', width: 80, height: 80 }, { title: 'content23', width: 80, height: 80 }],
            [{ title: 'content31', width: 80, height: 80 }, { title: 'content32', width: 80, height: 80 }, { title: 'content33', width: 80, height: 80 }],
            [{ title: 'content41', width: 80, height: 80 }, { title: 'content42', width: 80, height: 80 }, { title: 'content43', width: 80, height: 80 }],
        ]
    };

    onClick = () => {
    };

    onResize = (event, { element, size }) => {
        this.setState({ width: size.width, height: size.height });
    };
    onResizeStop(e, direction, ref, d, columnIndex, rowIndex) {

        // {
        //     this.setState({
        //         width: this.state.width + d.width,
        //         height: this.state.height + d.height,
        //     });
        // }

        let newMatrix = _.map(this.state.matrix, (row, index) => {
            if (columnIndex == 0 && rowIndex == 0) {
                let _rIndex = index
                return _.map(row, (cell, index) => {
                    if (index == columnIndex && _rIndex == rowIndex)
                        return {
                            ...cell,
                            width: cell.width + d.width,
                            height: cell.height + d.height,
                        };
                    if (columnIndex == index)
                        return {
                            ...cell,
                            width: cell.width + d.width,
                        }
                    if (_rIndex == rowIndex)
                        return {
                            ...cell,
                            height: cell.height + d.height,
                        }
                    return cell;
                })
            }
            if (columnIndex == 0) {
                if (rowIndex != index)
                    return row
                return _.map(row, (cell) => {
                    return {
                        ...cell,
                        height: cell.height + d.height,
                    }
                })
            }

            if (rowIndex == 0) {
                return _.map(row, (cell, index) => {
                    if (columnIndex != index)
                        return cell

                    return {
                        ...cell,
                        width: cell.width + d.width,
                    }
                })
            }

            return row
        });

        this.setState({
            matrix: newMatrix
        })

    }
    onResizeStart(e, data) {
        console.log(data, 'onResizeStart')
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
        return (
            <div>
                <table>
                    <tbody>
                        {
                            _.map(this.state.matrix, (row, index) => {
                                let rowIndex = index;
                                return <tr>
                                    {
                                        _.map(row, (cell, index) => {
                                            let columnIndex = index;
                                            return <td>
                                                <div className="cell" style={{ height: cell.height, width: cell.width }}>{
                                                    rowIndex == 0 || columnIndex == 0 ?
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
                                                            onResizeStop={(e, direction, ref, d) => this.onResizeStop(e, direction, ref, d, columnIndex, rowIndex)}
                                                        >
                                                            <div style={{ height: cell.height, width: cell.width }} className="react-resizable"> {cell.title}</div>
                                                        </Resizable>
                                                        :
                                                        <div className=""> {cell.title}</div>
                                                }
                                                </div>
                                            </td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {/* <ResizableBox width={80} height={80}
                    minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                    <span>Contents</span>
                </ResizableBox> */}

            </div>
        );
    }
}