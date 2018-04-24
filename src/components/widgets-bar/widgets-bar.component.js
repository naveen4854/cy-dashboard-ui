import React from 'react';
import { browserHistory } from 'react-router';
import { ModalManager as ModalManager, ModalManager as SaveAsModalManager } from 'react-dynamic-modal';
import CustomModalPopUp from '../custom-modal-popup';
import { ResponseStatusEnum, DashboardModeEnum } from '../../shared/enums';
import { DefaultDashboardId } from '../../shared/constants/constants';

export default class WidgetsBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleDocks = this.handleDocks.bind(this);
		this.updateDashboardIsDefault = this.updateDashboardIsDefault.bind(this);
		this.updateDashboardIsGlobal = this.updateDashboardIsGlobal.bind(this);
		this.updateDashboardName = this.updateDashboardName.bind(this);
		this.liveClick = this.liveClick.bind(this);
		this.dashboardDelete = this.dashboardDelete.bind(this);
	}



	redirectToFiles() {
		// this.props.resetDashboard();
		browserHistory.push(`/dashboard/mydashboards`)
	}
	handleDocks(e) {
		this.props.CollapseAllSettingsMenus();
	}

	updateDashboardIsDefault(e) {
		this.props.UpdateProperty('isDefault', e.target.checked);
	}
	updateDashboardIsGlobal(e) {
		this.props.UpdateProperty('isGlobal', e.target.checked);
	}
	updateDashboardName(e) {
		this.props.UpdateProperty('name', e.target.value);
	}
	componentDidUpdate() {
		if (this.props.widgetsBar.showSaveAsModalPopup) {
			SaveAsModalManager.open(<CustomModalPopUp title={this.props.l.t('Save_As_Dashboard', 'Save As Dashboard')} {...this.props}
				okButtonText={this.props.l.t('Save_As', 'Save As')} placeholder="Dashboard Name"
				onRequestClose={this.OnSaveAsCancel.bind(this)}
				SaveClick={(name) => { this.saveAsDashboard(name) }}
				OnCancel={() => { this.OnSaveAsCancel(); }}

			/>);
		}

		if (this.props.widgetsBar.showModalPopup) {
			ModalManager.open(<CustomModalPopUp title={this.props.l.t('Save_Dashboard', 'Save Dashboard')} {...this.props}
				okButtonText={this.props.l.t('Save', 'Save')} placeholder="Dashboard Name"
				onRequestClose={(input) => { this.onRequestClose(input) }}
				SaveClick={(name) => { this.saveDashboard(name) }}
				OnCancel={() => { this.OnCancel() }}

			/>);
		}
	}

	showSaveAsModalPopup() {
		this.props.HandleSaveAsPopUp(true);
	}
	OnSaveAsCancel() {
		this.props.HandleSaveAsPopUp(false);
		SaveAsModalManager.close();
	}
	saveAsDashboard(name) {
		this.props.UpdateProperty("name", name);
		this.handleDocks();
		this.props.HandleSaveAsPopUp(false);
		this.props.SaveAsDashboard();
		SaveAsModalManager.close();
	}
	saveDashboard(name) {
		this.props.UpdateProperty("name", name);
		this.props.SaveDashboard();
		this.props.HandleModalPopup(false);
		ModalManager.close();
	}
	OnCancel() {
		this.props.UpdateProperty("name", '')
		this.props.HandleModalPopup(false);
		ModalManager.close();
	}

	onRequestClose(input) {
		this.props.HandleModalPopup(false);
		this.props.UpdateProperty("name", '')
		ModalManager.close();
	}

	onFilesClick() {
		ModalManager.close();
		this.props.HandleModalPopup(false);
		this.showEditConfirmation();
	}
	deleteDashboard(dashboardId) {
		if (dashboardId) {
			this.props.deleteDashboardInHeader(dashboardId);
		}
	}

	showEditConfirmation() {
		let notifyMessage = this.props.l.t('Are_you_sure_you_want_to_discard_the_changes', 'Are you sure you want to discard the changes?')
		let buttons = [
			{
				text: 'Yes',
				handler: () => this.redirectToFiles()
			},
			{
				text: 'Cancel',
				handler: () => { }
			},
			{
				text: 'Save And Exit',
				handler: () => this.saveAndExitClick()
			}
		]
		this.props.common.custom(notifyMessage, buttons);

	}

	saveAndExitClick() {
		this.handleDocks();
		this.props.UpdateProperty("fromAction", 'Save_and_exit');
		this.props.dashboardId ? this.props.UpdateDashboard() : this.props.SaveDashboard();

	}

	liveClick() {
		this.handleDocks();
		browserHistory.push(`/dashboard/view/${this.props.dashboardId || DefaultDashboardId}`)
	}

	dashboardDelete() {
		let notifyMessage;
		let okHandler;
		switch (this.props.mode) {
			case DashboardModeEnum.New:
				notifyMessage = this.props.l.t('Are_you_sure_you_want_to_discard_the_changes?', 'Are you sure you want to discard the changes?');
				okHandler = () => { this.props.resetDashboard(); browserHistory.push(`/dashboard/mydashboards`) }
				break;
			case DashboardModeEnum.Edit:
				notifyMessage = this.props.l.t('Are_you_sure_you_want_to_delete_$dashboardName_dashboard', 'Are you sure you want to delete ${dashboardName} dashboard?', { 'dashboardName': this.props.dashboardName })
				okHandler = () => { this.deleteDashboard(this.props.dashboardId); this.props.resetDashboard(); browserHistory.push(`/dashboard/mydashboards`) }
				break;
		}
		let buttons = [
			{ text: 'Yes', handler: okHandler },
			{ text: 'No', handler: () => { } }]
			;
		this.props.common.confirm(notifyMessage, buttons);
	}
	toggleWidgetBar(isExpanded) {
		this.props.toggleWidgetBar(isExpanded);
	}

	render() {
		let orderedWidgets = _.orderBy(this.props.widgetsBar.widgetList, 'order', 'asc');
		return (
			<React.Fragment>
				{!this.props.widgetsBar.isExpanded &&
					<div className="page-toolbar dashboard-toolbar">
						<a onClick={() => { this.handleDocks(); this.onFilesClick() }}
							className="action-tool bg-skyblue" role="button">
							<i className="tool-icon fa fa-arrow-circle-left" />
							<span className="tool-title">{this.props.l.t('Files', 'Files')}</span>
						</a>
						<div className="db-actions-left">
							<a
								onClick={() => { this.handleDocks(); this.props.dashboardId ? this.props.UpdateDashboard() : this.props.SaveDashboard(); }}
								className="action-tool" role="button">
								<i className="tool-icon fa fa-floppy-o" />
								<span className="tool-title">{this.props.l.t('Save', 'Save')}</span>
							</a>
							<a
								onClick={() => { this.showSaveAsModalPopup() }}
								className="action-tool" role="button">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE9SURBVDhPrZOvS0NRHMUvJieYlgQRcVNWVgwWFcS0VaNgtYiuCNufMNBiUQyCwSCKwTZY8ldyZQxcFRaUBbHZnn7O5d7hVXl7Og98+H7fuece3hvMRFG0Ak/viNlinMVB5h7a7DnjhfGM4bXk7EBklqEOW2SmFGR/gTkbkPFJC9b8IsKrOmTuMya0Szx3ITtQiYR3/h8lN0EJxqK7Fwi/wHEDKjCprNdPJbeMahxkasyevpX8Rb0SFqnMup4U8kfM4E1e3ecHws8ReoAdmHe2Fc95XUxSMkToAsahDZvuKHmJROgQDhRiShvO/1VJBjou54vWIAVXcN23RCKYBVvEfIRtKMIolBSI+pVIxKbhDlRwyh39o2f9YRPeMEesESMyw2T3QD92B8bsAcsMnMCl2mM4JpN27ELGFhhjPgBroPJuVh+5rQAAAABJRU5ErkJggg==" />
								<span className="tool-title">{this.props.l.t('Save As', 'Save As')}</span>
							</a>



							{/* <a onClick={() => { this.props.CollapseAllSettingsMenus(); browserHistory.push(`/dashboard/preview/${this.props.dashboard.Id}`) }} className="action-tool pointer" role="button">
							<i className="tool-icon fa fa-eye" />
							<span className="tool-title">{this.props.l.t('Preview', 'Preview')}</span>
						</a> */}
							<a onClick={this.liveClick} className="action-tool pointer" role="button">
								<i className="tool-icon fa fa-desktop" />
								<span className="tool-title">{this.props.l.t('Live', 'Live')}</span>
							</a>
						</div>
						<div className="db-item-tools">
							{
								_.map(orderedWidgets, (widget) => {
									return <a key={widget.widgetType} onClick={() => this.props.AddWidget(widget.widgetType)} className="action-tool" role="button">
										<i className={`tool-icon ${widget.icon}`} />
										<span className="tool-title">{this.props.l.t(widget.normalizedText, widget.text)}</span>
									</a>
								})
							}
						</div>
						<div className="db-actions-right">
							<div className="action-tool" style={{ "flexDirection": "row" }}>
								<span className="tool-title margin-right-10 rtl-margin-right-10">{this.props.l.t('Name', 'Name')}</span>
								<input
									type="text"
									className=""
									placeholder="Dashboard name"
									value={this.props.name}
									onChange={this.updateDashboardName} />
							</div>
							<label className="action-tool">
								<input
									type="checkbox"
									className="tool-icon"
									checked={this.props.isDefault}
									onChange={this.updateDashboardIsDefault} />
								<span className="tool-title">{this.props.l.t('Default', 'Default')}</span>
							</label>
							<label className="action-tool">
								<input
									type="checkbox"
									className="tool-icon"
									checked={this.props.isGlobal}
									onChange={this.updateDashboardIsGlobal} />
								<span className="tool-title">{this.props.l.t('Global', 'Global')}</span>
							</label>
							<a onClick={this.dashboardDelete} className="action-tool" role="button">
								<i className="tool-icon fa fa-trash" />
								<span className="tool-title">{this.props.l.t('Delete', 'Delete')}</span>
							</a>
							<a onClick={() => this.toggleWidgetBar(true)} className="action-tool bg-skyblue" role="button">
								<i className='tool-icon fa fa-angle-double-up' aria-hidden="true"></i>
								<span className="tool-title">{this.props.l.t('Hide', 'Hide')}</span>
							</a>
						</div>
					</div>
				}
				{
					this.props.widgetsBar.isExpanded &&
					<div onClick={() => this.toggleWidgetBar(false)} id="corner-triangle-right" className="pointer">
						<div className="corner-triangle-text-right text-capitalize">
							<a target="_blank">
								<i className="fa fa-angle-double-up fa-rotate-45" aria-hidden="true"></i>
							</a>
						</div>
					</div>
				}
			</React.Fragment>
		);
	}
}
