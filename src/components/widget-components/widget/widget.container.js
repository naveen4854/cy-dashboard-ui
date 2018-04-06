import { connect } from 'react-redux';
import WidgetComponent from './widget.component';
import { DashboardModeEnum } from '../../../shared/enums';
import { pullWidget } from '../../../dashboard/dashboard.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        pullWidgetData: (dashboardId, widgetId, refreshInterval)=>{
            console.log('dashboardId, widgetId', dashboardId, widgetId);
           dispatch( pullWidget(dashboardId, widgetId, refreshInterval));
        }
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
