import React from 'react';
import { browserHistory } from 'react-router';

export default class WidgetsBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleDocks = this.handleDocks.bind(this);
		this.updateDashboardIsDefault = this.updateDashboardIsDefault.bind(this);
		this.updateDashboardIsGlobal = this.updateDashboardIsGlobal.bind(this);
		this.updateDashboardName = this.updateDashboardName.bind(this);
	}

	componentWillReceiveProps(nextProps) {
	}

	componentDidUpdate() {
	}

	redirectToFiles() {
		// this.props.ResetDashboard();
		browserHistory.push(`/dashboard/mydashboards`)
	}
	handleDocks(e){
//this.props.dashboard.Id ? this.props.UpdateDashboard() : this.props.SaveDashboard()
	}

	updateDashboardIsDefault(e){
		this.props.UpdateProperty('isDefault',e.target.checked);
	}
	updateDashboardIsGlobal(e){
		this.props.UpdateProperty('isGlobal',e.target.checked);
	}
	updateDashboardName(e){
		this.props.UpdateProperty('name',e.target.value);
	}
	

	render() {
		let orderedWidgets = _.orderBy(this.props.widgetsBar.widgets, 'order', 'asc');
		return (
			<div>
				<div className="page-toolbar dashboard-toolbar">
					<a
						onClick={() => { this.handleDocks(); this.onFilesClick() }}
						className="action-tool bg-skyblue" role="button">
						<i className="tool-icon fa fa-arrow-circle-left" />
						<span className="tool-title">{this.props.l.t('Files', 'Files')}</span>
					</a>
					<div className="db-actions-left">
						<a
							onClick={() => { this.handleDocks(); this.props.SaveDashboard() }}
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
						<a onClick={() => { this.handleDocks(); this.props.UpdateViewFlag(true); browserHistory.push(`/dashboard/view/${this.props.dashboard.Id || DefaultDashboardId}`) }} className="action-tool pointer" role="button">
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
								value={this.props.widgetsBar.name}
								onChange={this.updateDashboardName} />
						</div>
						<label className="action-tool">
							<input
								type="checkbox"
								className="tool-icon"
								checked={this.props.widgetsBar.isDefault}
								onChange={this.updateDashboardIsDefault} />
							<span className="tool-title">{this.props.l.t('Default', 'Default')}</span>
						</label>
						<label className="action-tool">
							<input
								type="checkbox"
								className="tool-icon"
								checked={this.props.widgetsBar.isGlobal}
								onChange={this.updateDashboardIsGlobal} />
							<span className="tool-title">{this.props.l.t('Global', 'Global')}</span>
						</label>
						<a onClick={() => this.state.id ? this.showConfirmation(this.props.newDashboard) : this.showConfirmationInNewDashboard()} className="action-tool" role="button">
							<i className="tool-icon fa fa-trash" />
							<span className="tool-title">{this.props.l.t('Delete', 'Delete')}</span>
						</a>
						<a onClick={() => this.props.toggleWidgetMenu(false)} className="action-tool bg-skyblue" role="button">
							<i className='tool-icon fa fa-angle-double-up' aria-hidden="true"></i>
							<span className="tool-title">{this.props.l.t('Hide', 'Hide')}</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
