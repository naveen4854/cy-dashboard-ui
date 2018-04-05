import { connect } from 'react-redux'
import ResizableWidgetComponent from './resizable-widget.component';
import { updateDraggable } from '../../dashboard/dashboard.actions';


const mapDispatchToProps = (dispatch) => {
    return {
        updateDraggable: (draggable) => {
            dispatch(updateDraggable(draggable));
        }
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResizableWidgetComponent)
