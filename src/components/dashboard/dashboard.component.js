import React, { PureComponent } from 'react';


export default class DashboardComponent extends PureComponent {
    render() {
        return (
            <div>
                {
                    _.map(this.props.dashboard.widgets, widget =>
                        <h1>hey!!</h1>
                    )
                }
            </div>
        )
    }
}