import { connect } from 'react-redux'
import StylesComponent from './styles.component';
import localize from '../localization/localization.hoc';
import commonProps from './styles-common-props';
import * as Reducer from './styles.reducer';
import { DisplayFormatEnum, PageEnum, WidgetTypeEnum } from '../../shared/enums';
import { updateMatrixStyles, updateApplyToOptions, updateApplyComboStyles, updateComboStyles } from './styles.actions';

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
        updateComboStyles: () => {
            dispatch(updateComboStyles());
        },
    }
}

const mapStateToProps = (state) => {
    return {
        styles: state.styles,
        displayFormatId: state.configurations.widget.widgetType == WidgetTypeEnum.Picture || state.configurations.widget.widgetType == WidgetTypeEnum.Text ? DisplayFormatEnum.Number : state.configurations.widget.appliedSettings.dataMetrics.displayFormat ?
            state.configurations.widget.appliedSettings.dataMetrics.displayFormat.id :
            DisplayFormatEnum.Number,
        isAnalog: state.configurations.widget.widgetType == WidgetTypeEnum.Clock ? state.configurations.widget.appliedSettings.dataMetrics.isAnalog : -1,
        isComboWidget: state.configurations.widget.isComboWidget,
        isRowHeader: state.configurations.widget.isRowHeader,
        isColumnHeader: state.configurations.widget.isColumnHeader,
        selectedStatisticCategory: state.dataMetrics.statisticCategory,
        widgetType: state.configurations.widget.widgetType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(StylesComponent, PageEnum.WIDGET_STYLES))
