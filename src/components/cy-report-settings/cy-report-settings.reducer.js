

export const ACTION_HANDLERS = {
    
}

const initialState = {
   
};

export default function CyReportSettingsReducer(state = _.cloneDeep(initialState), action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}