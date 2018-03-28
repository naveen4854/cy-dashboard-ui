import { connect } from 'react-redux'
import StylesComponent from './styles.component';
import localize from '../localization/localization.hoc';
import commonProps from './styles-common-props';
import * as Reducer from './styles.reducer';

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
        displayFormat: state.configurations.widget.appliedSettings.dataMetrics

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(StylesComponent))
