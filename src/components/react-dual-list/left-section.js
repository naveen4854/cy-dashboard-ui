import React, { Component } from 'react';
import _ from 'lodash'
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class LeftSection extends Component {

    render() {
        return (
            <div>
                 <div className="col-xs-12 text-center heading">
                    {this.props.l.isRtl ? this.props.l.t('Selected_Items', 'Selected Items') : this.props.l.t('Available_Items', 'Available Items')}
                </div>
                <button className="btn btn-primary btn-block point-right" type="button" onClick={this.props.onActionClick.bind(this)}>
                    {this.props.l.isRtl ? this.props.l.t('Remove', 'Remove') : this.props.l.t('Add', 'Add')}
                </button>
               
                <ul className='list-box' style={{ maxHeight: this.props.maxHeight, minHeight: this.props.minHeight }}>

                    {
                        _.map(this.props.list, (listItem, i) => (
                            <li key={i}
                                className={listItem.checked ? 'list-item-selected' : 'list-item'}
                                onClick={this.props.onItemClick.bind(this, listItem)} >
                                {listItem.label}
                            </li>
                        ))
                    }

                </ul>
                <div className="button-bar row">
                    <button className="btn btn-primary pull-left  rtl-pull-left col-xs-5 col-sm-5 col-md-5 " type="button" onClick={this.props.onSelectOrUnselectAll.bind(this, true, true)} >{this.props.l.t('Select_All', 'Select All')}</button>
                    <button className="btn btn-default pull-right rtl-pull-right col-xs-5 col-sm-5 col-md-5 " type="button" onClick={this.props.onSelectOrUnselectAll.bind(this, true, false)} >{this.props.l.t('Select_None', 'Select None')}</button>
                </div>
            </div>
        );
    }
}

// export default ListBox;


