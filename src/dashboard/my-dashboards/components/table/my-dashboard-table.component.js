import React, { PureComponent } from 'react';
import { browserHistory, Router } from 'react-router';
var PropTypes = require('prop-types');
import { ResponseStatusEnum, SortColumnEnum, SortOrderEnum } from '../../../../shared/enums';

export default class MyDashboardTable extends PureComponent {
    constructor(props) {
        super(props);
    }

    viewDashboard(id) {
        browserHistory.push(`/dashboard/view/${id}`);
    }

    editDashboard(id) {
        browserHistory.push(`/dashboard/edit/${id}`);
    }

    deleteDashboard(dashboardId) {
        this.props.DeleteDashboard(dashboardId);
    }

    sortDashboard(sortColumn) {
        let sortOrder = 0;
        if (sortColumn == this.props.myDashboard.sortColumn) {
            sortOrder = this.props.myDashboard.sortOrder == SortOrderEnum.Ascending ? SortOrderEnum.Descending : SortOrderEnum.Ascending
        }
        else {
            sortOrder = SortOrderEnum.Ascending;
        }

        this.props.GetSortedDashboardList(sortColumn, sortOrder);
    }

    showConfirmation(dashboard) {
        let notifyMessage = this.props.l.t('Are_you_sure_you_want_to_delete_$dashboardName_dashboard', 'Are you sure you want to delete ${dashboardName} dashboard?', { 'dashboardName': dashboard.DashboardName })
        let buttons = [
            {
                text: 'Yes',
                handler: () => this.deleteDashboard(dashboard.DashboardId)
            },
            {
                text: 'No',
                handler: () => this.deleteDashboard(dashboard.DashboardId)
            }]

        this.props.common.confirm(notifyMessage, buttons);

        // let buttons1 = [
        //     {
        //         text: 'Yes',
        //         className: 'do-not-apply-btn',
        //         handler: () => this.deleteDashboard(dashboard.DashboardId)
        //     },
        //     {
        //         text: 'No',
        //         className: 'do-not-apply-btn',
        //         handler: () => this.deleteDashboard(dashboard.DashboardId)
        //     }]
        // this.props.common.custom(notifyMessage, buttons1);
        // this.props.common.notify([{ displayMessage: '${a}', params: { 'a': 'bb' } }, 'aaaa'], ResponseStatusEnum.Warning);
        // this.props.common.notify([{ Message: '${a}', params: { 'a': 'bb' } }, 'aaaa'], ResponseStatusEnum.Warning);
    }

    render() {

        let sortIcon = '';
        switch (this.props.myDashboard.sortOrder) {
            case SortOrderEnum.Ascending:
                sortIcon = 'fa fa-arrow-up';
                break;
            case SortOrderEnum.Descending:
                sortIcon = 'fa fa-arrow-down';
                break;
            default: sortIcon = 'fa fa-arrow-down';
                ;
        }

        return (
            <div className="table-responsive">
                <table className="table my-files-table">
                    <colgroup>
                        <col span="1" className="icon" />
                        <col span="1" className="name" />
                        <col span="1" className="modifiedtime" />
                        <col span="1" className="live" />
                        <col span="1" className="edit" />
                        <col span="1" className="delete" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th><label className="text-primary pointer" onClick={() => this.sortDashboard(SortColumnEnum.DashboardName)}> {this.props.myDashboard.sortColumn == SortColumnEnum.DashboardName && <i className={sortIcon} aria-hidden="true"></i>} {this.props.l.t('Dashboard Name', 'Dashboard Name')}</label></th>
                            <th><label className="text-primary pointer text-center" onClick={() => this.sortDashboard(SortColumnEnum.ModifiedDate)}> {this.props.myDashboard.sortColumn == SortColumnEnum.ModifiedDate && <i className={sortIcon} aria-hidden="true"></i>} {this.props.l.t('Modified', 'Modified')}</label></th>
                            <th className="text-center"><label className="text-primary">{this.props.l.t('Live_view', 'Live view')}</label></th>
                            <th className="text-center"><label className="text-primary">{this.props.l.t('Edit', 'Edit')}</label></th>
                            <th className="text-center"><label className="text-primary">{this.props.l.t('Delete', 'Delete')}</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(this.props.myDashboard.userDashboards, (dashboard, i) =>
                                <tr key={i}>
                                    <td className={dashboard.IsOwner ? "" : "text-disabled"}>
                                        <i className={dashboard.IsOwner ? dashboard.IsGlobal ? "fa fa-globe text-primary" : "fa fa-user text-primary" : "fa fa-globe"}></i>
                                    </td>
                                    <td>{dashboard.DashboardName}</td>
                                    <td className="text-center">{dashboard.ModifiedDate}</td>
                                    <td className="text-center">
                                        <a className="pointer" onClick={() => this.viewDashboard(dashboard.DashboardId)}>
                                            <i className="fa fa-desktop"></i>
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        <a className={dashboard.IsOwner ? "pointer" : "text-disabled"} disabled={!dashboard.IsOwner} onClick={() => dashboard.IsOwner ? this.editDashboard(dashboard.DashboardId) : null}>
                                            <i className="fa fa-pencil"></i>
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        <a className={dashboard.IsOwner ? "pointer" : "text-disabled"} disabled={!dashboard.IsOwner} onClick={() => dashboard.IsOwner ? this.showConfirmation(dashboard) : null}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
