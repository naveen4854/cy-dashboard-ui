import { connect } from 'react-redux'
import StylesComponent from './styles.component';
import localize from '../localization/localization.hoc';
import commonProps from './styles-common-props';
import * as Reducer from './styles.reducer';
import { DisplayFormatEnum, PageEnum } from '../../shared/enums';
import { updateMatrixStyles, updateApplyToOptions, updateApplyComboStyles } from './styles.actions';

const mapDispatchToProps = (dispatch) => {
    //let commons = commonProps(dispatch);
    return {
        updateWidgetStyles: () => {
            dispatch(Reducer.updateWidgetStyles());
        },
        updateProp: (key, value) => {
            dispatch(Reducer.updateStyleProperty(key, value));
        },
        updateFontStyles: (key, fontStyles) => {
            dispatch(Reducer.updateStyleProperty(key, fontStyles));
        },
        updateBackgroundColor: (e) => {
            let widgetBody = {};
            widgetBody.backgroundColor = e;
            dispatch(Reducer.updateStyleProperty('widgetBody', widgetBody));
            // this.props.updateProp(widgetBody, 'widgetBody');
        },
        onSelectingPicture: (e) => {
            dispatch(Reducer.onSelectingPicture(e));
        },
        updateMatrixStyles: () => {
            dispatch(updateMatrixStyles());
        },
        updateMatrixStylesByRow: () => {
            dispatch(Reducer.onSelectingPicture());
        },
        updateApplyToOptions: (applyToOption) => {
            dispatch(updateApplyToOptions(applyToOption));
        },
        updateApplyComboStyles: (applyComboStyles) => {
            dispatch(updateApplyComboStyles(applyComboStyles));
        },
    }
}

const mapStateToProps = (state) => {
    return {
        styles: state.styles,
        displayFormatId: state.configurations.widget.appliedSettings.dataMetrics.displayFormat ?
            state.configurations.widget.appliedSettings.dataMetrics.displayFormat.id :
            DisplayFormatEnum.Number,
        isAnalog: state.configurations.widget.appliedSettings.dataMetrics.isAnalog, // only for clock widget.
        isComboWidget: state.configurations.widget.isComboWidget,
        isRowHeader: state.configurations.widget.isRowHeader,
        isColumnHeader: state.configurations.widget.isColumnHeader,
        selectedStatisticCategory: state.dataMetrics.statisticCategory,
        widgetType: state.configurations.widget.widgetType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(StylesComponent, PageEnum.WIDGET_STYLES))
