import _ from 'lodash';
import { WidgetTypeEnum, StatisticCategoryEnum, ScrollTypeEnum } from '../../enums';





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
    ia: inputWidget.isAnalog,
    tid: inputWidget.timezoneid,
    tl: inputWidget.tzoneText,
    istfh: !inputWidget.isAnalog ? inputWidget.selectedHoursFormat : 0,
    istd: !inputWidget.isAnalog ? inputWidget.selectedTimeFormat : 0,
    dida: !inputWidget.isAnalog ? inputWidget.displayDate : false,
    didy: !inputWidget.isAnalog ? inputWidget.displayDays : false,
    isl: !inputWidget.isAnalog ? inputWidget.selectedDateFormat : 0,

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
      cc: inputWidget.TimezoneStyles.color,
      cf: inputWidget.TimezoneStyles.fontSize
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

    cdt: !inputWidget.isAnalog ? {
      cc: inputWidget.DateStyles.color,
      cf: inputWidget.DateStyles.fontSize
    } : {},
    cdy: !inputWidget.isAnalog ? {
      cc: inputWidget.DaysStyles.color,
      cf: inputWidget.DaysStyles.fontSize
    } : {},
    cdc: inputWidget.CurrentDayColor,
    ctt: !inputWidget.isAnalog ? {
      cc: inputWidget.TimeStyles.color,
      cf: inputWidget.TimeStyles.fontSize
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
 * map data to widget based on its type
 */
export function WidgetDataMapper(widget, data) {
  switch (data.wrt) {
    case WidgetTypeEnum.Box:
    case WidgetTypeEnum.Progress:
    case WidgetTypeEnum.Speedo:
    case WidgetTypeEnum.CircularProgress:
      widget.displayValue = _.cloneDeep(data.wrdv);
      widget.value = _.cloneDeep(data.wrv);
      break;
    case WidgetTypeEnum.Pie:
    case WidgetTypeEnum.Bar:
      widget.data = _.map(data.wrcc, (d) => {
        return {
          label: d.l,
          data: d.d
        };
      });
      break;
    case WidgetTypeEnum.Picture:
      widget.picturePath = data.pblob;
      widget.pictureStretch = data.wps == 1 ? {
        value: PictureStretchEnum.None,
        label: 'None'
      } : {
          value: PictureStretchEnum.Fill,
          label: 'Fill'
        };
      widget.title = 'picture';
      break;
    case WidgetTypeEnum.Text:
      let scrollType = {
        value: ScrollTypeEnum.None,
        label: 'No Scroll'
      };
      switch (data.twrst) {
        case ScrollTypeEnum.LeftToRight:
          scrollType = {
            value: ScrollTypeEnum.LeftToRight,
            label: 'Left-Right'
          };
          break;
        case ScrollTypeEnum.RightToLeft:
          scrollType = {
            value: ScrollTypeEnum.RightToLeft,
            label: 'Right-Left'
          };
          break;
        case ScrollTypeEnum.TopToBottom:
          scrollType = {
            value: ScrollTypeEnum.TopToBottom,
            label: 'Top-Bottom'
          };
          break;
        case ScrollTypeEnum.BottomToTop:
          scrollType = {
            value: ScrollTypeEnum.BottomToTop,
            label: 'Bottom-Top'
          };
          break;
        default:
          scrollType = {
            value: ScrollTypeEnum.None,
            label: 'No Scroll'
          };

      }
      widget.displayValue = data.wrdv;
      widget.scrollSpeed = data.twrd;
      widget.scrollType = scrollType;
      break;
    case WidgetType.Combo:
      // comboResultMapping(widget, data);
      break;


      widget.previousData = data;
    //return widget;
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
