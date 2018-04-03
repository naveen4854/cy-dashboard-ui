import { connect } from 'react-redux'
import StylesComponent from './styles.component';
import localize from '../localization/localization.hoc';
import commonProps from './styles-common-props';
import * as Reducer from './styles.reducer';
import { DisplayFormatEnum } from '../../shared/enums';

const mapDispatchToProps = (dispatch) => {
    //let commons = commonProps(dispatch);
    return {
        updateWidgetStyles: () => {
            dispatch(Reducer.updateWidgetStyles());
        },
        updateProp: ( key, value) => {
            dispatch(Reducer.updateStyleProperty( key, value));
        },
        updateFontStyles: (key, fontStyles) => {
            dispatch(Reducer.updateStyleProperty(key, fontStyles));
        },
        updateBackgroundColor: (e) => {
            let widgetBody = {};
            widgetBody.backgroundColor = e;
            dispatch(Reducer.updateStyleProperty('widgetBody', widgetBody));
           // this.props.updateProp(widgetBody, 'widgetBody');
        }
    }
}

const mapStateToProps = (state) => {
    return {
        styles: state.styles,
        displayFormatId: state.configurations.widget.appliedSettings.dataMetrics.displayFormat ? 
                            state.configurations.widget.appliedSettings.dataMetrics.displayFormat.id : 
                            DisplayFormatEnum.Number,
        isAnalog : state.configurations.widget.appliedSettings.dataMetrics.isAnalog // only for clock widget.

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(StylesComponent))
