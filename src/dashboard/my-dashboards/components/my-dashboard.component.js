import React, { PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
import ReactPaginate from 'react-paginate';

import MyDashboardTable from './table';
import Header from '../../../components/header';

export default class MyDashboard extends PureComponent {
	constructor(props) {
		super(props);
		this.onMyDashboardsChecked = this.onMyDashboardsChecked.bind(this);
		this.onglobalsChecked = this.onglobalsChecked.bind(this);
		this.onPageClick = this.onPageClick.bind(this);
		this.test = this.test.bind(this);
		this.testU = this.testU.bind(this);
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
		browserHistory.push(`/dashboard/new`);
	}

	onPageClick(e){
		this.props.SetPageNumberAndGetDashboardsList(e.selected + 1);
	}

	test() {
		this.props.test();
	}
	testU() {
		this.props.testU();
	}
	
	render() {
		const pageStart = (this.props.myDashboard.pageNumber - 1) * this.props.myDashboard.pageSize + 1,
			pageEnd = this.props.myDashboard.pageNumber * this.props.myDashboard.pageSize,
			totalRows = this.props.myDashboard.totalDashboards
		return (
			<div>
				<Header title="Files" {...this.props} />
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
						{/* <div className="col-md-3 col-sm-3">
								<CustomSelect name="field-group-options" options={this.state.myDashboard.categories}
									value={this.props.myDashboard.selectedCategory} onChange={(e) => this.onCategoryChange(e)} />
							</div> */}
						<div onClick={this.addDashboardClick} className="action-tool bg-skyblue pointer">
							<a><i className="fa fa-plus" aria-hidden="true"></i> Add dashboard</a>
						</div>
						{/* <div onClick={this.test} className="action-tool bg-skyblue pointer">
							<a><i className="fa fa-plus" aria-hidden="true"></i> test</a>
						</div>
						<div onClick={this.testU} className="action-tool bg-skyblue pointer">
							<a><i className="fa fa-plus" aria-hidden="true"></i> testU</a>
						</div> */}
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
									{/* <div className="col-xs-2 col-sm-3 col-md-4 col-lg-5">
										<div className={"pull-left rtl-pull-left"}>
											<label className=" col-sm-5 col-md-5 text-primary" style={{ "paddingTop": "6px" }}>View</label>
											<div className="col-sm-7 col-md-7">
												<CustomSelect name="field-group-options" options={this.pagesList}
													value={this.props.myDashboard.pageSize} onChange={(e) => this.onPageSizeChange(e)} />
											</div>
										</div>
									</div> */}

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


