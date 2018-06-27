

import React, { Component } from 'react';
import { WidgetsBarContainer } from '../../components/widgets-bar';
import DashboardLayoutContainer from '../../components/dashboard-layout';
import CustomSelect from '../../components/custom-dropdown';
import { SliderBarContainer } from '../../components/slider-bar';

import SliderDashboardTable from './slider-dashboards-table';

export default class NewSlider extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        debugger;
        return (
            <div className='background' >
                <SliderBarContainer />
                <div className="row my-files-table-container">
                    <h1>{this.props.l.t('Create Slider', 'Create Slider')} </h1>


                    <div className='row'>
                        <div className='col-xs-4 col-md-3 col-lg-2 text-primary'>
                            <div class="form-group">
                                <label >{this.props.l.t('Name', 'Name')}</label>
                                <input type="text" class="form-control" placeholder="Name" />
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-3 col-lg-1 text-primary'>
                            <div class="form-group">
                                <label>{this.props.l.t('Default', 'Default')}</label>
                                <input className="form-check-input" type="checkbox" ref="defaults" />
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-3 col-lg-1 text-primary'>
                            <div class=" form-check">
                                <label>{this.props.l.t('Global', 'Global')}</label>
                                <input type="checkbox" class="form-check-input with-gap" ref="Global" />
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{marginBottom:'10px',marginTop:'10px'}}>
                        <div className='col-xs-4'>
                            <div className='row'>
                                <div class='col-xs-12 col-md-3 col-lg-6 text-primary'>
                                    <label>{this.props.l.t('Add Dashboard', 'Add Dashboard')}</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div class='col-xs-12 col-md-6 col-lg-6'>
                                        <CustomSelect name="field-group-options"
                                           //  value={this.props.mydashboards.userdashboards}
                                            placeholder='Select...'
                                            // options={this.props.mydashboards.userdashboards}
                                            // onChange={this.onStatisticGroupChange} 
                                            />
                                </div>
                                <div class='col-xs-5 col-md-3 col-lg-2'>
                                    <input className="form-check-input text-primary btn btn-default btn-lg" style={{ padding:'10px',borderRadius:'5px',fontWeight:'bold' }}  type="button" value={this.props.l.t('Preview', 'Preview')}/>
                                </div>

                                <div class='col-xs-6 col-md-3 col-lg-2'>
                                    <input className="form-check-input btn btn-primary btn-lg" style={{ padding:'10px',paddingLeft:'20px',paddingRight:'20px' ,borderRadius:'5px',fontWeight:'bold' }} type="button"  value={this.props.l.t('+Add', '+Add')} />
                                </div>



                            </div>

                        </div>
                    </div>

                    <SliderDashboardTable />


                </div>
            </div>

        )
    }
}