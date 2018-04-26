import React, { PureComponent } from 'react';
import { WidgetTypeEnum } from '../../shared/enums';

export default class WidgetHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.deleteWidget = this.deleteWidget.bind(this);
        this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
    }
    deleteWidget() {
        this.props.deleteWidget(this.props.widget.id);
    }
    toggleSettingsMenu() {
        this.props.toggleSettingsMenu(this.props.widget)
    }
    render() {

        let classToBeApplied = 'widget-heading';

        if (this.props.widget.isComboWidget) {
            classToBeApplied = 'inner-widget-heading';
        }
        let styles = this.props.widget.isComboWidget ? { width: this.props.widget.width } : { width: 25 }
        return (
            !this.props.widget.hideIcon && <div className={classToBeApplied} style={styles}>
                <div className="widget-heading-icons-section">
                    <i className="widget-heading-icon fa fa-wrench"
                        onClick={this.toggleSettingsMenu} />
                    {
                        !this.props.widget.isComboWidget &&
                        <i className="widget-heading-icon fa fa-trash-o" onClick={this.deleteWidget} />
                    }
                </div>
            </div>
        );
    }
}
