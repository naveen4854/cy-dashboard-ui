import React, { Component } from 'react';
import DragAndDropComboFilters from './DragAndDropComboFilters'
import _ from 'lodash'

export default class RightSection extends Component {

    columns = [
        { name: 'Selected Filters', property: 'label' }
    ]
    render() {
        return (
            <div>
                <div className="col-xs-12 text-center heading">
                    {this.props.l.isRtl ? this.props.l.t('Available_Items', 'Available Items') : this.props.l.t('Selected_Items', 'Selected Items')}
                </div>
                <button className="btn btn-primary btn-block point-left" name="removeBtn" type="button" onClick={this.props.onActionClick.bind(this)}>
                    {this.props.l.isRtl ? this.props.l.t('Add', 'Add') : this.props.l.t('Remove', 'Remove')}
                </button>
                
                {/* <DragAndDrop styleProps= {{maxHeight: this.props.maxHeight, minHeight: this.props.minHeight}}
                    data={this.props.selectedList}
                    onDragEnd={(data) => this.props.onDragEnd(data)}
                    onItemClick={(item) => this.props.onItemClick(item)}
                /> */}
                <div className='drag-drop-filter list-box'
                    style={{ maxHeight: this.props.maxHeight, minHeight: this.props.minHeight }} >
                    <DragAndDropComboFilters
                        rowOnDragClass={"drag-highlight"}
                        columns={this.columns}
                        rows={this.props.selectedList}
                        onRowOrderChange={(k)=> {this.props.onRowOrderChange(k)}}
                        updateItem={(item)=> {this.props.updateItem(item)}}
                    />
                </div>

                <div className="button-bar row">
                    <button className="btn btn-primary pull-left rtl-pull-left col-xs-5 col-sm-5 col-md-5 " type="button" onClick={this.props.onSelectOrUnselectAll.bind(this, false, true)} >{this.props.l.t('Select_All', 'Select All')}</button>
                    <button className="btn btn-default pull-right rtl-pull-right col-xs-5 col-sm-5 col-md-5 " type="button" onClick={this.props.onSelectOrUnselectAll.bind(this, false, false)} >{this.props.l.t('Select_None', 'Select None')}</button>
                </div>
            </div>
        );
    }
}

// export default ListBox;


