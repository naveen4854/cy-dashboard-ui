import { UPDATE_DASHBOARDS_LIST } from "./new-slider.constants";
import { fillDashboard } from './new-slider.action';
export const ACTION_HANDLERS = {

  [UPDATE_DASHBOARDS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      dashboardsList: action.updateList
    })
  },
}

export const newSliderSettingsinitialState = {
  dashboardsList: [],
  fillDashboard,

};

export default function NewSliderReducer(state = _.cloneDeep(newSliderSettingsinitialState), action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}