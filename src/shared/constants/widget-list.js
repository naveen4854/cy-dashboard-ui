import { WidgetTypeEnum } from "../../shared/enums";
import { BarWidget, BoxWidget } from "../../shared/widgets";


const Widgets = [
    {
        widgetType: WidgetTypeEnum.Box,
        text: 'Box',
        normalizedText: 'Box',
        icon: 'fa fa-square-o',
        order: 6
        // getWidget: () => { }
    },
    {
        widgetType: WidgetTypeEnum.Bar,
        text: 'Bar',
        normalizedText: 'Bar',
        icon: 'fa fa-bar-chart',
        order: 3
    },
    {
        widgetType: WidgetTypeEnum.Pie,
        text: 'Pie',
        normalizedText: 'Pie',
        icon: 'fa fa-pie-chart',
        order: 1
    },
    {
        widgetType: WidgetTypeEnum.CircularProgress,
        text: 'Progress',
        normalizedText: 'Progress',
        icon: 'fa fa-circle-o-notch',
        order: 5
    },
    {
        widgetType: WidgetTypeEnum.Speedo,
        text: 'Speedo',
        normalizedText: 'Speedo',
        icon: 'fa fa-dashboard',
        order: 4
    },
    {
        widgetType: WidgetTypeEnum.Progress,
        text: 'Step',
        normalizedText: 'Step',
        icon: 'fa fa-line-chart',
        order: 2
    },
    {
        widgetType: WidgetTypeEnum.Clock,
        text: 'Clock',
        normalizedText: 'Clock',
        icon: 'fa fa-clock-o',
        order: 5
    },
    {
        widgetType: WidgetTypeEnum.Combo,
        text: 'Combo',
        normalizedText: 'Combo',
        icon: 'fa fa-th-large',
        order: 8
    },
    {
        widgetType: WidgetTypeEnum.Text,
        text: 'Text',
        normalizedText: 'Text',
        icon: 'fa fa-text-width',
        order: 9
    },
    {
        widgetType: WidgetTypeEnum.Picture,
        text: 'Picture',
        normalizedText: 'Picture',
        icon: 'fa fa-picture-o',
        order: 10
    }
]

export default Widgets;