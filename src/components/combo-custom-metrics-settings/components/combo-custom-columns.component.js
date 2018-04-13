import React, { PureComponent } from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import ComboCustomAccordionContainer from './combo-column-accordion/combo-column-accordion.container';

export default class ComboCustomColumnsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.addColumn = this.addColumn.bind(this);
        this.toggleAddColumn = this.toggleAddColumn.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }

    addColumn() {
        this.props.addCustomColumn();
    }

    toggleAddColumn() {
        this.props.toggleAddColumn();
    }

    onSortEnd({ oldIndex, newIndex }) {
        if (oldIndex != newIndex) {
            let newColumns = arrayMove(this.props.comboCustomSettings.columns, oldIndex, newIndex)
            console.log(newColumns)
            this.props.updateCustomComboColumns(newColumns);
        }
    };

    render() {
        const { comboCustomSettings } = this.props;
        return (
            <div id='tabContentArea' className='margin20'>
                <div className="accordion">
                    <div className="accordion-header" onClick={this.toggleAddColumn}>
                        <span className="pull-left rtl-pull-left">{this.props.l.t('ChooseSLASHConfigure_Column', 'Choose/Configure Column')}</span>
                        {
                            comboCustomSettings.addColumnExpanded
                                ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                                : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                        }
                    </div>
                    {
                        comboCustomSettings.addColumnExpanded &&
                        <div className='padding_15px'>
                            <div className='row' >
                                <div className="col-md-3 col-sm-6">
                                    <button type="button"
                                        className="btn btn-primary pull-left rtl-pull-left"
                                        disabled={comboCustomSettings.columnOptions.length == 0}
                                        onClick={this.addColumn} >
                                        <i className="fa fa-plus"> </i>
                                        &nbsp;{this.props.l.t('Add_Column', 'Add Column')}
                                    </button>
                                </div>

                            </div>

                            <div>
                                {
                                    <SortableList
                                        distance={15}
                                        helperClass='sortableHelper'
                                        items={comboCustomSettings.columns}
                                        onSortEnd={this.onSortEnd} />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


const SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((column, index) => (
                <SortableItem key={index} indexKey={index} index={index} column={column} />
            ))}
        </div>
    );
});


const SortableItem = SortableElement(({ column, indexKey, index }) => <ComboCustomAccordionContainer
    key={indexKey}
    column={column}
    index={indexKey}
/>);


