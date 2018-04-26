import _ from 'lodash';
import { WidgetTypeEnum, StatisticCategoryEnum, ScrollTypeEnum, PictureStretchEnum, DisplayFormatEnum } from '../../enums';

import { Constants } from '../../constants';
import * as DateZone from '../date-conversion';
import moment from 'moment';
import { BoxWidget } from '../../widgets';
import { rgba } from '../../../utilities';
import { getRandom } from '../../../utilities/utils';
import { getComboMatrix, comboWidgetConfigurationsFromServer } from './combo-utils';
import { stylesMapperToServer } from './styles-utils';
import { mapAppliedSettings } from './settings-utils';
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
      cbb: inputWidget.widgetBody.clockbackgroundColor,
      cobb: inputWidget.widgetBody.clockOuterbackgroundColor,
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

    cdt: !inputWidget.isAnalog ? {
      cc: inputWidget.dateStyles.color,
      cf: inputWidget.dateStyles.fontSize
    } : {},
    cdy: !inputWidget.isAnalog ? {
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
      columns = _.map(inputWidget.appliedSettings.dataMetrics.comboSelectedStatisticColumns, column => {
        return {
          cid: column.id,
          cisiid: column && column.item && column.item.id,
          ciafid: column && column.func && column.func.id,
          cirob: 0,
          ciia: 0,
          cdf: column && column.displayFormat && column.displayFormat.id,
          cwt: column && column.widget && column.widget.value,
          dn: column && column.displayName
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
      comboMatrix = getComboMatrix(inputWidget);

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
    wb: stylesMapperToServer(inputWidget.widgetBody),
    wvs: stylesMapperToServer(inputWidget.valueStyles),
    wts: stylesMapperToServer(inputWidget.titleStyles),
    wrs: stylesMapperToServer(inputWidget.rangeValueStyles),
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
        isc: inputWidget.widgetType == WidgetTypeEnum.Combo && inputWidget.appliedSettings.dataMetrics.columns.length > 0,
        dfId: inputWidget.appliedSettings.dataMetrics.displayFormat ? inputWidget.appliedSettings.dataMetrics.displayFormat.id : DisplayFormatEnum.Text,
        sSp: inputWidget.appliedSettings.dataMetrics.selectedStoreProc ? inputWidget.appliedSettings.dataMetrics.selectedStoreProc.label : undefined,
        prl: inputWidget.appliedSettings.dataMetrics.selectedStoreProc && inputWidget.appliedSettings.dataMetrics.selectedStoreProc.value != 'Select Custom Query' ? inputWidget.appliedSettings.dataMetrics.filterStoreProcs : []
      } : {},
    },
    cs: clckSettings,
    css: clckStyles,
    wenmn: inputWidget.enableMin,
    wenmx: inputWidget.enableMax,
    wenbl: inputWidget.enableBarLines,
    wusbc: inputWidget.useSelectedBarColor,
    wsy: inputWidget.showYAxis,
    wbs: stylesMapperToServer(inputWidget.barStyles),
    wsxs: stylesMapperToServer(inputWidget.xAxisStyles),
    wsys: stylesMapperToServer(inputWidget.yAxisStyles),
    twrd: inputWidget.scrollSpeed,
    twrst: inputWidget.scrollType && inputWidget.scrollType.value,
    wsmv: inputWidget.showMaxValueOnWidget,
    wps: (inputWidget.widgetType == WidgetTypeEnum.Picture) ? inputWidget.pictureStretch.value : undefined, //Property is specific to Picture Widget
    wpsl: (inputWidget.widgetType == WidgetTypeEnum.Picture) ? inputWidget.pictureSelected : undefined, //Property is specific to Picture Widget
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
export function WidgetDataMapper(widget, widgetData) {
  widget = {
    ...widget,
    previousData: widgetData
  }
  const { widgetBody } = widget || {};
  if (widgetBody) {
    widget = {
      ...widget,
      appliedBackgroundColor: widgetData.wrth && widgetData.wrth.thc ? widgetData.wrth.thc : widgetBody.backgroundColor
    }
  }
  switch (widgetData.wrt) {
    case WidgetTypeEnum.Box:
    case WidgetTypeEnum.Progress:
    case WidgetTypeEnum.Speedo:
    case WidgetTypeEnum.CircularProgress:
      return {
        ...widget,
        displayValue: widgetData.wrdv,
        value: widgetData.wrv
      };
      break;
    case WidgetTypeEnum.Pie:
    case WidgetTypeEnum.Bar:
      let data = _.map(widgetData.wrcc, (d) => {
        return {
          label: d.l,
          data: d.d
        };
      });
      return { ...widget, data: data };
      break;
    case WidgetTypeEnum.Picture:
      let pictureStretch = widgetData.wps == 1 ? {
        value: PictureStretchEnum.None,
        label: 'None'
      } : {
          value: PictureStretchEnum.Fill,
          label: 'Fill'
        };

      return {
        ...widget,
        title: 'picture',
        picturePath: widgetData.pblob,
        pictureStretch
      };

      break;
    case WidgetTypeEnum.Text:
      let scrollType = getScrollType(widgetData);
      return {
        ...widget,
        scrollType,
        scrollSpeed: widgetData.twrd,
        displayValue: widgetData.wrdv
      };


      break;
    case WidgetTypeEnum.Combo:
      comboResultMapping(widget, widgetData);
      return _.cloneDeep(widget);
      break;
    default:
      console.log('no ')

    //return widget;
  }
}

function getScrollType(data) {
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
  return scrollType;
}

export function getScrollType(scrollType) {

  switch (scrollType) {
    case ScrollTypeEnum.None:
      return {
        value: ScrollTypeEnum.None,
        label: 'No Scroll'
      };
    case ScrollTypeEnum.RightToLeft:
      return {
        value: ScrollTypeEnum.RightToLeft,
        label: 'Right-Left'
      };
    case ScrollTypeEnum.LeftToRight:
      return {
        value: ScrollTypeEnum.LeftToRight,
        label: 'Left-Right'
      };
    case ScrollTypeEnum.BottomToTop:
      return {
        value: ScrollTypeEnum.BottomToTop,
        label: 'Bottom-Top'
      };
    case ScrollTypeEnum.TopToBottom:
      return {
        value: ScrollTypeEnum.TopToBottom,
        label: 'Top-Bottom'
      }
  }


}

/**
 * To return the notification message based on response type.
 * @param {*} messages 
 * @param {*} responseType 
 */
export function returnMessages(messages, responseType) {
  return _.map(_.filter(messages, msg => msg.ResponseType == responseType), (message) => {
    return {
      displayMessage: message.Message
    }
  });
}

/**
 * mapping the custom combo headers
 * @param {*} cHeader 
 * @param {*} column 
 */
export function mappingCustomMatrixHeaders(cHeader, column) {
  cHeader.displayValue = column.displayName ? column.displayName : column.selectedColumn.label;
  cHeader.column = column.selectedColumn.label;
  cHeader.columnId = column.selectedColumn.value;
  cHeader.rowId = -1; // setting it to -1
  cHeader.dataType = column.selectedColumn.type;
  cHeader.dateFormat = column.dateFormat && column.dateFormat.type;
  cHeader.showZeroValues = column.showZeroValues;
  cHeader.isSummary = column.isSummary;
  cHeader.displayFormatId = Object.keys(column.displayFormat).length > 0 ? column.displayFormat.value : column.displayFormat;
  cHeader.dateFormatId = column.dateFormat && column.dateFormat.value;
  cHeader.aggregateOperationId = column.aggregateOperation && column.aggregateOperation.value ? column.aggregateOperation.value : undefined;
  cHeader.timeFormatId = column.timeFormat && column.timeFormat.value ? column.timeFormat.value : undefined;
  cHeader.hoursFormatId = column.hoursFormat && column.hoursFormat.value ? column.hoursFormat.value : undefined;
  return { ...cHeader };
}

/**
 * To map the matrix and grid result.
 * @param {*} widget 
 * @param {*} data 
 */
function comboResultMapping(widget, data) {
  if (widget.appliedSettings.dataMetrics.statisticCategory == StatisticCategoryEnum.RealTime) {
    let i = 0,
      j = 0;
    for (i = 0; i < data.wrgd.length; i++) {
      for (j = 0; j < data.wrgd[i].length; j++) {
        widget.matrix[i + 1][j].displayValue = data.wrgd[i][j].gddv;
        widget.matrix[i + 1][j].value = data.wrgd[i][j].gdv;
        widget.matrix[i + 1][j].appliedBackgroundColor = data.wrgd[i][j].gdth && data.wrgd[i][j].gdth.thc ? data.wrgd[i][j].gdth.thc : widget.matrix[i + 1][j].widgetBody.backgroundColor;
      }
    }

  } else {
    let oldMatrix = widget.matrix;
    widget.matrix = [_.clone(oldMatrix)[0]];
    for (let i = 0; i < data.wrgd.length; i++) {
      let cellList = [];
      for (let j = 0; j < data.wrgd[i].length; j++) {
        let cell = new BoxWidget(true, 0, false);
        let firstRow = widget.matrix[0];
        let colummCheck = firstRow[j];
        let filterColumns = _.map(firstRow, row => row.column);
        if (Constants.DateTypes.indexOf(colummCheck.dataType) == 1 && (colummCheck.dateFormat || colummCheck.timeFormatId)) {
          let dateTime = new Date(data.wrgd[i][j].gddv);
          let dateTimeData = DateZone.getDateBasedOnFormats(dateTime, widget.matrix[0][j].dateFormat);
          if (colummCheck.timeFormatId) {
            let timeData = DateZone.timeFormat(dateTime, colummCheck.timeFormatId, colummCheck.hoursFormatId);
            dateTimeData = colummCheck.displayFormatId == DisplayFormatEnum.Date_Time ? dateTimeData + ' ' + timeData : timeData;
          }
          data.wrgd[i][j].gddv = dateTimeData;

        } else if (Constants.NumericTypes.indexOf(colummCheck.dataType) != -1) {
          data.wrgd[i][j].gddv = !data.wrgd[i][j].gddv && colummCheck.showZeroValues ? 0 : data.wrgd[i][j].gddv;
          if (colummCheck.displayFormatId == DisplayFormatEnum.Duration) {
            let val = data.wrgd[i][j].gddv ? data.wrgd[i][j].gddv : 0
            let formatter = _.find(Constants.customCombotimeFormat, f => f.id == colummCheck.timeFormatId)
            data.wrgd[i][j].gddv = formatter.convert(val);
          }
        }
        cell.displayValue = data.wrgd[i][j].gddv;
        cell.value = data.wrgd[i][j].gdv;
        cell.isComboWidget = true;
        cell.hideIcon = true;
        cell.comboId = widget.id;
        cell.columnId = colummCheck.columnId;
        cell.valueStyles = _.cloneDeep(oldMatrix[0][j].valueStyles);
        if (colummCheck.isSummary && i == data.wrgd.length - 1) {
          cell.isSummary = colummCheck.isSummary;
          cell.valueStyles = _.merge(cell.valueStyles, { fontWeight: 900 })
        }
        if (colummCheck.appliedSettings.thresholds.length > 0 && !cell.isSummary && data.wrgd[i][j].gdth) {
          cell.appliedBackgroundColor = data.wrgd[i][j].gdth.thc;
        }
        else {
          cell.appliedBackgroundColor = widget.matrix[0][j].widgetBody.backgroundColor;
        }
        cellList.push(cell);
      }
      widget.matrix.push(cellList);
    }
  }
}

export function mapDashboardFromServer(dashboard, dataMetricsMetadata, isEdit) {
  return {
    Id: dashboard.di,
    name: dashboard.dn,
    isGlobal: dashboard.dig,
    isDefault: dashboard.didf,
    category: dashboard.dci,
    widgets: _.map(dashboard.dws, (widget) => {
      switch (widget.wt) {
        case WidgetTypeEnum.Clock:
          return clockWidgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit);
        case WidgetTypeEnum.CircularProgress:
          return circularWidgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit);
        case WidgetTypeEnum.Combo:
          return comboWidgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit);
        case WidgetTypeEnum.Text:
          return textWidgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit);
        case WidgetTypeEnum.Picture:
          return pictureWidgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit);
        default:
          return widgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit);
      }
    })
  }
}

