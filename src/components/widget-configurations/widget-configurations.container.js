import { connect } from 'react-redux'
import WidgetConfigurationsComponent from './widget-configurations.component';
import localize from '../localization/localization.hoc';
import { closeConfigurations } from './widget-configurations.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        closeConfigurations: () => {
            dispatch(closeConfigurations());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        configurations: state.configurations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(WidgetConfigurationsComponent))
