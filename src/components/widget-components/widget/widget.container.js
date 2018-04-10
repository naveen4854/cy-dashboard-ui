import { connect } from 'react-redux';
import WidgetComponent from './widget.component';
import { DashboardModeEnum } from '../../../shared/enums';
import { pullWidget, toggleSettingsMenu, deleteWidgetAction } from '../../../dashboard/dashboard.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        pullWidgetData: (dashboardId, widgetId, refreshInterval) => {
            dispatch(pullWidget(dashboardId, widgetId, refreshInterval));
        },
        toggleSettingsMenu: (widget) => {
            dispatch(toggleSettingsMenu(widget))
        },

        deleteWidget: (widgetId) => {
            dispatch(deleteWidgetAction(widgetId))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        dashboardMode: state.dashboard.mode,
        dashboardId: state.dashboard.Id,
        showIcons: state.dashboard.showIcons
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetComponent)
