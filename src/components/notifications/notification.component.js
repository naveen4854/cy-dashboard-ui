import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash';
var ReactToastr = require("react-toastr");
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import { ResponseStatusEnum } from '../../shared/enums'
import { toastr } from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'
import './react-redux-toastr.min.css';

export default class Notification extends PureComponent {
    constructor(props) {
        super(props);
        this.toastrOptions = this.toastrOptions.bind(this)
        this.renderNotifications = this.renderNotifications.bind(this)
        this.renderSuccess = this.renderSuccess.bind(this)
        this.showConfirmation = this.showConfirmation.bind(this)
        this.getMessage = this.getMessage.bind(this)
    }

    componentDidUpdate() {
        this.messageTypes();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return ((!this.props.l && nextProps.l) || !_.isEqual(this.props.notification, nextProps.notification))
    // }

    getMessage(message) {
        if (!message)
            return this.props.l.t('Are_you_sure_about_that', 'Are you sure about that!')
        return message.normalizedMessage ? this.props.l.t(message.normalizedMessage, message.displayMessage, message.params) : message.displayMessage;
    }

    messageTypes() {
        if (!this.props.notification.persistMessages) {
            toastr.removeByType('error')
            toastr.removeByType('info')
            toastr.removeByType('success')
            toastr.removeByType('warning')
            toastr.removeByType('confirm')
        }

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
        let okText = _.find(this.props.notification.buttons, 'ok') ? _.find(this.props.notification.buttons, 'ok').text : 'Ok'
        let msg = this.getMessage(this.props.notification.message);
        const toastrConfirmOptions = {
            disableOk: true,
            disableCancel: true,
            okText,
            buttons: this.props.notification.buttons
        };

        toastr.confirm(msg, toastrConfirmOptions);
    }

    showConfirmation() {
        const toastrConfirmOptions = {
            okText: _.find(this.props.notification.buttons, 'ok') ? _.find(this.props.notification.buttons, 'ok').text : this.props.l.t('Yes', 'Yes'),
            cancelText: _.find(this.props.notification.buttons, 'cancel') ? _.find(this.props.notification.buttons, 'cancel').text : this.props.l.t('No', 'No'),
            buttons: this.props.notification.buttons
        };
        let message = this.getMessage(this.props.notification.message);
        toastr.confirm(message, toastrConfirmOptions);
    }

    renderNotifications() {
        let messages = _.filter(this.props.notification.messages, (msg) => msg);
        return (
            <div key={this.props.notification.id}>
                <ul style={{ listStyle: "disc" }}>
                    {
                        _.map(messages,
                            (msg, i) => (
                                <li key={i}>{msg.normalizedMessage ? this.props.l.t(msg.normalizedMessage, msg.displayMessage) : msg.displayMessage}</li>
                            )
                        )
                    }
                </ul>
            </div>
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
