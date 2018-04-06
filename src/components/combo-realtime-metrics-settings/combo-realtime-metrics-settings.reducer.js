
import {initiateComboRealTimeSettings} from './combo-realtime-metrics-settings.actions'

export const ACTION_HANDLERS = {
    
}

const initialState = {
    initiateComboRealTimeSettings
};

export default function ComboRealTimeMetricsSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}