function pictureWidgetConfigurationsFromServer(pictureWidget, dataMetricsMetadata, isEdit) {
  return {
    x: pictureWidget.wxp,
    y: pictureWidget.wyp,
    width: pictureWidget.width,
    height: pictureWidget.height,
    z: pictureWidget.zIndex,
    id: pictureWidget.wid,
    widgetType: pictureWidget.wt,
    PictureSelected: pictureWidget.wpsl
  }
}
function textWidgetConfigurationsFromServer(textWidget, dataMetricsMetadata, isEdit) {
  return {
    x: textWidget.wxp,
    y: textWidget.wyp,
    width: textWidget.width,
    height: textWidget.height,
    z: textWidget.zIndex,
    id: textWidget.wid,
    widgetType: textWidget.wt,
    scrollType: getScrollType(textWidget.twrst),
    scrollSpeed: textWidget.twrd,
    title: textWidget.wtl,

  }
}

function widgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit) {
  let appliedSettings = mapAppliedSettings(widget, isEdit, dataMetricsMetadata)

  return {
    x: widget.wxp,
    y: widget.wyp,
    width: widget.width,
    height: widget.height,
    z: widget.zIndex,
    id: widget.wid,
    widgetType: widget.wt,
    min: widget.wmin,
    max: widget.wmax,
    refreshInterval: widget.wri,
    value: 0,
    displayValue: 0,
    title: widget.wtl,
    appliedBackgroundColor: widget.wb ? widget.wb.sbc : {},
    valueStyles: widget.wvs ? {
      color: widget.wvs.sc,
      fontFamily: widget.wvs.sff,
      fontSize: widget.wvs.sfs
    } :
      {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '36'
      },
    titleStyles: widget.wts ? {
      color: widget.wts.sc,
      fontFamily: widget.wts.sff,
      fontSize: widget.wts.sfs
    } :
      {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '12'
      },
    rangeValueStyles: widget.wrs ? {
      color: widget.wrs.sc,
      fontFamily: widget.wrs.sff,
      fontSize: widget.wrs.sfs
    } :
      {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '12'
      },
    widgetBody: widget.wb ? {
      backgroundColor: widget.wb.sbc,
      color: widget.wb.sc,
      fontFamily: widget.wb.sff,
      fontSize: widget.wb.sfs
    } :
      {
        backgroundColor: rgba(255, 255, 255, 1)
      },
    segmentColors: widget.wsgc && widget.wsgc.length > 0 ? widget.wsgc : [rgba(255, 0, 0, 1), rgba(255, 232, 0, 1), rgba(0, 255, 0, 1)],
    barStyles: widget.wbs ? {
      backgroundColor: widget.wbs.sbc,
      color: widget.wbs.sc,
      fontFamily: widget.wbs.sff,
      fontSize: widget.wbs.sfs
    } :
      {
        backgroundColor: rgba(255, 255, 255, 1)
      },

    xAxisStyles: widget.wsxs ? {
      backgroundColor: widget.wsxs.sbc,
      color: widget.wsxs.sc,
      fontFamily: widget.wsxs.sff,
      fontSize: widget.wsxs.sfs
    } :
      {
        backgroundColor: rgba(255, 255, 255, 1)
      },
    yAxisStyles: widget.wsys ? {
      backgroundColor: widget.wsys.sbc,
      color: widget.wsys.sc,
      fontFamily: widget.wsys.sff,
      fontSize: widget.wsys.sfs
    } :
      {
        backgroundColor: rgba(255, 255, 255, 1)
      },
    enableMin: widget.wenmn,
    enableMax: widget.wenmx,
    enableBarLines: widget.wenbl,
    useSelectedBarColor: widget.wusbc,
    showYAxis: widget.wsy,

    showLabels: widget.sll,
    showLegends: widget.sld,
    appliedSettings: mapAppliedSettings(widget, isEdit, dataMetricsMetadata),
  }
}

