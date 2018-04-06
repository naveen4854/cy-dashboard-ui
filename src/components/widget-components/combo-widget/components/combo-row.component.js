import React, { PureComponent } from 'react'
import ComboCell from './combo-cell.component';

export default class ComboRowComponent extends PureComponent {
    render() {
        const {row, rowIndex} = this.props
        return (
            <tr>
                {
                    _.map(row, (cell, index) => {
                        let columnIndex = index;
                        return <ComboCell key={index} cell={cell} columnIndex={columnIndex} rowIndex={rowIndex} />
                    })
                }
            </tr>
        )
    }
}