import React, { PureComponent } from 'react'
import CustomSelect from '../custom-dropdown';

export default class CustomMetricsSettingsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.setSelectedStoreProc = this.setSelectedStoreProc.bind(this);
        this.updateParamValue = this.updateParamValue.bind(this);
        this.generateQuery = this.generateQuery.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
    }

    setSelectedStoreProc(selectedStoreProc) {
        if (selectedStoreProc)
            this.props.setSelectedStoreProc(selectedStoreProc);
    }

    updateParamValue(value, index) {
        this.props.updateParamValue(value, index);
    }

    generateQuery() {
        let paramList = this.getParamas(this.props.customSettings.storeProcParams);
        let selectedStoreProc = this.props.customSettings.selectedStoreProc
        let query = (selectedStoreProc ? selectedStoreProc.label + " " + paramList : "")

        this.props.setCustomQuery(query)
    }

    getParamas(filterStoreProcs) {
        var myParams = "";
        _.forEach(filterStoreProcs, function (value, index) {
            var comma = index == filterStoreProcs.length - 1 ? "" : ",";// To remove the comma at last of the string
            if (_.includes(value.dt, 'CHAR')) {
                myParams = myParams + "'" + value.vl + "'" + comma;
            }
            else {
                myParams = myParams + value.vl + comma;
            }
        });

        return myParams;
    }

    updateQuery(query) {
        this.props.setCustomQuery(query)
    }


    render() {
        return (
            <div id="customStatistics" >
                <div className="row">
                    <div className="col-xs-12 col-md-4 col-lg-4 metrics-label-sm metrics-label rtl-metrics-label-sm ">
                        <label>{this.props.l.t('Stored_ProcedureCOLON', 'Stored Procedure:')}</label>
                    </div>
                    <div className="col-xs-9 col-sm-7 col-md-6 col-lg-5">
                        <CustomSelect
                            name="field-group-options"
                            value={this.props.customSettings.selectedStoreProc}
                            placeholder='Select...'
                            options={this.props.customSettings.storeProcOptions}
                            onChange={(e) => this.setSelectedStoreProc(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box no-margin">
                            <div className="box-header">
                                <h3 className="box-title">{this.props.l.t('Query_Generator', 'Query Generator')}</h3>
                            </div>
                            <div className="box-body">
                                {
                                    (this.props.customSettings.selectedStoreProc && this.props.customSettings.selectedStoreProc.value != 'Select Custom Query') &&
                                    < div >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="table-responsive">
                                                    <table id="example1" className="table table-bordered table-striped no-margin">
                                                        <thead>
                                                            <tr>
                                                                <th>{this.props.l.t('Param_Name', 'Param Name')}</th>
                                                                <th>{this.props.l.t('Param_Type', 'Param Type')}</th>
                                                                <th>{this.props.l.t('Param_Value', 'Param Value')}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                _.map(this.props.customSettings.storeProcParams, (item, i) => (
                                                                    (<tr key={i}>
                                                                        <td>{item.pn}</td>
                                                                        <td>{item.dt}</td>
                                                                        <td><input type="text" value={item.vl} onChange={(e) => this.updateParamValue(e.target.value, i)} /></td>
                                                                    </tr>)
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row generate-query">
                                            <div className="col-xs-4 col-xs-offset-4 col-sm-6  col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-5">
                                                <button type="button" className="btn btn-primary" onClick={this.generateQuery.bind(this)} >{this.props.l.t('Generate_Query', 'Generate Query')}</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row generate-query">
                                    <div className="col-md-12">
                                        <textarea
                                            disabled={!this.props.customSettings.selectedStoreProc || this.props.customSettings.selectedStoreProc.value == 'Select Custom Query' ? false : true}
                                            className="form-control" value={this.props.customSettings.query}
                                            placeholder="Or Type your custom query"
                                            rows="5"
                                            onChange={(e) => this.updateQuery(e.target.value)}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}