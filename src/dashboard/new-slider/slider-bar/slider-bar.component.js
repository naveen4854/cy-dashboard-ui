import React, { Fragment } from 'react';




export default class SliderBar extends React.Component {
	constructor(props) {
		super(props);
	
	}

	render() {
	
		return (
			<React.Fragment>
			
					<div className="page-toolbar dashboard-toolbar">
						<a 
							className="action-tool bg-skyblue" role="button">
							<i className="tool-icon fa fa-arrow-circle-left" />
							<span className="tool-title">{this.props.l.t('Back', 'back')}</span>
						</a>
						<div className="db-actions-left">
							<a
								
								className="action-tool" role="button">
								<i className="tool-icon fa fa-floppy-o" />
								<span className="tool-title">{this.props.l.t('Save', 'Save')}</span>
							</a>
							<a							
								className="action-tool" role="button">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE9SURBVDhPrZOvS0NRHMUvJieYlgQRcVNWVgwWFcS0VaNgtYiuCNufMNBiUQyCwSCKwTZY8ldyZQxcFRaUBbHZnn7O5d7hVXl7Og98+H7fuece3hvMRFG0Ak/viNlinMVB5h7a7DnjhfGM4bXk7EBklqEOW2SmFGR/gTkbkPFJC9b8IsKrOmTuMya0Szx3ITtQiYR3/h8lN0EJxqK7Fwi/wHEDKjCprNdPJbeMahxkasyevpX8Rb0SFqnMup4U8kfM4E1e3ecHws8ReoAdmHe2Fc95XUxSMkToAsahDZvuKHmJROgQDhRiShvO/1VJBjou54vWIAVXcN23RCKYBVvEfIRtKMIolBSI+pVIxKbhDlRwyh39o2f9YRPeMEesESMyw2T3QD92B8bsAcsMnMCl2mM4JpN27ELGFhhjPgBroPJuVh+5rQAAAABJRU5ErkJggg==" />
								<span className="tool-title">{this.props.l.t('Save As', 'Save As')}</span>
							</a>

                            <a className="action-tool pointer" role="button">
								<i className="tool-icon fa fa-desktop" />
								<span className="tool-title">{this.props.l.t('Live', 'Live')}</span>
							</a>
                            <a onClick={this.dashboardDelete} className="action-tool" role="button">
								<i className="tool-icon fa fa-trash" />
								<span className="tool-title">{this.props.l.t('Delete', 'Delete')}</span>
							</a>
						
						
						</div>
					
					
					</div>
				
				
			</React.Fragment>
		);
	}
}
