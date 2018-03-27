import * as NotificationReducer from "../../components/notifications/notification.reducer";

const commonProps = (dispatch) => {
    return {
        notify: (messages, errorType, persistMessage) => {
            dispatch(NotificationReducer.notify(messages, errorType, persistMessage))
        },
        clearNotifications: () => {
            dispatch(NotificationReducer.ClearNotifications())
        },
        custom: (message, buttons) => {
            dispatch(NotificationReducer.custom(message, buttons))
        },
        confirm: (message, buttons) => {
            debugger
            dispatch(NotificationReducer.confirm(message, buttons))
        }
    }
}

export default commonProps;