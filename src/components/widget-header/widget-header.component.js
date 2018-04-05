import React, { PureComponent } from 'react';
import { WidgetTypeEnum } from '../../shared/enums';

export default class WidgetHeader extends PureComponent {

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
                        <i className="widget-heading-icon fa fa-trash-o" onClick={() => this.props.DeleteWidget(this.props.widget.id)} />
                    }
                </div>
            </div>
        );
    }
}
