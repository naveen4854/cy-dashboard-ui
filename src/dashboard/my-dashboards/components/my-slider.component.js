import React, { PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
import ReactPaginate from 'react-paginate';
import CustomSelect from '../../../components/custom-dropdown';
import MyDashboardTable from './table';

import { pagesList } from '../../../shared/constants/constants';

import {Constants} from '../../../shared/constants'
export default class SliderListComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.onMyDashboardsChecked = this.onMyDashboardsChecked.bind(this);
        this.onglobalsChecked = this.onglobalsChecked.bind(this);
        this.onPageClick = this.onPageClick.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillMount() {
        this.props.GetDashboardsList();
        //        this.props.GetSlidersList();
    }

    onMyDashboardsChecked(e) {
        this.props.SetMyDashboardsAndGetDashboardsList(e.target.checked);
    }

    onglobalsChecked(e) {
        this.props.SetGlobalsAndGetDashboardsList(e.target.checked);
    }

    addDashboardClick() {
        browserHistory.push(`${Constants.appPath}dashboard/new`);
    }

    onPageClick(e) {
        this.props.SetPageNumberAndGetDashboardsList(e.selected + 1);
    }
    onPageSizeChange(e) {
        if (e.value)
            this.props.SetPageSizeAndGetDashboardsList(e.value);
    }
    render() {
        const pageStart = (this.props.mySlider.sliderPageNumber - 1) * this.props.mySlider.sliderPageSize + 1,
            pageEnd = this.props.mySlider.sliderPageNumber * this.props.mySlider.sliderPageSize,
            totalRows = this.props.mySlider.totalSliders
        return (
            <div >
                <div className="my-files">
                    <div className="page-toolbar page-toolbar-blue">
                        <div className="action-tool form-check ">
                            <label className="checkbox-inline checkbox-lbl-left rtl-checkbox-lbl-left">
                                <label className="form-check-label">{this.props.l.t('Personal', 'Personal')}</label>
                                <input className="form-check-input" type="checkbox" style={{ marginTop: '4px', marginLeft: '5px' }}
                                    ref="my Dashboards"
                                    checked={this.props.mySlider.mySliders}
                                    onChange={(e) => this.onMyDashboardsChecked(e)}
                                />
                            </label>
                        </div>
                        <div className="action-tool">
                            <label className="checkbox-inline checkbox-lbl-left rtl-checkbox-lbl-left">
                                <label className="form-check-label">{this.props.l.t('Global', 'Global')}</label>
                                <input className="form-check-input" type="checkbox" style={{ marginTop: '4px', marginLeft: '5px' }}
                                    ref="globals"
                                    checked={this.props.mySlider.sliderGlobals}
                                    onChange={(e) => this.onglobalsChecked(e)}
                                />
                            </label>
                        </div>
                        <div onClick={this.addDashboardClick} className="action-tool  pointer">
                            <a><i className="fa fa-plus" aria-hidden="true"></i> Add Slider</a>
                        </div>

                    </div>
                    {(this.props.mySlider && this.props.mySlider.userSliders && this.props.mySlider.userSliders.length > 0) &&
                        <div className="my-files-table-outer-container">
                            <div className="container-fluid my-files-table-container">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <MyDashboardTable {...this.props} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-2 col-sm-3 col-md-4 col-lg-5">
                                        <div className={"pull-left rtl-pull-left"}>
                                            <label className=" col-sm-4 col-md-4 text-primary" style={{ "paddingTop": "6px" }}>View</label>
                                            <div className="col-sm-8 col-md-8">
                                                <CustomSelect name="field-group-options" options={pagesList}
                                                    value={this.props.mySlider.sliderPageSize} onChange={(e) => this.onPageSizeChange(e)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-11 col-sm-9 col-md-8 col-lg-7">
                                        <div className="col-sm-3 col-md-3">
                                            <div className={"pull-right rtl-pull-right"} style={{ "paddingTop": "15px" }}>
                                                <div className="text-right text-primary">
                                                    <bdi>
                                                        <strong>
                                                            &nbsp;{pageStart} - {pageEnd > totalRows ? totalRows : pageEnd}
                                                        </strong> </bdi> {this.props.l.t('of', 'of')} <strong> 	<bdi>{totalRows}</bdi></strong>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-9 col-md-9">
                                            <ReactPaginate previousLabel="Previous"
                                                nextLabel="Next"
                                                breakLabel={<a>...</a>}
                                                pageRangeDisplayed={4}
                                                pageCount={this.props.mySlider.sliderTotalPages}
                                                breakClassName={"break-me"}
                                                marginPagesDisplayed={1}
                                                forcePage={this.props.mySlider.sliderPageNumber - 1}
                                                onPageChange={this.onPageClick}
                                                containerClassName={"pagination pull-left rtl-pull-left"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}
                                                pageClassName={"pointer"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
