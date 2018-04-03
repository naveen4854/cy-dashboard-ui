import React from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import './styles.css'
import _ from 'lodash';
import TestLayout2 from './test-layout2';
export default class TestLayout extends React.Component {
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
    onResizeStop(e, data, columnIndex, rowIndex) {
        let newMatrix = _.map(this.state.matrix, (row, index) => {
            if (columnIndex == 0 && rowIndex == 0) {
                let _rIndex = index
                return _.map(row, (cell, index) => {
                    if (index == columnIndex && _rIndex == rowIndex)
                        return {
                            ...cell,
                            width: data.size.width,
                            height: data.size.height,
                        };
                    if (columnIndex == index)
                        return {
                            ...cell,
                            width: data.size.width,
                        }
                    if (_rIndex == rowIndex)
                        return {
                            ...cell,
                            height: data.size.height,
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
                        height: data.size.height,
                    }
                })
            }

            if (rowIndex == 0) {
                return _.map(row, (cell, index) => {
                    if (columnIndex != index)
                        return cell

                    return {
                        ...cell,
                        width: data.size.width,
                    }
                })
            }

            return row
        });

        this.setState({
            matrix: newMatrix
        })

        console.log(data, columnIndex, rowIndex, this.state.matrix, 'onResizeStop')
    }
    onResizeStart(e, data) {
        console.log(data, 'onResizeStart')
    }

    render() {
        return (
            <div className="scroll-enable" style={{ background: "#abe0f7" }}>
                <div style={{ margin: 50 }}>
                    <table>
                        <tbody>
                            {
                                _.map(this.state.matrix, (row, index) => {
                                    let rowIndex = index;
                                    return <tr>
                                        {
                                            _.map(row, (cell, index) => {
                                                let columnIndex = index;
                                                return rowIndex == 0 || columnIndex == 0 ? <td>
                                                    <ResizableBox
                                                        index={index}
                                                        width={cell.width}
                                                        height={cell.height}
                                                        axis={rowIndex == 0 && columnIndex == 0 ? 'both' : rowIndex == 0 ? 'x' : 'y'}
                                                        onResizeStop={(e, data) => this.onResizeStop(e, data, columnIndex, rowIndex)}
                                                        onResizeStart={this.onResizeStart}>
                                                        <div className="cell" style={{ height: cell.height, width: cell.width }} > {cell.title}</div>
                                                    </ResizableBox>
                                                </td> : <td><div className="react-resizable" style={{ height: cell.height, width: cell.width }} > {cell.title}</div></td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{ margin: 50 }}>
                    <TestLayout2 />
                </div>
            </div>
        );
    }
}