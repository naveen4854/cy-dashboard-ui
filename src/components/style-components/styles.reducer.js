
export const INITIALIZE_STYLES = "INITIALIZE_STYLES"
export const UPDATE_STYLE_PROP = "UPDATE_STYLE_PROP"


export function initializeStyles() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;


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

        let ClockbackgroundColor = currentWidget.ClockbackgroundColor;
        let ClockOuterbackgroundColor = currentWidget.ClockOuterbackgroundColor;
        let hands = currentWidget.hands;
        let numberStyles = currentWidget.numberStyles;
        let DaysStyles = currentWidget.DaysStyles;
        let CurrentDayColor = currentWidget.CurrentDayColor;
        let DateStyles = currentWidget.DateStyles;
        let TimeStyles = currentWidget.TimeStyles;
        let TimezoneStyles = currentWidget.TimezoneStyles;

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
            ClockbackgroundColor,
            ClockOuterbackgroundColor,
            hands,
            numberStyles,
            DaysStyles,
            CurrentDayColor,
            DateStyles,
            TimeStyles,
            TimezoneStyles,
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
            ClockbackgroundColor: styles.ClockbackgroundColor,
            ClockOuterbackgroundColor: styles.ClockOuterbackgroundColor,
            hands: styles.hands,
            numberStyles: styles.numberStyles,
            DaysStyles: styles.DaysStyles,
            CurrentDayColor: styles.CurrentDayColor,
            DateStyles: styles.DateStyles,
            TimeStyles: styles.TimeStyles,
            TimezoneStyles: styles.TimezoneStyles,
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
            ClockbackgroundColor: action.ClockbackgroundColor,
            ClockOuterbackgroundColor: action.ClockOuterbackgroundColor,
            hands: action.hands,
            numberStyles: action.numberStyles,
            DaysStyles: action.DaysStyles,
            CurrentDayColor: action.CurrentDayColor,
            DateStyles: action.DateStyles,
            TimeStyles: action.TimeStyles,
            TimezoneStyles: action.TimezoneStyles,
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