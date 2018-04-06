import React from 'react';
import { Modal, Effect  } from 'react-dynamic-modal';
import _ from 'lodash';

export class CustomModalPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state=props;
    }

    updateProp(e) {
        
        this.setState({ name: e.target.value });
    }


    render() {
        const { onRequestClose, updateName, OnCancel } = this.props;
        return (

            <Modal
                onRequestClose={onRequestClose}
                effect={Effect.ScaleUp}
            >

                <div className="panel panel-default">
                    <div className="panel-heading"> <strong className="">{this.props.title}</strong>

                    </div>
                    <div className="panel-body">
                        <div className="row" >
                            <div className="form-group">
                                <label className="col-md-offset-2 col-sm-offset-2 col-md-2 col-sm-3 control-label">{this.props.l.t('Name', 'Name')}</label>
                                <div className="col-md-5 col-sm-9">
                                    <input type="text" className="form-control" ref="refDashboardName" placeholder="Dashboard name"
                                    value={this.state.name}  onChange={(e) => this.updateProp(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="form-group last modal-popup-margin">
                                <div className="col-sm-offset-4 col-sm-8">
                                    <button type="button" className="btn btn-primary btn-sm"  disabled={!_.trim(this.state.name)}
                                        onClick={() => this.props.SaveClick(this.state.name)}
                                    >
                                        {this.props.okButtonText}
                                    </button>
                                    <button type="button" className="btn btn-default btn-sm margin10px"
                                        onClick={OnCancel}>{this.props.l.t('Cancel', 'Cancel')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        );
    }
}
export default  CustomModalPopUp
