import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import authenticate from '../../authentication/authenticated.hoc';

import NewDashboardContainer from './new-dashboard.container';
import DashboardReducer from '../dashboard.reducer';
import SettingsReducer from '../../components/widget-configurations/widget-configurations.reducer';
import StylesReducer from '../../components/styles/styles.reducer';
import ThresholdReducer from '../../components/thresholds/threshold.reducer';
import RealTimeSettingsReducer from '../../components/real-time-settings/real-time-settings.reducer';
import CyReportSettingsReducer from '../../components/cy-report-settings/cy-report-settings.reducer';
import CustomMetricsSettingsReducer from '../../components/custom-metrics-settings/custom-metrics-settings.reducer';
import DataMetricsReducer from '../../components/data-metrics/data-metrics.reducer';

export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'dashboard', reducer: DashboardReducer })
      injectReducer(store, { key: 'configurations', reducer: SettingsReducer })
      injectReducer(store, { key: 'styles', reducer: StylesReducer })
      injectReducer(store, { key: 'threshold', reducer: ThresholdReducer })
      injectReducer(store, { key: 'realTimeSettings', reducer: RealTimeSettingsReducer })
      injectReducer(store, { key: 'cyReportSettings', reducer: CyReportSettingsReducer })
      injectReducer(store, { key: 'customSettings', reducer: CustomMetricsSettingsReducer })
      
      cb(null, authenticate(NewDashboardContainer))
    }, 'newdashboard')
  },
  onEnter: (nextState, replace) => {
    injectReducer(store, { key: 'dataMetrics', reducer: DataMetricsReducer })
    store.dispatch(store.getState().dataMetrics.LoadDataMetricsMetaData())
    // load refreshinterval
  },
})

