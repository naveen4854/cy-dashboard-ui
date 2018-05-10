import { connect } from 'react-redux';
import * as Reducer from './reducers/my-dashboard.reducer';

import ListComponent from './list.component';
import localize from '../../components/localization/localization.hoc';
import { PageEnum } from '../../shared/enums';


const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => {
            dispatch(Reducer.userLogout());
        },
        clearNotifications: () => {
            dispatch(Reducer.ClearNotificationsAction())
        },

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ListComponent, PageEnum.MY_DASHBOARD))
