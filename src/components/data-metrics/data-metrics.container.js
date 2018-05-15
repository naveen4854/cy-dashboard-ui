import { connect } from 'react-redux'
import DataMetricsComponent from './data-metrics.component';
import localize from '../localization/localization.hoc';
import { PageEnum } from '../../shared/enums';


const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        dataMetrics: state.dataMetrics,
        widgetType: state.configurations.widgetType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DataMetricsComponent, PageEnum.DATA_METRICS))
