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
        updateProp: (value, key) => {
            dispatch(Reducer.updateStyleProperty(value, key));
        },
        updateFontStyles: (fontStyles, key) => {
            dispatch(Reducer.updateStyleProperty(fontStyles, key));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        styles: state.styles,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(StylesComponent))
