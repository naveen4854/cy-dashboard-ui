
export const INITIALIZE_STYLES = "INITIALIZE_STYLES"
export const UPDATE_STYLE_PROP = "UPDATE_STYLE_PROP"


export function initializeStyles() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let widgetType = currentWidget.widgetType;
        let titleStyles = currentWidget.titleStyles;
        let valueStyles = currentWidget.valueStyles;
        let widgetBody = currentWidget.widgetBody;
        let refreshInterval = currentWidget.refreshInterval;

        //titleStyles.color = '#FF0000';
        dispatch({
            type: INITIALIZE_STYLES,
            title: currentWidget.title,
            titleStyles,
            valueStyles,
            widgetBody,
            refreshInterval,
            widgetType
        })
    }
}


export function updateWidgetStyles() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;

        let styles = getState().styles;
        let updatedWidget = {
            ...currentWidget,
            titleStyles: styles.titleStyles,
            valueStyles: styles.valueStyles,
            widgetBody: styles.widgetBody,
            refreshInterval: styles.refreshInterval,
            appliedBackgroundColor: styles.widgetBody.backgroundColor
        }

        dispatch(getState().configurations.updateDashboardWidget(updatedWidget));
    }
}

export function updateStyleProperty(value, key) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_STYLE_PROP,
            key,
            value
        })
    }
}

export const ACTION_HANDLERS = {
    [INITIALIZE_STYLES]: (state, action) => {
        return Object.assign({}, state, {
            title: action.title,
            widgetType: action.widgetType,
            titleStyles: action.titleStyles,
            valueStyles: action.valueStyles,
            widgetBody: action.widgetBody,
            refreshInterval: action.refreshInterval
        })
    },
    [UPDATE_STYLE_PROP]: (state, action) => {
        return Object.assign({}, state, {
            [action.key]: action.value,

        })
    }
}

const initialState = {
    initializeStyles
};

export default function StylesReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}