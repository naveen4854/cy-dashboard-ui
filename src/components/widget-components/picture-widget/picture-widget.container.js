import { connect } from 'react-redux'
import PictureWidgetComponent from './picture-widget.component';
import * as DashboardActions from '../../../dashboard/dashboard.actions';

const mapDispatchToProps = (dispatch) => {
    return {
        PreviewActionPicture: (dashboardId, widgetid) => {
            dispatch(DashboardActions.PreviewActionPicture(dashboardId, widgetid))
        }
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PictureWidgetComponent)
