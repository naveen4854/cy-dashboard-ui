import React, { PureComponent } from 'react';
import CustomDock from '../custom-dock';
import { Tab, Tabs } from 'react-bootstrap';
import Scrollbars from 'react-scrollbar';
import DataMetricsContainer from '../data-metrics';
import StylesContainer from '../style-components';
import ThresholdTabContainer from '../thresholds';
import { WidgetTypeEnum, tabEnum } from '../../shared/enums';
import '../../public/assets/styles/headerStyles.css'

export default class WidgetConfigurationsComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.closeSettingsMenu = this.closeSettingsMenu.bind(this);
    }
    closeSettingsMenu() {
        this.props.closeConfigurations();
    }
    render() {
        return (
            <div>
                {this.props.configurations.showPanel &&
                    <CustomDock>
                        <div className='dockHeader'>
                            <span> {this.renderTitle()} </span>
                            <i
                                className="dock-close-button fa fa-times"
                                onClick={this.closeSettingsMenu}
                            />
                        </div>
                        <Tabs id="top"
                            defaultActiveKey={tabEnum.Data_metrics}
                            activeKey={this.props.configurations.selectedTab}
                            onSelect={(e) => this.props.tabsChange(e)}>

                            {
                                this.props.configurations.showMetricsTab && <Tab eventKey={tabEnum.Data_metrics} title={this.props.l.t('Data_Metrics', 'Data Metrics')}>
                                    <div >
                                        <DataMetricsContainer />
                                    </div>
                                </Tab>
                            }
                            <Tab eventKey={tabEnum.Styles} title={this.props.l.t('Styles', 'Styles')}>
                                <div >
                                    <StylesContainer />
                                </div>
                            </Tab>
                            {
                                this.props.configurations.showThresholdsTab && <Tab eventKey={tabEnum.Thresholds} title={this.props.l.t('Thresholds', 'Thresholds')}>
                                    <div >
                                        <ThresholdTabContainer />
                                    </div>
                                </Tab>
                            }
                        </Tabs>
                    </CustomDock>
                }
            </div>
        )
    }

    renderTitle() {
        switch (this.props.configurations.widgetType) {

            case WidgetTypeEnum.Box:
                return this.props.l.t('Box_Configurations', 'Box Configurations');

            case WidgetTypeEnum.Progress:
                return this.props.l.t('Step_Configurations', 'Step Configurations');

            case WidgetTypeEnum.Speedo:
                return this.props.l.t('Speedo_Configurations', 'Speedo Configurations');

            case WidgetTypeEnum.Text:
                return this.props.l.t('Text_Configurations', 'Text Configurations');

            case WidgetTypeEnum.Picture:
                return this.props.l.t('Picture_Configurations', 'Picture Configurations');

            case WidgetTypeEnum.Pie:
                return this.props.l.t('Pie_Configurations', 'Pie Configurations');

            case WidgetTypeEnum.Bar:
                return this.props.l.t('Bar_Configurations', 'Bar Configurations');

            case WidgetTypeEnum.Clock:
                return this.props.l.t('Clock_Configurations', 'Clock Configurations');

            case WidgetTypeEnum.CircularProgress:
                return this.props.l.t('Circular_Progress_Configurations', 'Circular Progress Configurations');

            case WidgetTypeEnum.Combo:
                return this.props.l.t('Combo_Configurations', 'Combo Configurations');

            default:
                return this.props.l.t('Configurations', 'Configurations');
        }
    }
}