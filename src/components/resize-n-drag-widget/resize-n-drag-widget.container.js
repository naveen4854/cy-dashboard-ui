import { connect } from 'react-redux'
import RndWidgetComponent from './resize-n-drag-widget.component';
import { updateWidgetZIndex } from '../../dashboard/dashboard.actions'

const mapDispatchToProps = (dispatch) => {
    return {
        updateWidgetSize: (widget) => {
        },
        updateWidgetZIndex: (widget) => {
            dispatch(updateWidgetZIndex(widget))
        },
        updateWidgetPosition: (widget) => {
        },
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RndWidgetComponent)
