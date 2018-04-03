import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from "../../utilities";

export default class ComboWidget extends Widget {
    constructor(zIndex) {
        super(zIndex)
    }
    widgetType = WidgetTypeEnum.Combo;
    width = 450; height = 250;
    comboSelectedStatisticItem = {};
    title = "Combo widget";
    comboSelectedStatisticItems = [];
    appliedBackgroundColor = rgba(255, 255, 255, 1);
    widgetBody = {
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(0, 0, 0, 1)
    };
    matrix = [];
    appliedSettings =
        {
            ...this.appliedSettings,
            filters: [],
            dataMetrics:
                {
                    ...this.appliedSettings.dataMetrics,
                    comboSelectedStatisticItems: []
                },
            thresholds: [],
            group: {}
        }
}