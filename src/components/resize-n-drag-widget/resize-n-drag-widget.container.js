import { connect } from 'react-redux'
import RndWidgetComponent from './resize-n-drag-widget.component';
import { updateWidgetZIndex, updateWidgetSize, updateWidgetPosition } from '../../dashboard/dashboard.actions'

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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RndWidgetComponent)
