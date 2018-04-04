import React, { PureComponent } from 'react';
import CustomDock from '../custom-dock';
import { Tab, Tabs } from 'react-bootstrap';
import DataMetricsContainer from '../data-metrics';
import StylesContainer from '../style-components';
import ThresholdTabContainer from '../thresholds';
import {WidgetTypeEnum} from '../../shared/enums';
export default class WidgetConfigurationsComponent extends PureComponent {

    renderTitle() {
        switch (this.props.configurations.widgetType) {

            case WidgetTypeEnum .Box:
                return  this.props.l.t( 'Box_Configurations',  'Box Configurations');

            case WidgetTypeEnum.Progress:
                return  this.props.l.t('Step_Configurations', 'Step Configurations');

            case WidgetTypeEnum.Speedo:
                return  this.props.l.t('Speedo_Configurations', 'Speedo Configurations' );

            case WidgetTypeEnum.Text:
                return  this.props.l.t('Text_Configurations', 'Text Configurations');

            case WidgetTypeEnum.Picture:
                return  this.props.l.t('Picture_Configurations', 'Picture Configurations');

            case WidgetTypeEnum.Pie:
                return  this.props.l.t('Pie_Configurations', 'Pie Configurations' );

            case WidgetTypeEnum.Bar:
                return  this.props.l.t('Bar_Configurations', 'Bar Configurations');

            case WidgetTypeEnum.Clock:
                return  this.props.l.t('Clock_Configurations', 'Clock Configurations');

            case WidgetTypeEnum.CircularProgress:
                return  this.props.l.t('Circular_Progress_Configurations', 'Circular Progress Configurations');

            case WidgetTypeEnum.Combo:
                return this.props.l.t('Combo_Configurations', 'Combo Configurations');

            default:
                return  this.props.l.t('Configurations', 'Configurations');
        }
    }

    render() {
        return (
            <div>
                {this.props.configurations.showPanel &&
                    <div style={{ marginTop: '100px' }}>
                        <CustomDock>
                            <div className='dockHeader'>
                                <span> {this.renderTitle()} </span>
                            </div>
                            <Tabs id="top">
                                <Tab eventKey="first" title={this.props.l.t('Data_Metrics', 'Data Metrics')}>
                                    <DataMetricsContainer />
                                </Tab>
                                <Tab eventKey="se" title={this.props.l.t('Styles', 'Styles')}>
                                    <StylesContainer />
                                </Tab>
                                <Tab eventKey="t" title={this.props.l.t('Thresholds', 'Thresholds')}>
                                    <ThresholdTabContainer />
                                </Tab>
                            </Tabs>
                        </CustomDock>
                    </div>
                }
            </div>
        )
    }
}