export const ACTION_HANDLERS = {
    
}

export const newSliderSettingsinitialState = {
    dashboardsList: [],
    
};

export default function NewSliderReducer(state = _.cloneDeep(newSliderSettingsinitialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}