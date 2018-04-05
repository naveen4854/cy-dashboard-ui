import { connect } from 'react-redux';
import WidgetComponent from './widget.component';
import { DashboardModeEnum } from '../../../shared/enums';

const mapDispatchToProps = (dispatch) => {
    return {
        
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
