
export const INITIALIZE_STYLES = "INITIALIZE_STYLES"
export const UPDATE_STYLE_PROP = "UPDATE_STYLE_PROP"


export function initializeStyles() {
    return (dispatch, getState) => {
        debugger
        let currentWidget = getState().configurations.widget;
        let title = currentWidget.title;
        let widgetType = currentWidget.widgetType;
        let titleStyles = currentWidget.titleStyles;
        let valueStyles = currentWidget.valueStyles;
        let widgetBody = currentWidget.widgetBody;
        let refreshInterval = currentWidget.refreshInterval;
        let barStyles = currentWidget.barStyles; // only for Bar chart
        let useSelectedBarColor = currentWidget.useSelectedBarColor;// only for Bar chart
        //titleStyles.color = '#FF0000';
        dispatch({
            type: INITIALIZE_STYLES,
            title,
            titleStyles,
            valueStyles,
            widgetBody,
            barStyles,
            refreshInterval,
            useSelectedBarColor,
            widgetType
        })
    }
}


export function updateWidgetStyles() {
    return (dispatch, getState) => {
        debugger
        let currentWidget = getState().configurations.widget;

        let styles = getState().styles;
        let updatedWidget = {
            ...currentWidget,
            title: styles.title,
            titleStyles: styles.titleStyles,
            valueStyles: styles.valueStyles,
            widgetBody: styles.widgetBody,
            barStyles: styles.barStyles,
            refreshInterval: styles.refreshInterval,
            appliedBackgroundColor: styles.widgetBody.backgroundColor
        }

        dispatch(getState().configurations.updateDashboardWidget(updatedWidget));
    }
}

export function updateStyleProperty(key, value) {
    debugger
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
            barStyles: action.barStyles,
            useSelectedBarColor: action.useSelectedBarColor,
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