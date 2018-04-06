import React, { Component } from 'react';
import LeftSection from "./left-section";
import RightSection from "./right-section";
import Action from './action-button'
import _ from 'lodash'
import './dual-list.css'

class DualList extends Component {

    constructor(props) {
        super(props);
        this.state = { ...props }  //selectedFromAll: specifies selected items from All list
        //selectedFromSelected: specifies selected items from selected list
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });

    }

    onAllItemClick(selectedItem) {

        selectedItem.checked = !selectedItem.checked;

        let allList = this.state.allList
        let index = _.findIndex(allList, { value: selectedItem.value });

        // Replace item at index using native splice
        allList.splice(index, 1, selectedItem);
        this.setState({ allList })

    }

    onSelectedItemClick(selectedItem) {

        selectedItem.checked = !selectedItem.checked;
        let selectedList = this.state.selectedList
        let index = _.findIndex(selectedList, { value: selectedItem.value });

        // Replace item at index using native splice
        selectedList.splice(index, 1, selectedItem);
        this.setState({ selectedList });
    }

    updateItem(selectedItem) {
        let selectedList = this.state.selectedList;
        let index = _.findIndex(selectedList, { value: selectedItem.value });

        // Replace item at index using native splice
        selectedList.splice(index, 1, selectedItem);
        this.setState({ selectedList });
    }

    callOnChange(selectedList, allList) {
        this.props.onChange({
            selectedList: selectedList,
            allList: allList
        })
    }

    OnMoveToLeft() {
        let allList = this.state.allList;

        let selectedFromSelectedList = _.filter(this.state.selectedList, function (selected) {
            return selected.checked
        });

        let remainingListinSelected = _.filter(this.state.selectedList, function (selected) {
            return !selected.checked;
        });

        _.forEach(selectedFromSelectedList, function (selected) {
            selected.checked = false
        });

        if (allList) {
            allList = this.state.allList.concat(selectedFromSelectedList);
        }
        else {
            allList = selectedFromSelectedList;
        }

        let allListSorted = _.sortBy(allList, [function (o) { return o.label; }]);
        this.callOnChange(remainingListinSelected, allListSorted)
    }

    OnMoveToRight() {

        let selectedList = this.state.selectedList;

        let selectedFromAllList = _.filter(this.state.allList, function (selected) {
            return selected.checked
        });
        let remainingListInAll = _.filter(this.state.allList, function (selected) {
            return !selected.checked;
        });

        _.forEach(selectedFromAllList, function (selected) {
            selected.checked = false
        });

        if (selectedList) {
            selectedList = this.state.selectedList.concat(selectedFromAllList)
        }

        else {
            selectedList = selectedFromAllList
        }
        this.callOnChange(selectedList, remainingListInAll)
    }

    OnMoveUp() {
        let newUpdatedValues = this.moveVertically(true, this.state)
        this.callOnChange(newUpdatedValues, this.state.allList)
    }

    onSelectOrUnselectAll(isAllList, isSelectedAll) {

        let data = isAllList ? this.state.allList : this.state.selectedList

        _.map(data, (item) => {
            item.checked = isSelectedAll;
        })

        if (isAllList) {
            this.setState({
                allList: data
            });
        }
        else {
            this.setState({
                selectedList: data
            });
        }

    }

    OnMoveDown() {
        let newUpdatedValues = this.moveVerticallyDown(false, this.state)
        this.callOnChange(newUpdatedValues, this.state.allList)
    }

    move(array, fromIndex, toIndex) {
        array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    }

    onMoveToFirst() {
        let rightSideList = this.state.selectedList;

        let selectedIndex = _.findIndex(rightSideList, { 'checked': true });
        this.move(rightSideList, selectedIndex, 0);
        this.callOnChange(rightSideList, this.state.allList)
    }

    onMoveToLast() {
        let rightSideList = this.state.selectedList;

        let selectedIndex = _.findIndex(rightSideList, { 'checked': true });
        this.move(rightSideList, selectedIndex, rightSideList.length);
        this.callOnChange(rightSideList, this.state.allList)
    }

    swap(x, y) {
        return function (collection) {
            var b = collection[x];
            collection[x] = collection[y];
            collection[y] = b;
            return collection;
        };
    };

    moveVerticallyDown(isDirectionUpward, state) {
        var rightOptions = state.selectedList;

        let selectedValues = _.filter(this.state.selectedList, function (selected) {
            return selected.checked
        });
        var newRightOptions = _.clone(rightOptions);
        let iterator = 0;
        for (iterator = selectedValues.length - 1; iterator >= 0; iterator--) {
            let index = _.findIndex(newRightOptions,
                function (rightOption) {
                    return rightOption.value === selectedValues[iterator].value;
                }
            );
            ++index === rightOptions.length ? null : this.swap(index - 1, index)(newRightOptions);
        }
        return newRightOptions;
    };

    moveVertically(isDirectionUpward, state) {
        var rightOptions = state.selectedList;

        let selectedValues = _.filter(this.state.selectedList, function (selected) {
            return selected.checked
        });
        var newRightOptions = _.clone(rightOptions);
        let iterator = 0;
        for (iterator = 0; iterator < selectedValues.length; iterator++) {
            let index = _.findIndex(newRightOptions,
                function (rightOption) {
                    return rightOption.value === selectedValues[iterator].value;
                }
            );
            // eslint-disable-next-line
            index == 0 ? null : this.swap(index, index - 1)(newRightOptions);
        }
        return newRightOptions;
    };

    onDragEnd(data) {
        this.setState({
            selectedList: data
        });
    }

    onRowOrderChange(e) {
        this.callOnChange(e, this.state.allList)

    }

    render() {
        return (
            <div className="row" style={{ width: '100%', margin: '10px' }}>
                <div className="col-xs-6">
                    <LeftSection
                        list={this.state.allList}
                        maxHeight='200px'
                        minHeight='200px'
                        onItemClick={this.onAllItemClick.bind(this)}
                        onActionClick={this.OnMoveToRight.bind(this)}
                        onSelectOrUnselectAll={this.onSelectOrUnselectAll.bind(this)}
                        l={this.props.l}
                    />
                </div>
                <div className="col-xs-6">
                    <RightSection
                        selectedList={this.state.selectedList}
                        onActionClick={this.OnMoveToLeft.bind(this)}
                        onDragEnd={this.onDragEnd.bind(this)}
                        updateItem={this.updateItem.bind(this)}
                        onSelectOrUnselectAll={this.onSelectOrUnselectAll.bind(this)}
                        onRowOrderChange={this.onRowOrderChange.bind(this)}
                        maxHeight='200px'
                        minHeight='200px'
                        l={this.props.l}
                        />
                </div>
                {/*   

                <div style={{ float: 'left', width: '6%' }}>
                    <Action iconClass='fa fa-arrow-up' text="up" title="Move up" onActionClick={this.OnMoveUp.bind(this)} />
                    <Action iconClass='fa fa-arrow-up' text="first" title="Move to first" onActionClick={this.onMoveToFirst.bind(this)} />
                    <Action iconClass='fa fa-arrow-down' text="down" title="Move down" onActionClick={this.OnMoveDown.bind(this)} />
                    <Action iconClass='fa fa-arrow-down' text="last" title="Move to last" onActionClick={this.onMoveToLast.bind(this)} />
                </div> */}
            </div>
        );
    }
}

export default DualList;


