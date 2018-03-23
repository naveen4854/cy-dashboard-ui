import React from 'react';
import CheckBoxList from './check-box-list.component';
import Scrollbars from 'react-scrollbar';
import _ from 'lodash';
import './styles.css';

export default class CheckBoxListGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            selectAll: _.reduce(props.checkList, function (allChecked, cb) { return cb.checked && allChecked }, true)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps,
            selectAll: _.reduce(nextProps.checkList, function (allChecked, cb) { return cb.checked && allChecked }, true)
        })
    }

    handleSelectAllChange() {
        const newCheckList = _.map(this.state.checkList, (checkBox) => {
            return {
                value: checkBox.value,
                label: checkBox.label,
                checked: !this.state.selectAll
            };
        });
        this.setState({
            checkList: newCheckList,
            selectAll: !this.state.selectAll
        });
        this.props.onChange(newCheckList);
    }

    handleChange() {
        // this.setState({
        //     selectAll: _.reduce(this.state.checkList, function (allChecked, cb) { return cb.checked && allChecked }, true)
        // });
        this.props.onChange(this.state.checkList);

    }

    render() {
        return (
            <div>
                {
                    this.state.label &&
                    <div className='row'>
                        <div className="col-md-6 check-list-label">
                            {this.state.label}
                        </div>
                    </div>
                }
                <Scrollbars className="scroll-bar">
                    <div className='row'>
                        <div className='check-box-list col-md-6'>
                            <div className='check-box' onClick={() => this.handleSelectAllChange()}>
                                <input type="checkbox"
                                    checked={this.state.selectAll}
                                />
                                <label className="select-all-label">
                                    Select All
                                </label>
                            </div>
                            <CheckBoxList defaultData={this.state.checkList} onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}