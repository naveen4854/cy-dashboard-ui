import { connect } from 'react-redux'
import SettingsComponent from './settings.component';
import localize from '../localization/localization.hoc';

const mapDispatchToProps = (dispatch) => {
    return {}
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(SettingsComponent))
