
import * as Reducer from './styles.reducer';

const commonProps = (dispatch) => {
    return {
        testMethod: (abc, key) => {

            alert(key + '  aabbccdd ' + abc)
        },
        updateProp: (value, key) => {
            dispatch(Reducer.updateStyleProperty(value, key));
        },
    }
}

export default commonProps;