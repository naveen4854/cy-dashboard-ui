import { WidgetTypeEnum } from "../../shared/enums";
import { BarWidget, BoxWidget } from "../../shared/widgets";


const Widgets = [
    {
        widgetType: WidgetTypeEnum.Box,
        text: 'Box',
        normalizedText: 'Box',
        icon: 'fa fa-square-o',
    },
    {
        widgetType: WidgetTypeEnum.Bar,
        text: 'Bar',
        normalizedText: 'Bar',
        icon: 'fa fa-bar-chart',
    },
    {
        widgetType: WidgetTypeEnum.Pie,
        text: 'Pie',
        normalizedText: 'Pie',
        icon: 'fa fa-pie-chart',
    },
    {
        widgetType: WidgetTypeEnum.CircularProgress,
        text: 'Progress',
        normalizedText: 'Progress',
        icon: 'fa fa-circle-o-notch',
    },
    {
        widgetType: WidgetTypeEnum.Speedo,
        text: 'Speedo',
        normalizedText: 'Speedo',
        icon: 'fa fa-dashboard',
    }
]

export default Widgets;