import { connect } from 'react-redux';
import WidgetComponent from './widget.component';
import { DashboardModeEnum } from '../../../shared/enums';
import { pullWidget, toggleSettingsMenu, deleteWidgetAction } from '../../../dashboard/dashboard.actions'
import { previewWidget, previewWidgetInLive } from '../../widget-configurations/widget-configurations.actions';

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
        previewWidget: (widget) => {
            dispatch(previewWidget(widget))
        },
        previewWidgetInLive: (widget, refreshInterval) => {
            dispatch(previewWidgetInLive(widget, refreshInterval))
        },
    }
}

const mapStateToProps = (state) => {
    let dashboardMode=state.dashboard.mode
    return {
        dashboardMode,
        dashboardId: state.dashboard.Id,
        WidgetIdforHighlight:(dashboardMode==DashboardModeEnum.New || dashboardMode==DashboardModeEnum.Edit)?state.configurations.widget.id:-1,
        showIcons: (state.dashboard.mode == DashboardModeEnum.New) || (state.dashboard.mode == DashboardModeEnum.Edit)//state.dashboard.showIcons
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetComponent)
