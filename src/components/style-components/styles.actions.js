import { UPDATE_STYLE_PROP } from "./styles.reducer";
import { ApplyToOptions } from "../../shared/enums";
import { rgba } from "../../utilities";
import { STYLES_UPDATE_APPLY_OPTION } from "./styles.constants";


export function updateMatrixStyles() {
    return (dispatch, getState) => {
        let currentWidget = getState().configurations.widget;

        let comboId = currentWidget.comboId
        let comboWidget = _.find(getState().dashboard.widgets, (widget) => widget.id == comboId);
        let matrix = comboWidget.matrix;
        let styles = getState().styles;
        let selectedApplyTo = styles.selectedApplyTo;
        let updatedCell = {};
        let newMatrix = _.map(matrix, (row, rowIndex) => {
            return _.map(row, (cell, columnIndex) => {
                if (cell.id == currentWidget.id) {
                    updatedCell = {
                        ...cell,
                        ...styles,
                        appliedBackgroundColor: styles.widgetBody.backgroundColor
                    }
                    return updatedCell;
                }
                if (selectedApplyTo == ApplyToOptions.Column && cell.columnId == currentWidget.columnId) {
                    return {
                        ...cell,
                        ...styles,
                        appliedBackgroundColor: styles.widgetBody.backgroundColor
                    }
                }
                if (selectedApplyTo == ApplyToOptions.Row && cell.rowId == currentWidget.rowId) {
                    return {
                        ...cell,
                        appliedBackgroundColor: styles.widgetBody.backgroundColor,
                        widgetBody: styles.widgetBody,
                        valueStyles: styles.valueStyles
                    }
                }
                return cell;
            })
        });
        let updatedWidget = {
            ...comboWidget,
            matrix: newMatrix
        }
        //dispatch(getState().dashboard.updateWidget(updatedWidget));
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