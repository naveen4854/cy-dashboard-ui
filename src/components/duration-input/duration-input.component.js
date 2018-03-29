import React from 'react'

import { utils} from '../../utilities'
import MaskedInput from '../masked-input';
import ToggleSwitch from '../toggle-switch';
import CustomDatePicker from '../custom-date-picker';
import moment from 'moment';
import { DisplayFormatEnum } from '../../shared/enums';

class DurationInput extends React.Component {

  updateDuration(val, key, displayFormatId) {
    let seconds = utils.convertToSeconds(val, displayFormatId);
    this.props.updatePropOnChange(seconds, key);
  }

  updateDTLevel(val, key) {
    let dt = moment(new Date(+val)).format('MM/DD/YYYY hh:mm A');
    this.props.updatePropOnChange(dt, key);
  }

  render() {

    let { wKey, enableInput, value, displayFormatId } = this.props;
    switch (displayFormatId) {
      case (DisplayFormatEnum.Date_Time):
        return (
          <CustomDatePicker value={value ? value : ''} onChange={(val) => this.updateDTLevel(val, 'levelValue')} />
        );
      case (DisplayFormatEnum.HH_MM_SS):
        return (
          <MaskedInput
            disabled={!enableInput}
            value={utils.generateDurationFormat(value, displayFormatId)}
            onChange={(val) => this.updateDuration(val, wKey, displayFormatId)}
            regex="^(\d+):([0-5]?\d):([0-5]?\d)$" />
        );
      case (DisplayFormatEnum.MM_SS):
        return (
          <MaskedInput
            disabled={!enableInput}
            value={utils.generateDurationFormat(value, displayFormatId)}
            onChange={(val) => this.updateDuration(val, wKey, displayFormatId)}
            regex="^(\d+):([0-5]?\d)$" />
        );
      case (DisplayFormatEnum.Boolean):
        return (
          <ToggleSwitch
            className="form-control"
            checkedNode={value == "" || !value ? "True" : value}
            nodes={[{ label: "True", value: 'True' }, { label: "False", value: 'False' }]}
            onChange={(e) => this.props.updatePropOnChange(e, wKey)} />
        )
      case (DisplayFormatEnum.Text):
        return (
          <input
            disabled={!enableInput}
            className="form-control"
            value={value}
            onChange={(e) => this.props.updatePropOnChange(e.target.value, wKey)} />
        )
      default:
        return (
          <input
            disabled={!enableInput}
            className="form-control"
            value={value}
            onChange={(e) => this.props.updatePropOnChange(e.target.value, wKey)} />
        );
    }
  }
}

export default DurationInput