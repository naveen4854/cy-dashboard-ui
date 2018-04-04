// import React, { PureComponent } from 'react';
// import { CustomInputText } from '../input-component';

// export default class LabelledInput extends PureComponent {

//   render() {
//     return (

//       <div className="row">
//         <div className="col-xs-12 col-sm-5 col-md-4 labelContent rtl-labelContent-xs labelContent-xs">
//           <label className="control-label inline"> {this.props.label} </label>
//         </div>
//         <div className="col-xs-9 col-sm-7 col-md-4">
//           <CustomInputText
//             updateKey={this.props.updateKey}
//             value={this.props.value}
//             className="form-control"
//             onCustomInputChange={this.props.onCustomInputChange}
//           />
//         </div>
//       </div>
//     )
//   }
// }



import React, { PureComponent } from 'react';
import { CustomInputText } from '../input-component';
import LabelledControl from './labelled-control'

export default class LabelledInput extends PureComponent {

  render() {
    return (
      <div className="marginTop10">
      <LabelledControl label={this.props.label}>
        <CustomInputText
          updateKey={this.props.updateKey}
          value={this.props.value}
          // className="form-control"
          onCustomInputChange={this.props.onCustomInputChange}
        />
      </LabelledControl>
    </div>
    )
  }
}