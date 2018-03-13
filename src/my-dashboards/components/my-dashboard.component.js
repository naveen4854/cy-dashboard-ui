import React from 'react';
import { browserHistory, Router } from 'react-router';
import MyDashboardTable from './tile';
import CustomSelect from '../../../../components/custom-dropdown';
import 'react-select/dist/react-select.css';
var PropTypes = require('prop-types');
import ReactPaginate from 'react-paginate';
import ToggleSwitch from '../../../../components/toggle-switch';
import Select from '../../../../components/dropdown';
import Header from '../../../../components/Header'

export default class MyDashboard extends React.Component {
	pagesList = [
		{ value: 10, label: 10 },
		{ value: 25, label: 25 },
		{ value: 50, label: 50 }
	];
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.GetDashboardsList();
	}

	addDashboardClick() {
		browserHistory.push(`/dashboard/new`);
	}

	componentWillUnmount() {
	}

	onPageSizeChange(e) {
		if (e.value)
			this.props.SetPageSizeAndGetDashboardsList(e.value);
	}

	onMyDashboardsChecked(e) {
		this.props.SetMyDashboardsAndGetDashboardsList(e.target.checked);
	}

	onglobalsChecked(e) {
		this.props.SetGlobalsAndGetDashboardsList(e.target.checked);
	}

	onPageClick(e) {
		this.props.SetPageNumberAndGetDashboardsList(e.selected + 1);
	}

	// onCategoryChange(e) {
	// 	this.props.FilterDashboards(e.selected + 1, 1, this.props.myDashboard.pageSize, this.props.myDashboard.allGlobals, this.props.myDashboard.sortColumn, this.props.myDashboard.sortOrder);
	// }

	// showDashboards(e, prop) {
	// 	this.props.FilterDashboards(this.props.myDashboard.selectedCategory, 1, this.props.myDashboard.pageSize, e, this.props.myDashboard.sortColumn, this.props.myDashboard.sortOrder);
	// }

	render() {
		const pageStart = (this.props.myDashboard.pageNumber - 1) * this.props.myDashboard.pageSize + 1,
			pageEnd = this.props.myDashboard.pageNumber * this.props.myDashboard.pageSize,
			totalRows = this.props.myDashboard.totalDashboards
		return (
			<div>
				<Header title="Files" {...this.props} />
				<div className="my-files">
					<div className="page-toolbar">
						<div className="action-tool">
							<label className="checkbox-inline checkbox-lbl-left rtl-checkbox-lbl-left">
								{this.props.l.t('My dashboards', 'My dashboards')}
								<input type="checkbox"
									ref="my Dashboards"
									checked={this.props.myDashboard.myDashboards}
									onChange={(e) => this.onMyDashboardsChecked(e)}
								/>
							</label>
						</div>
						<div className="action-tool">
							<label className="checkbox-inline checkbox-lbl-left rtl-checkbox-lbl-left">
								{this.props.l.t('Global', 'Global')}
								<input type="checkbox"
									ref="globals"
									checked={this.props.myDashboard.globals}
									onChange={(e) => this.onglobalsChecked(e)}
								/>
							</label>
						</div>
						{/* <div className="col-md-3 col-sm-3">
								<CustomSelect name="field-group-options" options={this.state.myDashboard.categories}
									value={this.props.myDashboard.selectedCategory} onChange={(e) => this.onCategoryChange(e)} />
							</div> */}
						<div onClick={() => this.addDashboardClick()} className="action-tool bg-skyblue pointer">
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
											<label className=" col-sm-5 col-md-5 text-primary" style={{ "paddingTop": "6px" }}>View</label>
											<div className="col-sm-7 col-md-7">
												<CustomSelect name="field-group-options" options={this.pagesList}
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
												onPageChange={(e) => this.onPageClick(e)}
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


