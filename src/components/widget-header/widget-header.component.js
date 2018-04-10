import React, { PureComponent } from 'react';
import { WidgetTypeEnum } from '../../shared/enums';

export default class WidgetHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.deleteWidget = this.deleteWidget.bind(this);
    }
    deleteWidget() {
        this.props.deleteWidget(this.props.widget.id);
    }
    render() {

        let classToBeApplied = 'widget-heading';

        switch (this.props.widget.widgetType) {
            case WidgetTypeEnum.Combo:
                classToBeApplied = 'combo-widget-heading';
                break;
            default:
                classToBeApplied = 'widget-heading';
                break;
        }

        return (
            !this.props.widget.hideIcon && <div className={classToBeApplied}>
                <div className="widget-heading-icons-section">
                    <i className="widget-heading-icon fa fa-wrench"
                        onClick={() => this.props.toggleSettingsMenu(this.props.widget)} />
                    &nbsp;&nbsp;
                    {
                        !this.props.widget.isComboWidget &&
                        <i className="widget-heading-icon fa fa-trash-o" onClick={this.deleteWidget} />
                    }
                </div>
            </div>
        );
    }
}
