import { connect } from 'react-redux'
import DashboardComponent from './dashboard.component';
import { PageEnums } from '../../shared/enums/page-enum';
import localize from "../localization/localization.hoc";


const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(DashboardComponent, PageEnums.NEW_DASHBOARD))