/**
 * This methods returns only styles and nothing else. This should be used only in view mode which doesnt need any settings.
 * @param {Circular widget} circularWidget 
 */
function circularWidgetConfigurationsFromServer(circularWidget, dataMetricsMetadata, isEdit) {
  return {
    x: circularWidget.wxp,
    y: circularWidget.wyp,
    width: circularWidget.width,
    height: circularWidget.height,
    z: circularWidget.zIndex,
    id: circularWidget.wid,
    widgetType: circularWidget.wt,
    min: circularWidget.wmin,
    max: circularWidget.wmax,
    refreshInterval: circularWidget.wri,
    value: 0,
    displayValue: 0,
    title: circularWidget.wtl,
    showMaxValueOnWidget: circularWidget.wsmv,
    appliedBackgroundColor: circularWidget.wb ? circularWidget.wb.sbc : {},
    arcColor: circularWidget.cpac ? circularWidget.cpac : rgba(255, 255, 255, 1),
    arcWidth: circularWidget.cpaw ? circularWidget.cpaw : 15,
    valueStyles: circularWidget.wvs ? {
      color: circularWidget.wvs.sc,
      fontFamily: circularWidget.wvs.sff,
      fontSize: circularWidget.wvs.sfs
    } :
      {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '36'
      },
    titleStyles: circularWidget.wts ? {
      color: circularWidget.wts.sc,
      fontFamily: circularWidget.wts.sff,
      fontSize: circularWidget.wts.sfs
    } :
      {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '12'
      },
    rangeValueStyles: circularWidget.wrs ? {
      color: circularWidget.wrs.sc,
      fontFamily: circularWidget.wrs.sff,
      fontSize: circularWidget.wrs.sfs
    } :
      {
        color: rgba(255, 255, 255, 1),
        fontFamily: 'Arial',
        fontSize: '12'
      },

    widgetBody: circularWidget.wb ? {
      backgroundColor: circularWidget.wb.sbc,
      color: circularWidget.wb.sc,
      fontFamily: circularWidget.wb.sff,
      fontSize: circularWidget.wb.sfs
    } :
      {
        backgroundColor: rgba(255, 255, 255, 1)
      },
    appliedSettings: mapAppliedSettings(circularWidget, isEdit, dataMetricsMetadata),

  }
}

