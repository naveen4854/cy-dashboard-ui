
export const INITIALIZE_STYLES = "INITIALIZE_STYLES"
export const UPDATE_STYLE_PROP = "UPDATE_STYLE_PROP"


export function initializeStyles() {
    return (dispatch, getState) => {
        let currentWidget = _.cloneDeep(getState().configurations.widget);

        let title = currentWidget.title;
        let widgetType = currentWidget.widgetType;
        let titleStyles = currentWidget.titleStyles;
        let valueStyles = currentWidget.valueStyles;
        let widgetBody = currentWidget.widgetBody;
        let refreshInterval = currentWidget.refreshInterval;
        let barStyles = currentWidget.barStyles; // only for Bar chart
        let useSelectedBarColor = currentWidget.useSelectedBarColor;// only for Bar chart
        let yAxisStyles = currentWidget.yAxisStyles;// only for Bar chart
        let xAxisStyles = currentWidget.xAxisStyles;// only for Bar chart
        let enableMin = currentWidget.enableMin;// only for Bar chart
        let min = currentWidget.min;
        let enableMax = currentWidget.enableMax;// only for Bar chart
        let max = currentWidget.max;
        let enableBarLines = currentWidget.enableBarLines;
        let showLegends = currentWidget.showLegends;
        let showLabels = currentWidget.showLabels;

        let segmentColors = currentWidget.segmentColors;
        let rangeValueStyles = currentWidget.rangeValueStyles;
        let showMaxValueOnWidget = currentWidget.showMaxValueOnWidget; // only for circular
        let arcColor = currentWidget.arcColor; // only for circular
        let arcWidth = currentWidget.arcWidth;
        let clockbackgroundColor = currentWidget.clockbackgroundColor;
        let clockOuterbackgroundColor = currentWidget.clockOuterbackgroundColor;
        let hands = currentWidget.hands;
        let numberStyles = currentWidget.numberStyles;
        let daysStyles = currentWidget.daysStyles;
        let currentDayColor = currentWidget.currentDayColor;
        let dateStyles = currentWidget.dateStyles;
        let timeStyles = currentWidget.timeStyles;
        let timezoneStyles = currentWidget.timezoneStyles;
        let scrollSpeed = currentWidget.scrollSpeed;
        let scrollType = currentWidget.scrollType;

        //titleStyles.color = '#FF0000';
        dispatch({
            type: INITIALIZE_STYLES,
            title,
            titleStyles,
            valueStyles,
            widgetBody,
            barStyles,
            useSelectedBarColor,
            yAxisStyles,
            xAxisStyles,
            enableMin,
            min,
            enableMax,
            max,
            enableBarLines,
            showLegends,
            showLabels,
            segmentColors,
            rangeValueStyles,
            showMaxValueOnWidget,
            arcColor,
            arcWidth,
            clockbackgroundColor,
            clockOuterbackgroundColor,
            hands,
            numberStyles,
            daysStyles,
            currentDayColor,
            dateStyles,
            timeStyles,
            timezoneStyles,
            scrollSpeed,
            scrollType,
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
            title: styles.title,
            titleStyles: styles.titleStyles,
            valueStyles: styles.valueStyles,
            widgetBody: styles.widgetBody,
            barStyles: styles.barStyles,
            useSelectedBarColor: styles.useSelectedBarColor,
            yAxisStyles: styles.yAxisStyles,
            xAxisStyles: styles.xAxisStyles,
            enableMin: styles.enableMin,
            min: styles.min,
            enableMax: styles.enableMax,
            max: styles.max,
            enableBarLines: styles.enableBarLines,
            showLegends: styles.showLegends,
            showLabels: styles.showLabels,
            segmentColors: styles.segmentColors,
            rangeValueStyles: styles.rangeValueStyles,
            showMaxValueOnWidget: styles.showMaxValueOnWidget,
            arcColor: styles.arcColor,
            arcWidth: styles.arcWidth,
            clockbackgroundColor: styles.clockbackgroundColor,
            clockOuterbackgroundColor: styles.clockOuterbackgroundColor,
            hands: styles.hands,
            numberStyles: styles.numberStyles,
            daysStyles: styles.daysStyles,
            currentDayColor: styles.currentDayColor,
            dateStyles: styles.dateStyles,
            timeStyles: styles.timeStyles,
            timezoneStyles: styles.timezoneStyles,
            scrollSpeed: styles.scrollSpeed,
            scrollType: styles.scrollType,
            refreshInterval: styles.refreshInterval,
            appliedBackgroundColor: styles.widgetBody.backgroundColor
        }

        dispatch(getState().configurations.updateDashboardWidget(updatedWidget));
    }
}

export function updateStyleProperty(key, value) {
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
            yAxisStyles: action.yAxisStyles,
            xAxisStyles: action.xAxisStyles,
            enableMin: action.enableMin,
            min: action.min,
            enableMax: action.enableMin,
            max: action.max,
            enableBarLines: action.enableBarLines,
            showLegends: action.showLegends,
            showLabels: action.showLabels,
            segmentColors: action.segmentColors,
            rangeValueStyles: action.rangeValueStyles,
            showMaxValueOnWidget: action.showMaxValueOnWidget,
            arcColor: action.arcColor,
            arcWidth: action.arcWidth,
            clockbackgroundColor: action.clockbackgroundColor,
            clockOuterbackgroundColor: action.clockOuterbackgroundColor,
            hands: action.hands,
            numberStyles: action.numberStyles,
            daysStyles: action.daysStyles,
            currentDayColor: action.currentDayColor,
            dateStyles: action.dateStyles,
            timeStyles: action.timeStyles,
            timezoneStyles: action.timezoneStyles,
            scrollSpeed: action.scrollSpeed,
            scrollType: action.scrollType,
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