import { rgba } from '../../utilities'
export class Widget {
    constructor(zIndex, isCombo, isHeader) {
        this.zIndex = zIndex || 1;
        this.isCombo = isCombo || false;
        this.isHeader = isHeader || false
    }

    id = Date.now() + Math.floor(Math.random() * 10000) + 1;
    isHeader = false;
    isCombo = false;

    x = 1;
    y = 1;
    width = 150;
    height = 100;
    z = 1;
    showSettings = false;
    showEditor = false;
    showIcons = true;

    value = 0;
    displayValue = "--";
    refreshInterval = '';
    title = this.isCombo ? '' : "<< Not Configured >>";

    appliedSettings = {
        filters: [],
        dataMetrics: {},
        thresholds: []
    }

    // styles
    appliedBackgroundColor = this.isHeader ? rgba(255, 255, 255, 1) : rgba(0, 192, 239, 1);
    widgetBody = {
        backgroundColor: this.isHeader ? rgba(255, 255, 255, 1) : rgba(0, 192, 239, 1),
        fontFamily: 'Arial',
        fontSize: 12,
        color: {
            r: 0, g: 0, b: 0, a: 1
        }
    };
    valueStyles = {
        color: this.isHeader ? {
            r: 0, g: 0, b: 0, a: 1
        } :
            {
                r: 255, g: 255, b: 255, a: 1
            },
        fontFamily: 'Arial',
        fontSize: 12
    };
    titleStyles = {
        color: this.isHeader ? rgba(0, 0, 0, 1) : rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
}