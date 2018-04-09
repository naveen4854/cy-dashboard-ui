import React, { Component } from 'react'; 

class ActionButton extends Component {


    render() {
        return (
            <div title={this.props.title} className='action-button' onClick={()=>this.props.onActionClick()}>
             <i className={this.props.iconClass} aria-hidden="true"></i> 
            </div>
        );
    }
}

export default ActionButton;


