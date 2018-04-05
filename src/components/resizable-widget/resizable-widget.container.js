import { connect } from 'react-redux'
import ResizableWidgetComponent from './resizable-widget.component';
import { updateDraggable, updateComboMatrix } from '../../dashboard/dashboard.actions';


const mapDispatchToProps = (dispatch) => {
    return {
        updateDraggable: (draggable) => {
            dispatch(updateDraggable(draggable));
        },
        updateMatrix: (comboWidgetId, columnIndex, rowIndex, delta) => {
            dispatch(updateComboMatrix(comboWidgetId, columnIndex, rowIndex, delta));
        }
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResizableWidgetComponent)
