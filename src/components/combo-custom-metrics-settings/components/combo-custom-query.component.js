import React, { PureComponent } from 'react'



export default class ComboCustomQueryComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.updateCustomQuery = this.updateCustomQuery.bind(this);
        this.loadColumns = this.loadColumns.bind(this);
    }
    updateCustomQuery(e) {
        this.props.updateCustomQuery(e.target.value);
    }
    loadColumns() {
        this.props.loadColumns();
    }
    toggleExpandQuery() {
        this.props.toggleExpandQuery();
    }
    render() {
        const { comboCustomSettings } = this.props;
        return (
            <div id='tabContentArea' className='margin20'>
                <div className="accordion">
                    <div className="accordion-header" onClick={() => this.toggleExpandQuery()}>
                        <span className="pull-left rtl-pull-left">{this.props.l.t('Custom_Query', 'Custom Query')}</span>
                        {
                            comboCustomSettings.isCustomQueryExpanded
                                ? <i className='fa fa-angle-up pull-right accordion-icon'></i>
                                : <i className='fa fa-angle-down pull-right accordion-icon'></i>
                        }
                    </div>
                    {comboCustomSettings.isCustomQueryExpanded &&
                        <div>
                            <div className="row acordian-margin">
                                <div className="col-md-12 ">
                                    <textarea
                                        value={comboCustomSettings.query}
                                        className="form-control "
                                        placeholder={this.props.l.t('Type_your_custom_query', 'Type your custom query')}
                                        rows="5"
                                        onChange={this.updateCustomQuery}>
                                    </textarea>
                                </div>
                            </div>

                            <div className="row margin20">
                                <div className="pull-right">
                                    <button type="button" className=" btn  btn-primary" style={{ display: 'none' }} >   <i className="fa fa-bolt"> </i>&nbsp;{this.props.l.t('Validate_Query', 'Validate Query')}</button>
                                    <button
                                        type="button"
                                        disabled={comboCustomSettings.query == ''}
                                        className=" btn  btn-primary"
                                        onClick={this.loadColumns} >
                                        <i className="fa fa-arrow-right"> </i>&nbsp; {this.props.l.t('Next', 'Next')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        )
    }
}
