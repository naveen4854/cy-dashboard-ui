import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash';
var ReactToastr = require("react-toastr");
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import { ResponseStatusEnum } from '../shared/enums'
import { toastr } from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'
import './react-redux-toastr.min.css';

export default class Notification extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.toastrOptions = this.toastrOptions.bind(this)
    }
    
    messageTypes() {
        if (!this.props.notification.persistMessages) {
            toastr.removeByType('error')
            toastr.removeByType('info')
            toastr.removeByType('success')
            toastr.removeByType('warning')
            toastr.removeByType('confirm')
        }

        if (this.props.notification.type && this.props.notification.messages && this.props.notification.messages.length > 0) {
            switch (this.props.notification.type) {
                case ResponseStatusEnum.Success:
                    this.addSuccess();
                    break;
                case ResponseStatusEnum.Error:
                    this.addError();
                    break;
                case ResponseStatusEnum.Warning:
                    this.addWarning();
                    break;
                case ResponseStatusEnum.Info:
                    this.addInfo();
                    break;
                case ResponseStatusEnum.Confirmation:
                    this.showConfirmation();
                    break;
                case ResponseStatusEnum.Custom:
                    this.showCustom();
                    break;
                default:
                    break;
            }
        }
    }
    
    toastrOptions = (func, timeOut, removeOnHover, showCloseButton) => {
        return {
            timeOut,
            position: this.props.notification.isRtl ? "top-left" : "top-right",
            showCloseButton,
            removeOnHover,
            component: (
                func()
            )
        }
    }
    
    componentDidUpdate() {
        this.messageTypes();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return ((!this.props.l && nextProps.l) || !_.isEqual(this.props.notification, nextProps.notification))
    // }

    addSuccess() {
        toastr.success('', this.toastrOptions(this.renderSuccess, 3000, true, false))
    }

    addError() {
        toastr.error('Please fix below errors', this.toastrOptions(this.renderNotifications, 3000, false, true))
    }

    addWarning() {
        toastr.warning('Warning', this.toastrOptions(this.renderNotifications, 3000, true, true))
    }

    addInfo() {
        toastr.error('info', this.toastrOptions(this.renderNotifications, 0, true, true))
    }

    showCustom() {

        let msg = this.props.notification.messages ? this.props.notification.messages[0] : this.props.l.t('Are_you_sure_about_that', 'Are you sure about that!');
        const toastrConfirmOptions = {
            onOk: () => this.props.notification.func.onOk(),
            onCancel: () => this.props.notification.func.onCancel(),
            buttons: [{
                text: 'Save and exit',
                className: 'do-not-apply-btn',
                handler: () => this.props.notification.func.onSaveAndExit()
            }]
        };

        toastr.confirm(msg, toastrConfirmOptions);
    }

    renderNotifications() {
        let messages = _.filter(this.props.notification.messages, (msg) => msg);
        return (
            <ul style={{ listStyle: "disc" }}>
                {
                    _.map(messages,
                        (value, i) => (
                            <li key={i}>{this.props.l.t(value.normalizedMessage, value.displayMessage)}</li>
                        )
                    )
                }
            </ul>
        )
    }

    renderSuccess() {
        return (<div>
            {
                _.map(this.props.notification.messages,
                    (value, i) => (
                        <div key={i}>{this.props.l.t(value.normalizedMessage, value.displayMessage)}</div>
                    )
                )
            }

        </div>
        )
    }

    showConfirmation() {
        const toastrConfirmOptions = {
            okText: this.props.l.t('Yes', 'Yes'),
            cancelText: this.props.l.t('No', 'No'),
            onOk: () => this.props.notification.func.onOk(),
            onCancel: () => this.props.notification.func.onCancel()
        };
        let message = this.props.l.t('Are_you_sure_about_that', 'Are you sure about that!');
        if (this.props.notification.messages)
            message = this.props.l.t(this.props.notification.messages[0].normalizedMessage, this.props.notification.messages[0].displayMessage, this.props.notification.messages[0].params)
        toastr.confirm(message, toastrConfirmOptions);
    }

    render() {
        return (
            <ReduxToastr
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                preventDuplicates
            />
        )
    }

}
