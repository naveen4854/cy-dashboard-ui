import { connect } from 'react-redux'
import WidgetConfigurationsComponent from './widget-configurations.component';
import localize from '../localization/localization.hoc';
import { closeConfigurations, tabsChange } from './widget-configurations.actions';
import { PageEnum } from '../../shared/enums';

const mapDispatchToProps = (dispatch) => {
    return {
        closeConfigurations: () => {
            dispatch(closeConfigurations());
        },
        tabsChange: (e) => {
            dispatch(tabsChange(e));
        }
    }
}

const mapStateToProps = (state) => {
    return {
        configurations: state.configurations
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(WidgetConfigurationsComponent, PageEnum.DATA_METRICS))
