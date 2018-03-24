import React, { PureComponent } from 'react';
import CustomDock from '../custom-dock';
import { Tab, Tabs } from 'react-bootstrap';
import DataMetricsContainer from '../data-metrics';

export default class WidgetConfigurationsComponent extends PureComponent {
    render() {
        return (
            <div>
                {this.props.configurations.showPanel &&
                    <div style={{ marginTop: '100px' }}>
                        <CustomDock>
                            <Tabs id="top">
                                <Tab eventKey="first" title={this.props.l.t('Data_Metrics', 'Data Metrics')}>
                                    <DataMetricsContainer />
                                </Tab>
                                <Tab eventKey="se" title={this.props.l.t('Data_Metrics', 'Data Metrics')}>
                                    style
                        </Tab>
                                <Tab eventKey="t" title={this.props.l.t('Data_Metrics', 'Data Metrics')}>
                                    thresholds
                        </Tab>
                            </Tabs>
                        </CustomDock>
                    </div>
                }
            </div>
        )
    }
}