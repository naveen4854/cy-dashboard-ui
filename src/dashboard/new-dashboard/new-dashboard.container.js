import { connect } from 'react-redux'

import NewDashboard from "./new-dashboard.component";
import localize from "../../components/localization/localization.hoc";
import { PageEnums } from "../../shared/enums/page-enum";

const mapDispatchToProps = (dispatch) => {
    return {}
}


const mapStateToProps = (state) => {
    console.log('mapStateToProps NewDashboard')
    return {
        dashboard: state.dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(NewDashboard, PageEnums.NEW_DASHBOARD))
