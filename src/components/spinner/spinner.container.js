import { connect } from 'react-redux';

import SpinnerComponent from "./spinner.component";
import * as Reducer from './spinner.reducer';

const mapDispatchToProps = (dispatch) => {
  return {
    StartPendingTask: () => {
      dispatch(Reducer.BeginTask())
    },
    StopPendingTask: () => {
      dispatch(Reducer.EndTask())
    },
    StopAllPendingTasks: () => {
      dispatch(Reducer.EndAll())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    spinner: state.spinnerStore,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpinnerComponent)
