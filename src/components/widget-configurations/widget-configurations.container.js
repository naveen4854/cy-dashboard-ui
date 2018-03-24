import { connect } from 'react-redux'
import WidgetConfigurationsComponent from './widget-configurations.component';
import localize from '../localization/localization.hoc';

const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        configurations: state.configurations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(WidgetConfigurationsComponent))
