import _ from 'lodash';
import { WidgetTypeEnum, StatisticCategoryEnum } from '../../enums';





/**
 * Map widget with metrics
 * @param {*} inputWidget 
 * @param {*} dataMetricsMetadata 
 */
export function WidgetMapper(inputWidget, dataMetricsMetadata, isLive) {
  let thresholds = [];
  let drillDownData = {};
  let comboMatrix = [];

  if (inputWidget.appliedSettings) {
    thresholds = _.map(inputWidget.appliedSettings.thresholds, threshold => {
      return {
        thv: threshold.levelValue,
        thc: threshold.color, // TODO: Pass Color appropriately
        // SoundFilePath: threshold.soundFile, // TODO: Pass sound file appropriately
        thst: threshold.isContinuous ? 1 : 0, // TODO: Create an enum or have a boolean value for isContinuos
        thea: threshold.emailTo,
        thes: threshold.emailSubject,
        thmn: threshold.smsTo
      };
    });
  }
  let columns = [];
  let metrics = inputWidget.appliedSettings.dataMetrics;
  let clckSettings = WidgetTypeEnum.Clock == inputWidget.widgetType ? {
    ia: metrics.isAnalog,
    tid: metrics.timezoneid,
    tl: metrics.tzoneText,
    istfh: !metrics.isAnalog ? metrics.selectedHoursFormat : 0,
    istd: !metrics.isAnalog ? metrics.selectedTimeFormat : 0,
    dida: !metrics.isAnalog ? metrics.displayDate : false,
    didy: !metrics.isAnalog ? metrics.displayDays : false,
    isl: !metrics.isAnalog ? metrics.selectedDateFormat : 0,

  } : {};
  let clckStyles = WidgetTypeEnum.Clock == inputWidget.widgetType ? {
    cbs: {
      cbb: inputWidget.widgetBody.ClockbackgroundColor,
      cobb: inputWidget.widgetBody.ClockOuterbackgroundColor,
      cbr: inputWidget.widgetBody.clockRoundingColor
    },
    cns: {
      cc: inputWidget.numberStyles.color,
      cf: inputWidget.numberStyles.fontSize
    },
    cts: {
      cc: inputWidget.timezoneStyles.color,
      cf: inputWidget.timezoneStyles.fontSize
    },
    hhs: {
      ch: inputWidget.hands.hourhandcolor
    },
    mhs: {
      ch: inputWidget.hands.minutehandcolor
    },
    shs: {
      ch: inputWidget.hands.secondhandcolor
    },

    cdt: !metrics.isAnalog ? {
      cc: inputWidget.dateStyles.color,
      cf: inputWidget.dateStyles.fontSize
    } : {},
    cdy: !metrics.isAnalog ? {
      cc: inputWidget.daysStyles.color,
      cf: inputWidget.daysStyles.fontSize
    } : {},
    cdc: inputWidget.currentDayColor,
    ctt: !metrics.isAnalog ? {
      cc: inputWidget.timeStyles.color,
      cf: inputWidget.timeStyles.fontSize
    } : {},

  } : {}
  //Since it is box, we have added only one column. this should be updated to support multiple values as well.
  if (inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics) {
    if (inputWidget.widgetType == WidgetTypeEnum.Combo) {
      columns = _.map(inputWidget.appliedSettings.dataMetrics.comboSelectedStatisticItems, eachDataMetrics => {
        return {

          cisiid: eachDataMetrics && eachDataMetrics.item && eachDataMetrics.item.id,
          ciafid: eachDataMetrics && eachDataMetrics.func && eachDataMetrics.func.id,
          cirob: 0,
          ciia: 0,
          cdf: eachDataMetrics && eachDataMetrics.displayFormat && eachDataMetrics.displayFormat.id,
          cwt: eachDataMetrics && eachDataMetrics.widget && eachDataMetrics.widget.value,
          dn: eachDataMetrics && eachDataMetrics.displayName
        };
      });
      const group = _.find(dataMetricsMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group &&
        metric.StatisticGroupId === inputWidget.appliedSettings.dataMetrics.group.id &&
        metric.WidgetType === inputWidget.widgetType &&
        metric.IsFilterId);
      let column = {
        cisiid: group && group.StatisticItemId ? group.StatisticItemId : 0,
        ciafid: group && group.StatisticFunctionId ? group.StatisticFunctionId : 0,
        cirob: 0,
        ciia: 0
      };
      columns = _.filter(columns, c => c.cisiid != column.cisiid);
      columns.splice(0, 0, column);
      //  comboMatrix = GetComboMatrix(inputWidget);

    } else {

      if (inputWidget.widgetType === WidgetTypeEnum.Pie || inputWidget.widgetType === WidgetTypeEnum.Bar) {
        const group = _.find(dataMetricsMetadata, (metric) => inputWidget.appliedSettings.dataMetrics.group &&
          metric.StatisticGroupId === inputWidget.appliedSettings.dataMetrics.group.id &&
          metric.WidgetType === inputWidget.widgetType &&
          metric.IsDrillDownFilter);
        columns.push({
          cisiid: group && group.StatisticItemId ? group.StatisticItemId : 0,
          ciafid: group && group.StatisticFunctionId ? group.StatisticFunctionId : 0,
          cirob: 0,
          ciia: 0
        });

      }
      columns.push({
        cisiid: inputWidget.appliedSettings.dataMetrics.item && inputWidget.appliedSettings.dataMetrics.item.id,
        ciafid: inputWidget.appliedSettings.dataMetrics.func && inputWidget.appliedSettings.dataMetrics.func.id,
        cirob: 0,
        ciia: 0
      });
    }
    if (inputWidget.widgetType == WidgetTypeEnum.Combo) {
      drillDownData = _.map(inputWidget.appliedSettings.dataMetrics.drillDownOptions,
        (option) => option.value || option)
    }
    else {
      drillDownData = _.map(
        _.filter(inputWidget.appliedSettings.dataMetrics.drillDownOptions, (option) => option.checked === undefined || option.checked),
        (option) => option.value || option
      );
    }

  }
  return {
    wxp: inputWidget.x,
    wyp: inputWidget.y,
    width: inputWidget.width,
    height: inputWidget.height,
    zIndex: inputWidget.z,

    wid: inputWidget.id,
    wt: inputWidget.widgetType,
    wmax: inputWidget.max,
    wmin: inputWidget.min,
    wtl: inputWidget.title,
    wri: inputWidget.refreshInterval || -1,
    wsgc: inputWidget.widgetType === WidgetTypeEnum.Speedo ? inputWidget.segmentColors : [],
    wth: thresholds,
    wb: StylesMapperToServer(inputWidget.widgetBody),
    wvs: StylesMapperToServer(inputWidget.valueStyles),
    wts: StylesMapperToServer(inputWidget.titleStyles),
    wrs: StylesMapperToServer(inputWidget.rangeValueStyles),
    ws: {
      // TODO: Need to move it to different function and return appropriate typeofmetric.
      stom: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && inputWidget.appliedSettings.dataMetrics.statisticCategory,
      srt: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics ? {
        rsgid: inputWidget.appliedSettings.dataMetrics.group ? inputWidget.appliedSettings.dataMetrics.group.id : null,
        rsiid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : null,
        rsfid: inputWidget.appliedSettings.dataMetrics.func ? inputWidget.appliedSettings.dataMetrics.func.id : null,
        rsdfid: inputWidget.appliedSettings.dataMetrics.displayFormat ? inputWidget.appliedSettings.dataMetrics.displayFormat.id : null,
        rc: columns,
        rf: drillDownData

      } : {},
      scr: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategoryEnum.CyReport == inputWidget.appliedSettings.dataMetrics.statisticCategory ? {
        rid: inputWidget.appliedSettings.dataMetrics.item ? inputWidget.appliedSettings.dataMetrics.item.id : 0,
        cydfid: inputWidget.appliedSettings.dataMetrics.displayFormat ? inputWidget.appliedSettings.dataMetrics.displayFormat.id : 1,

      } : {},
      sc: inputWidget && inputWidget.appliedSettings && inputWidget.appliedSettings.dataMetrics && StatisticCategoryEnum.Custom == inputWidget.appliedSettings.dataMetrics.statisticCategory ? {
        qry: inputWidget.appliedSettings.dataMetrics.query,
        isc: inputWidget.widgetType == WidgetTypeEnum.Combo && inputWidget.appliedSettings.dataMetrics.levels.length > 0,
        dfId: inputWidget.appliedSettings.dataMetrics.selectedDisplayFormat,
        sSp: inputWidget.appliedSettings.group.selectedStoreProc ? inputWidget.appliedSettings.group.selectedStoreProc.label : undefined,
        prl: inputWidget.appliedSettings.group.selectedStoreProc && inputWidget.appliedSettings.group.selectedStoreProc.value != 'Select Custom Query' ? inputWidget.appliedSettings.dataMetrics.filterStoreProcs : []
      } : {},
    },
    cs: clckSettings,
    css: clckStyles,
    wenmn: inputWidget.enableMin,
    wenmx: inputWidget.enableMax,
    wenbl: inputWidget.enableBarLines,
    wusbc: inputWidget.useSelectedBarColor,
    wsy: inputWidget.showYAxis,
    wbs: StylesMapperToServer(inputWidget.barStyles),
    wsxs: StylesMapperToServer(inputWidget.xAxisStyles),
    wsys: StylesMapperToServer(inputWidget.yAxisStyles),
    twrd: inputWidget.scrollSpeed,
    twrst: inputWidget.scrollType && inputWidget.scrollType.value,
    wsmv: inputWidget.showMaxValueOnWidget,
    wps: (inputWidget.widgetType == WidgetTypeEnum.Picture) ? inputWidget.pictureStretch.value : undefined, //Property is specific to Picture Widget
    wpsl: (inputWidget.widgetType == WidgetTypeEnum.Picture) ? inputWidget.PictureSelected : undefined, //Property is specific to Picture Widget
    mspid: inputWidget.UniqueId,
    wmx: comboMatrix,
    sll: inputWidget.showLabels,
    sld: inputWidget.showLegends,
    isLive: isLive,
    od: inputWidget.previousData
  }
}



/**
 * Map Styles to server obj
 */
function StylesMapperToServer(styles) {
  return styles ? {
    sbc: styles.backgroundColor,
    sc: styles.color,
    sff: styles.fontFamily,
    sfs: styles.fontSize
  } : {};
}