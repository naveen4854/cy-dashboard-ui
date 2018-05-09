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

    // componentWillReceiveProps(nextProps) {
    //     // if (nextProps.notification.id > 0) {
    //     //     this.messageTypes();
    //     // }
    // }

    componentDidUpdate() {
        console.log(this.props.notification)
        this.messageTypes();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return ((!this.props.l && nextProps.l) || !_.isEqual(this.props.notification, nextProps.notification))
    // }

    getMessage(message) {
        if (!message)
            return this.props.l.t('Are_you_sure_about_that', 'Are you sure about that!')
        return this.props.l.t(message.normalizedMessage, message.displayMessage, message.params);
    }

    messageTypes() {
        if (this.props.notification.id < 0)
            return
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

    toastrOptions = (func, timeOut, removeOnHover, showCloseButton, position = 'top') => {
        return {
            timeOut,
            position: this.props.notification.isRtl ? `${position}-left` : `${position}-right`,
            showCloseButton,
            removeOnHover,
            component: (
                func()
            )
        }
    }

    addSuccess() {
        if (this.props.notification.messages.length == 0)
            return
        toastr.success('', this.toastrOptions(this.renderSuccess, 3000, true, false))
    }

    addError() {
        if (this.props.notification.messages.length == 0)
            return
        toastr.error('Please fix below errors', this.toastrOptions(this.renderNotifications, 0, false, true, 'bottom'))
    }

    addWarning() {
        if (this.props.notification.messages.length == 0)
            return
        toastr.warning('Warning', this.toastrOptions(this.renderNotifications, 3000, true, true))
    }

    addInfo() {
        if (this.props.notification.messages.length == 0)
            return
        toastr.info('info', this.toastrOptions(this.renderNotifications, 0, true, true))
    }

    showCustom() {
        if (!this.props.notification.message.displayMessage)
            return
        let okBtn = _.find(this.props.notification.buttons, 'ok');
        let msg = this.getMessage(this.props.notification.message);
        const toastrConfirmOptions = {
            disableOk: true,
            disableCancel: true,
            okText: okBtn ? okBtn.text : this.props.l.t('Ok', 'Ok'),
            onOk: okBtn ? okBtn.handler : {},
            buttons: this.props.notification.buttons
        };
        toastr.confirm(msg, toastrConfirmOptions);
    }

    showConfirmation() {
        if (!this.props.notification.message.displayMessage)
            return
        let okBtn = _.find(this.props.notification.buttons, 'ok');
        let cancelBtn = _.find(this.props.notification.buttons, 'cancel');
        let message = this.getMessage(this.props.notification.message);
        const toastrConfirmOptions = {
            okText: okBtn ? okBtn.text : this.props.l.t('Yes', 'Yes'),
            cancelText: cancelBtn ? cancelBtn.text : this.props.l.t('No', 'No'),
            onOk: okBtn ? okBtn.handler : {},
            onCancel: cancelBtn ? cancelBtn.handler : {}
        };
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
                                <li key={i}>{this.getMessage(msg)}</li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }

    renderSuccess() {
        let messages = _.filter(this.props.notification.messages, (msg) => msg);
        return (<div>
            {
                _.map(messages,
                    (msg, i) => (
                        <div key={i}>{this.getMessage(msg)}</div>
                    )
                )
            }
        </div>
        )
    }

    render() {
        return (
            <h1 style={{ display: 'none' }} />
        )
    }

}
