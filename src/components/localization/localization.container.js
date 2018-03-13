import { connect } from 'react-redux';

import LocalizationComponent from './localization.component';
import * as Reducer from './localization.reducer';

const mapDispatchToProps = (dispatch) => {
    return {
        GetLocalizationData: (culture) => {
            dispatch(Reducer.GetLocalizationData(culture));
        },
        GetCollection: () => {
            dispatch(Reducer.GetCollection());
        },
        GenerateNormalizedStringsFile: () => {
            dispatch(Reducer.GenerateNormalizedStringsFile())
        },
        GenerateNormalizedStrings: () => {
            dispatch(Reducer.GenerateNormalizedStrings())
        },
        PageSelectionChanged: (pages) => {
            dispatch(Reducer.PageSelectionChanged(pages))
        }
    }
}

const mapStateToProps = (state) => ({
    l: state.localizationStore
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationComponent)