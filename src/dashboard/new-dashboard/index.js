import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import authenticate from '../../authentication/authenticated.hoc';

import NewDashboardContainer from './new-dashboard.container';
import DashboardReducer from '../dashboard.reducer';
import SettingsReducer from '../../components/widget-configurations/widget-configurations.reducer';
import StylesReducer from '../../components/style-components/styles.reducer';
import ThresholdReducer from '../../components/thresholds/threshold.reducer';
import RealTimeSettingsReducer from '../../components/real-time-settings/real-time-settings.reducer';
import CyReportSettingsReducer from '../../components/cy-report-settings/cy-report-settings.reducer';
import CustomMetricsSettingsReducer from '../../components/custom-metrics-settings/custom-metrics-settings.reducer';
import DataMetricsReducer from '../../components/data-metrics/data-metrics.reducer';
import ClockMetricsSettingsReducer from '../../components/clock-metrics-settings/clock-metrics-settings.reducer';
import WidgetsBarReducer from '../../components/widgets-bar/widgets-bar.reducer';
import ComboRealTimeSettingsReducer from '../../components/combo-realtime-metrics-settings/combo-realtime-metrics-settings.reducer';
import ComboCustomSettingsReducer from '../../components/combo-custom-metrics-settings/combo-custom-metrics-settings.reducer';

export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'dashboard', reducer: DashboardReducer })
      injectReducer(store, { key: 'configurations', reducer: SettingsReducer })
      injectReducer(store, { key: 'styles', reducer: StylesReducer })
      injectReducer(store, { key: 'threshold', reducer: ThresholdReducer })
      injectReducer(store, { key: 'realTimeSettings', reducer: RealTimeSettingsReducer })
      injectReducer(store, { key: 'cyReportSettings', reducer: CyReportSettingsReducer })
      injectReducer(store, { key: 'widgetsBar', reducer: WidgetsBarReducer })
      // injectReducer(store, { key: 'comboSettings', reducer: ComboSettingsMetricsReducer })
      injectReducer(store, { key: 'comboRealTimeSettings', reducer: ComboRealTimeSettingsReducer })
      injectReducer(store, { key: 'combocustomSettings', reducer: ComboCustomSettingsReducer })

      
      cb(null, authenticate(NewDashboardContainer))
    }, 'newdashboard')
  },
  onEnter: (nextState, replace) => {
    injectReducer(store, { key: 'dataMetrics', reducer: DataMetricsReducer })
    store.dispatch(store.getState().dataMetrics.LoadDataMetricsMetaData())
    
    injectReducer(store, { key: 'clockSettings', reducer: ClockMetricsSettingsReducer })
    store.dispatch(store.getState().clockSettings.setTimeZonesList())
    
    injectReducer(store, { key: 'customSettings', reducer: CustomMetricsSettingsReducer })
    store.dispatch(store.getState().customSettings.getStoredProcedures());
    // load refreshinterval
  },
})