function clockWidgetConfigurationsFromServer(clockWidget, dataMetricsMetadata, isEdit) {
  return {
    x: clockWidget.wxp,
    y: clockWidget.wyp,
    width: clockWidget.width,
    height: clockWidget.height,
    z: clockWidget.zIndex,
    id: clockWidget.wid,
    title: clockWidget.wtl,
    widgetType: clockWidget.wt,
    value: 0,
    displayValue: 0,
    appliedSettings: {
      dataMetrics: {
        selectedTimeZoneItem: { 'label': clockWidget.cs.tid, 'value': clockWidget.cs.tid },
        title: clockWidget.wtl,
        timezoneid: clockWidget.cs.tid,
        timezoneLabel: undefined,
        isAnalog: clockWidget.cs.ia,
        tzoneText: clockWidget.cs.tl,
        selectedHoursFormat: !clockWidget.cs.ia ? clockWidget.cs.istfh : 0,
        selectedTimeFormat: !clockWidget.cs.ia ? clockWidget.cs.istd : 0,
        selectedDateFormat: !clockWidget.cs.ia ? clockWidget.cs.isl : 0,
        displayDate: !clockWidget.cs.ia ? clockWidget.cs.dida : false,
        displayDays: !clockWidget.cs.ia ? clockWidget.cs.didy : false,
      }
    },
    widgetBody: {
      clockbackgroundColor: clockWidget.css.cbs.cbb,
      clockOuterbackgroundColor: clockWidget.css.cbs.cobb,
      clockRoundingColor: clockWidget.css.cbs.cbr,

    },
    numberStyles: {
      color: clockWidget.css.cns.cc,
      fontSize: clockWidget.css.cns.cf

    },
    timezoneStyles: {
      color: clockWidget.css.cts.cc,
      fontSize: clockWidget.css.cts.cf,
      fontFamily: clockWidget.css.cts.cff ? clockWidget.css.cts.cff : 'Arial'
    },

    hands: {
      hourhandcolor: clockWidget.css.hhs.ch,
      minutehandcolor: clockWidget.css.mhs.ch,
      secondhandcolor: clockWidget.css.shs.ch
    },
    timeStyles: {

      color: clockWidget.css.ctt.cc ? clockWidget.css.ctt.cc : rgba(0, 0, 0, 1),
      fontSize: clockWidget.css.ctt.cf == 0 ? "11" : clockWidget.css.ctt.cf

    },
    dateStyles: {
      color: clockWidget.css.cdt.cc ? clockWidget.css.cdt.cc : rgba(0, 0, 0, 1),
      fontSize: clockWidget.css.cdt.cf == 0 ? "11" : clockWidget.css.cdt.cf
    },
    currentDayColor: clockWidget.css.cdc ? clockWidget.css.cdc : rgba(0, 0, 0, 1),
    daysStyles: {
      color: clockWidget.css.cdy ? clockWidget.css.cdy.cc ? clockWidget.css.cdy.cc : rgba(0, 0, 0, 1) : rgba(0, 0, 0, 1),
      fontSize: clockWidget.css.cdy ? clockWidget.css.cdy.cf == 0 ? "11" : clockWidget.css.cdy.cf : 11
    },

    cs: clockWidget.cs,
  }
}