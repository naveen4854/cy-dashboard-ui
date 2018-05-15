import { connect } from 'react-redux'
import RndWidgetComponent from './resize-n-drag-widget.component';
import { updateWidgetZIndex, updateWidgetSize, updateWidgetPosition } from '../../dashboard/dashboard.actions'
import { PageEnum } from '../../shared/enums';
import localize from '../localization/localization.hoc';

const mapDispatchToProps = (dispatch) => {
    return {
        updateWidgetSize: (width, height, widget) => {
            dispatch(updateWidgetSize(width, height, widget))
        },
        updateWidgetZIndex: (widget) => {
            dispatch(updateWidgetZIndex(widget))
        },
        updateWidgetPosition: (x, y, widget) => {
            dispatch(updateWidgetPosition(x, y, widget))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        disableDrag: state.dashboard.disableDrag,
        mode: state.dashboard.mode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(RndWidgetComponent, PageEnum.NEW_DASHBOARD))
