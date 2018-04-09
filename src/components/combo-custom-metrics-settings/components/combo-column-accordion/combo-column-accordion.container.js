import { connect } from 'react-redux'
import ComboCustomAccordion from './combo-column-accordion.component';
import * as Actions from '../../combo-custom-metrics-settings.actions';
import localize from '../../../localization/localization.hoc';

const mapDispatchToProps = (dispatch) => {
    return { 
        updateCustomComboColumn: (column) => {
            dispatch(Actions.updateCustomComboColumn(column));
        },
        removeCustomComboColumn: (columnId) => {
            dispatch(Actions.removeCustomComboColumn(columnId));
        },
    }
}

const mapStateToProps = (state) => {
    return {
        columnOptions: state.comboCustomSettings.columnOptions,
        displayFormatOptions: state.comboCustomSettings.displayFormatOptions,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(localize(ComboCustomAccordion))
