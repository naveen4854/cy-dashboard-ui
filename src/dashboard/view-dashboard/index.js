import { browserHistory } from 'react-router';
import { injectReducer } from '../../store/reducers';
import authenticate from '../../authentication/authenticated.hoc';

import ViewDashboardContainer from './view-dashboard.container';
import DashboardReducer from '../dashboard.reducer';
import {DashboardModeEnum} from '../../shared/enums';
// import SettingsReducer from '../../components/widget-configurations/widget-configurations.reducer';
// import StylesReducer from '../../components/style-components/styles.reducer';
// import ThresholdReducer from '../../components/thresholds/threshold.reducer';
// import RealTimeSettingsReducer from '../../components/real-time-settings/real-time-settings.reducer';
// import CyReportSettingsReducer from '../../components/cy-report-settings/cy-report-settings.reducer';
// import CustomMetricsSettingsReducer from '../../components/custom-metrics-settings/custom-metrics-settings.reducer';
// import DataMetricsReducer from '../../components/data-metrics/data-metrics.reducer';
// import ClockMetricsSettingsReducer from '../../components/clock-metrics-settings/clock-metrics-settings.reducer';
// import WidgetsBarReducer from '../../components/widgets-bar/widgets-bar.reducer';


export default (store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
     
      cb(null, authenticate(ViewDashboardContainer))
    }, 'viewdashboard')
  },
  onEnter: (nextState, replace) => {
    injectReducer(store, { key: 'dashboard', reducer: DashboardReducer })
    store.dispatch(store.getState().dashboard.updateDashboardMode(DashboardModeEnum.View))
    store.dispatch(store.getState().dashboard.updateShowIcons(DashboardModeEnum.View))
    store.dispatch(store.getState().dashboard.getDashboardById(nextState.params.id))
  },
})

