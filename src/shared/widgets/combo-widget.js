import { Widget } from "./widget";
import { WidgetTypeEnum } from "../enums";
import { rgba } from "../../utilities";
import BoxWidget from "./box-widget";

export default class ComboWidget extends Widget {
    constructor(props) {
        super(props)
    }
    //id = 102020202; // TODO: temporary till matrix build logic is written
    widgetType = WidgetTypeEnum.Combo;
    width = 450; height = 250;
    comboSelectedStatisticItem = {};
    title = "Combo widget";
    comboSelectedStatisticColumns = [];
    appliedBackgroundColor = rgba(255, 255, 255, 1);
    widgetBody = {
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(0, 0, 0, 1)
    };
    matrix = [
        // [new BoxWidget(1, true, true), new BoxWidget(1, true, true), new BoxWidget(1, true, true)],
        // [new BoxWidget(1, true, false), new BoxWidget(1, true, false), new BoxWidget(1, true, false)],
        // [new BoxWidget(1, true, false), new BoxWidget(1, true, false), new BoxWidget(1, true, false)],
    ];
    appliedSettings =
        {
            ...this.appliedSettings,
            filters: [],
            dataMetrics:
                {
                    ...this.appliedSettings.dataMetrics,
                    comboSelectedStatisticColumns: [],
                    drillDownOptions: []
                },
            thresholds: [],
            group: {}
        }
}