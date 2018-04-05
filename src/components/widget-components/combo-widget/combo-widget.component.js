import React, { PureComponent } from 'react'
import TestLayout3 from '../../test-resize/test-l3';
import ComboRow from './components/combo-row.component';
import './styles.css';

export default class ComboWidgetComponent extends PureComponent {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.renderMatrix()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderMatrix() {
        return (
            _.map(this.props.matrix, (row, index) => {
                let rowIndex = index;
                return <ComboRow key={index} row={row} rowIndex={rowIndex} />
            })
        )
    }
}