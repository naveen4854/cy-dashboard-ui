import { connect } from 'react-redux'
import BoxStylesComponent from './box-styles.component';
import localize from '../../localization/localization.hoc';
import commonProps from '../styles-common-props';


const mapDispatchToProps = (dispatch) => {
    
    let commons = commonProps(dispatch);
    return {
        ...commons,
        testMethod1 : () => {

        }
    }
}

const mapStateToProps = (state) => {
    return {
        styles : state.styles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(BoxStylesComponent))
 