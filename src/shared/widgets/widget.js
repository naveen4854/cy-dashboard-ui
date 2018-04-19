import { rgba } from '../../utilities'
export class Widget {
    constructor(props) {
        this.z = props.zIndex || 5;
        this.isComboWidget = props.isComboWidget || false;
        this.isColumnHeader = props.isColumnHeader || false;
        this.isRowHeader = props.isRowHeader || false;
        if (props.isColumnHeader || props.isRowHeader)
            this.setComboHeaderProperties()
    }

    id = Date.now() + Math.floor(Math.random() * 10000) + 1;
    isColumnHeader = false;
    isRowHeader = false;
    isComboWidget = false;

    x = 1;
    y = 1;
    width = 150;
    height = 100;
    z = 1;
    value = 0;
    displayValue = "--";

    showSettings = false;
    showEditor = false;
    showIcons = true;

    title = this.isComboWidget ? '' : "<< Not Configured >>";
    refreshInterval = '';

    appliedSettings = {
        filters: [],
        dataMetrics: {},
        thresholds: []
    }

    // styles
    appliedBackgroundColor = rgba(0, 192, 239, 1);
    widgetBody = {
        backgroundColor: rgba(0, 192, 239, 1),
        fontFamily: 'Arial',
        fontSize: 12,
        color: rgba(0, 0, 0, 1)
    };
    valueStyles = {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };
    titleStyles = {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: 12
    };

    setComboHeaderProperties() {
        this.appliedBackgroundColor = rgba(255, 255, 255, 1);
        this.widgetBody = { ...this.widgetBody, backgroundColor: rgba(255, 255, 255, 1) }
        this.valueStyles = { ...this.valueStyles, color: rgba(0, 0, 0, 1) }
        this.titleStyles = { ...this.titleStyles, color: rgba(0, 0, 0, 1) }
    }

    setDisplayFormat(displayFormat) {
        this.appliedSettings = {
            ...this.appliedSettings,
            dataMetrics: {
                ...this.appliedSettings.dataMetrics,
                displayformat: displayFormat
            }
        }
    }

    setDataMetrics(dataMetrics) {
        this.appliedSettings = {
            ...this.appliedSettings,
            dataMetrics
        }
    }

    applyCommonStyles(styles) {
        this.appliedBackgroundColor = styles.widgetBody.backgroundColor;
        this.widgetBody = styles.widgetBody;
        this.valueStyles = styles.valueStyles;
    }

    applyStyles(styles) {
        this.applyCommonStyles(styles);
    }

    applyThresholds(thresholds) {
        this.appliedSettings = {
            ...this.appliedSettings,
            thresholds
        }
    }

    applySettings(settings) {
        this.appliedSettings = {
            ...settings
        }
    }
}