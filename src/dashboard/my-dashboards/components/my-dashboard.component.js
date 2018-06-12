import React, { Component } from 'react';
import { browserHistory, Router } from 'react-router';
import ReactPaginate from 'react-paginate';
import CustomSelect from '../../../components/custom-dropdown';
import MyDashboardTable from './table';
import Header from '../../../components/header';
import { pagesList } from '../../../shared/constants/constants';
import CustomDock from '../../../components/custom-dock';
import { Tab, Tabs } from 'react-bootstrap';
import { DashboardModeEnum } from '../../../shared/enums';

import {Constants} from '../../../shared/constants'
export default class MyDashboard extends Component {
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
		const pageStart = (this.props.myDashboard.pageNumber - 1) * this.props.myDashboard.pageSize + 1,
			pageEnd = this.props.myDashboard.pageNumber * this.props.myDashboard.pageSize,
			totalRows = this.props.myDashboard.totalDashboards
		return (
			<div >
				<div className="my-files">
					<div className="page-toolbar">
						<div className="action-tool form-check ">
							<label className="checkbox-inline checkbox-lbl-left rtl-checkbox-lbl-left">
								<label className="form-check-label">{this.props.l.t('My dashboards', 'My dashboards')}</label>
								<input className="form-check-input" type="checkbox" style={{ marginTop: '4px', marginLeft: '5px' }}
									ref="my Dashboards"
									checked={this.props.myDashboard.myDashboards}
									onChange={(e) => this.onMyDashboardsChecked(e)}
								/>
							</label>
						</div>
						<div className="action-tool">
							<label className="checkbox-inline checkbox-lbl-left rtl-checkbox-lbl-left">
								<label className="form-check-label">{this.props.l.t('Global', 'Global')}</label>
								<input className="form-check-input" type="checkbox" style={{ marginTop: '4px', marginLeft: '5px' }}
									ref="globals"
									checked={this.props.myDashboard.globals}
									onChange={(e) => this.onglobalsChecked(e)}
								/>
							</label>
						</div>
						<div onClick={() => { browserHistory.push(`${Constants.appPath}dashboard/new`); this.props.test(); localStorage.setItem(Constants.mode, DashboardModeEnum.New); }} className="action-tool  pointer">
							<a><i className="fa fa-plus" aria-hidden="true"></i> Add dashboard</a>
						</div>

					</div>
					{(this.props.myDashboard && this.props.myDashboard.userDashboards && this.props.myDashboard.userDashboards.length > 0) &&
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
													value={this.props.myDashboard.pageSize} onChange={(e) => this.onPageSizeChange(e)} />
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
												pageCount={this.props.myDashboard.totalPages}
												breakClassName={"break-me"}
												marginPagesDisplayed={1}
												forcePage={this.props.myDashboard.pageNumber - 1}
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


