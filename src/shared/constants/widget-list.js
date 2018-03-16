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
    }
]

export default Widgets;