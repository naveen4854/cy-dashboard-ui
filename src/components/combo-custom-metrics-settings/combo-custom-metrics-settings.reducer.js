
import { initiateComboCustomSettings } from './combo-custom-metrics-settings.actions'
import { SET_COMBO_REALTIME_STATISTIC_GROUPS } from './combo-custom-metrics-settings.constants';

export const ACTION_HANDLERS = {
    [SET_COMBO_REALTIME_STATISTIC_GROUPS]: (state, action) => {
        return Object.assign({}, state, {
            groupOptions: action.groupOptions
        })
    } ,
}

const initialState = {
    groupOptions: [],
    selectedGroup: {},
    drillDownOptions: [],
    selectedDrilldownOptions: [],
    statisticItems: [],
    comboSelectedStatisticItems: [],
    selectedItem: {},
    displayName: '',
    functionOptions: [],
    selectedFunction: {},
    displayFormatOptions: [],
    selectedDisplayFormat: {},
    applicableWidgets: [],
    selectedWidget: {},
    toggleAddEdit: false,
    initiateComboCustomSettings,

};

export default function ComboCustomSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}