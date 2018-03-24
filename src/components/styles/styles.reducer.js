
export const INITIALIZE_STYLES = "INITIALIZE_STYLES"
export const UPDATE_STYLE_PROP = "UPDATE_STYLE_PROP"


export function initializeStyles() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let widgetType = currentWidget.widgetType;
        let titleStyles = currentWidget.titleStyles;
        titleStyles.color = '#FF0000';
        dispatch({
            type: INITIALIZE_STYLES,
            title: currentWidget.title,
            titleStyles,
            widgetType
        })
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
            titleStyles: action.titleStyles
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