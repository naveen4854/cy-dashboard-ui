import { UPDATE_STYLE_PROP } from "./styles.reducer";
import { ApplyToOptions } from "../../shared/enums";
import { rgba } from "../../utilities";
import { STYLES_UPDATE_APPLY_OPTION, STYLES_APPLY_COMBO_STYLES } from "./styles.constants";


export function updateMatrixStyles() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        let comboId = currentWidget.comboId;
        let comboWidget = _.cloneDeep(_.find(getState().dashboard.widgets, (widget) => widget.id == comboId));
        let matrix = comboWidget.matrix;
        let styles = getState().styles;
        let applyComboStyles = styles.applyComboStyles;
        let selectedApplyTo = styles.selectedApplyTo;
        let updatedCell = {};
        let newMatrix = _.map(matrix, (row, rowIndex) => {
            return _.map(row, (cell, columnIndex) => {
                if (cell.id == currentWidget.id) {
                    if (applyComboStyles) {
                        updatedCell = {
                            ...cell,
                            ...styles,
                            appliedBackgroundColor: comboWidget.widgetBody.backgroundColor,
                            widgetBody: comboWidget.widgetBody,
                            valueStyles: comboWidget.valueStyles,
                            stylesConfigured: true
                        }
                    }
                    else {
                        updatedCell = {
                            ...cell,
                            ...styles,
                            appliedBackgroundColor: styles.widgetBody.backgroundColor,
                            stylesConfigured: true
                        }
                    }
                    return updatedCell;
                }
                if (selectedApplyTo == ApplyToOptions.Column && cell.columnId == currentWidget.columnId) {

                    if (rowIndex != 0) {
                        if (applyComboStyles) {
                            return {
                                ...cell,
                                ...styles,
                                appliedBackgroundColor: comboWidget.widgetBody.backgroundColor,
                                widgetBody: comboWidget.widgetBody,
                                valueStyles: comboWidget.valueStyles,
                                stylesConfigured: true
                            }
                        }

                        return {
                            ...cell,
                            ...styles,
                            appliedBackgroundColor: styles.widgetBody.backgroundColor,
                            stylesConfigured: true
                        }
                    }
                }
                if (selectedApplyTo == ApplyToOptions.Row && cell.rowId == currentWidget.rowId) {
                    if (columnIndex != 0) {
                        if (applyComboStyles) {
                            return {
                                ...cell,
                                appliedBackgroundColor: comboWidget.widgetBody.backgroundColor,
                                widgetBody: comboWidget.widgetBody,
                                valueStyles: comboWidget.valueStyles,
                                stylesConfigured: true
                            }
                        }
                        return {
                            ...cell,
                            appliedBackgroundColor: styles.widgetBody.backgroundColor,
                            widgetBody: styles.widgetBody,
                            valueStyles: styles.valueStyles,
                            stylesConfigured: true
                        }
                    }
                }
                return cell;
            })
        });
        let updatedComboWidget = {
            ...comboWidget,
            matrix: newMatrix
        }
        dispatch(getState().dashboard.updateWidget(updatedComboWidget));
        dispatch(getState().configurations.applyWidget(updatedCell));
    }
}

export function updateMatrixStylesByRow(key, value) {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;
        dispatch({
            type: UPDATE_STYLE_PROP,
            key,
            value
        })
    }
}

export function updateApplyToOptions(applyToOption) {
    return {
        type: STYLES_UPDATE_APPLY_OPTION,
        applyToOption
    }
}

export function updateApplyComboStyles(applyComboStyles) {
    return {
        type: STYLES_APPLY_COMBO_STYLES,
        applyComboStyles
    }
}
export function updateComboStyles() {
    return (dispatch, getState) => {
        let comboWidget = _.cloneDeep(getState().configurations.widget);
        let matrix = comboWidget.matrix;
        let styles = _.cloneDeep(getState().styles);
        // stylesConfigured
        let newMatrix = _.map(matrix, (row, rowIndex) => {
            return _.map(row, (cell, columnIndex) => {
                if (cell.stylesConfigured) {
                    return cell;
                }
                return {
                    ...cell,
                    appliedBackgroundColor: styles.widgetBody.backgroundColor,
                    widgetBody: styles.widgetBody,
                    valueStyles: styles.valueStyles,
                    stylesConfigured: false
                }
                // return updatedCell;
            })
        });


        let updatedComboWidget = {
            ...comboWidget,
            matrix: newMatrix
        }
        dispatch(getState().dashboard.updateWidget(updatedComboWidget));
    }
}