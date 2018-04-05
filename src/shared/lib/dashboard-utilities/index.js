import _ from 'lodash';
import { WidgetTypeEnum, StatisticCategoryEnum, ScrollTypeEnum, PictureStretchEnum, DisplayFormatEnum } from '../../enums';


import { Constants } from '../../constants';
import * as DateZone from '../date-conversion';
import moment from 'moment';
import { BoxWidget } from '../../widgets';




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
    case WidgetTypeEnum.Combo:
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


export function getSelectedGroup(group, metrics) {
  var selectedGroup = _.find(metrics, {
    'StatisticGroupId': group.rsgid
  });
  if (selectedGroup) {
    return {
      id: selectedGroup.StatisticGroupId,
      label: selectedGroup.StatisticGroup,
      value: selectedGroup.Id
    }
  } else {
    return {
      id: group.rsgid,
      label: 'metrics unavailable'
    }
  }

}

export function getSelectedItem(item, metrics) {
  var selectedItem = _.find(metrics, {
    'StatisticItemId': item.rsiid
  });
  if (selectedItem) {
    return {
      id: selectedItem.StatisticItemId,
      label: selectedItem.StatisticItem,
      value: selectedItem.Id
    }
  } else {
    return {
      id: item.rsiid,
      label: 'metrics unavailable'
    }
  }


}

export function getSelectedFunction(func, metrics) {
  var selectedFunc = _.find(metrics, {
    'StatisticFunctionId': func.rsfid
  });
  if (selectedFunc) {
    return {
      id: selectedFunc.StatisticFunctionId,
      label: selectedFunc.StatisticFunction,
      value: selectedFunc.Id
    }
  } else {
    return {
      id: func.rsfid,
      label: 'metrics unavailable'
    }

  }

}

export function getDisplayFormat(displayFormat, metrics) {
  var selectedDisplayFormat = _.find(metrics, {
    'DisplayFormatId': displayFormat
  });
  if (selectedDisplayFormat) {
    return {
      id: selectedDisplayFormat.DisplayFormatId,
      label: selectedDisplayFormat.DisplayFormat,
      value: selectedDisplayFormat.Id
    }
  } else {
    return {
      id: displayFormat,
      label: 'metrics unavailable'
    }
  }

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

function mapThresholds(thresholds) {
  let givenThresholds = _.map(thresholds, (eachThreshold, index) => {
    let id = Date.now();
    return {
      id: id + index,
      level: index + 1,
      levelValue: eachThreshold.thv,
      color: eachThreshold.thc, // TODO: Pass Color appropriately
      // SoundFilePath: eachThreshold.soundFile, // TODO: Pass sound file appropriately
      isContinuous: eachThreshold.thst ? true : false, // TODO: Create an enum or have a boolean value for isContinuos
      emailTo: eachThreshold.thea,
      emailSubject: eachThreshold.thes,
      smsTo: eachThreshold.thmn
    }
  })
  return givenThresholds
}

export function dashboard(dashboard, dataMetricsMetadata, isEdit) {
  debugger
  return {
    Id: dashboard.di,
    name: dashboard.dn,
    isGlobal: dashboard.dig,
    isDefault: dashboard.didf,
    category: dashboard.dci,
    widgets: _.map(dashboard.dws, (widget) => {
      switch (widget.wt) {
        case WidgetTypeEnum.Clock:

          return {
            x: widget.wxp,
            y: widget.wyp,
            width: widget.width,
            height: widget.height,
            z: widget.zIndex,
            id: widget.wid,
            widgetType: widget.wt,
            value: 0,
            displayValue: 0,
            appliedSettings: {
              dataMetrics: {
                selectedTimeZoneItem: { 'label': widget.cs.tid, 'value': widget.cs.tid },
                title: widget.wtl,
                timezoneid: widget.cs.tid,
                timezoneLabel: undefined,
                isAnalog: widget.cs.ia,
                tzoneText: widget.cs.tl,
                selectedHoursFormat: !widget.cs.ia ? widget.cs.istfh : 0,
                selectedTimeFormat: !widget.cs.ia ? widget.cs.istd : 0,
                selectedDateFormat: !widget.cs.ia ? widget.cs.isl : 0,
                displayDate: !widget.cs.ia ? widget.cs.dida : false,
                displayDays: !widget.cs.ia ? widget.cs.didy : false,
              }
            },
            widgetBody: {
              clockbackgroundColor: widget.css.cbs.cbb,
              clockOuterbackgroundColor: widget.css.cbs.cobb,
              clockRoundingColor: widget.css.cbs.cbr,

            },
            numberStyles: {
              color: widget.css.cns.cc,
              fontSize: widget.css.cns.cf

            },
            timezoneStyles: {
              color: widget.css.cts.cc,
              fontSize: widget.css.cts.cf,
              fontFamily: widget.css.cts.cff ? widget.css.cts.cff : 'Arial'
            },

            hands: {
              hourhandcolor: widget.css.hhs.ch,
              minutehandcolor: widget.css.mhs.ch,
              secondhandcolor: widget.css.shs.ch
            },
            timeStyles: {

              color: widget.css.ctt.cc ? widget.css.ctt.cc : {
                r: 0, g: 0, b: 0, a: 1
              },
              fontSize: widget.css.ctt.cf == 0 ? "11" : widget.css.ctt.cf

            },
            dateStyles: {
              color: widget.css.cdt.cc ? widget.css.cdt.cc : { r: 0, g: 0, b: 0, a: 1 },
              fontSize: widget.css.cdt.cf == 0 ? "11" : widget.css.cdt.cf
            },
            currentDayColor: widget.css.cdc ? widget.css.cdc : { r: 0, g: 0, b: 0, a: 1 },
            daysStyles: {
              color: widget.css.cdy ? widget.css.cdy.cc ? widget.css.cdy.cc : { r: 0, g: 0, b: 0, a: 1 } : { r: 0, g: 0, b: 0, a: 1 },
              fontSize: widget.css.cdy ? widget.css.cdy.cf == 0 ? "11" : widget.css.cdy.cf : 11
            },

            cs: widget.cs,
          }

        case WidgetTypeEnum.CircularProgress:

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
            showMaxValueOnWidget: widget.wsmv,
            appliedBackgroundColor: widget.wb ? widget.wb.sbc : {},
            arcColor: widget.cpac ? widget.cpac : {
              r: 255,
              g: 255,
              b: 255,
              a: 1
            },
            arcWidth: widget.cpaw ? widget.cpaw : 15,
            valueStyles: widget.wvs ? {
              color: widget.wvs.sc,
              fontFamily: widget.wvs.sff,
              fontSize: widget.wvs.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '36'
              },
            titleStyles: widget.wts ? {
              color: widget.wts.sc,
              fontFamily: widget.wts.sff,
              fontSize: widget.wts.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '12'
              },
            rangeValueStyles: widget.wrs ? {
              color: widget.wrs.sc,
              fontFamily: widget.wrs.sff,
              fontSize: widget.wrs.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
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
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },


            segmentColors: widget.wsgc,
            barStyles: widget.wbs ? {
              backgroundColor: widget.wbs.sbc,
              color: widget.wbs.sc,
              fontFamily: widget.wbs.sff,
              fontSize: widget.wbs.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },

            xAxisStyles: widget.wsxs ? {
              backgroundColor: widget.wsxs.sbc,
              color: widget.wsxs.sc,
              fontFamily: widget.wsxs.sff,
              fontSize: widget.wsxs.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },
            yAxisStyles: widget.wsys ? {
              backgroundColor: widget.wsys.sbc,
              color: widget.wsys.sc,
              fontFamily: widget.wsys.sff,
              fontSize: widget.wsys.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },
            enableMin: widget.wenmn,
            enableMax: widget.wenmx,
            enableBarLines: widget.wenbl,
            useSelectedBarColor: widget.wusbc,
            showYAxis: widget.wsy,
            scrollType: getScrollType(widget.twrst),
            scrollSpeed: widget.twrd,
            matrix: widget.wt == WidgetTypeEnum.Combo ? convertToMatrix(widget.wmx, widget.ws.srt.rc, widget.ws.srt.rf, widget.wid, widget.ws.stom) : '',
            PictureSelected: widget.wt == WidgetTypeEnum.Picture ? widget.wpsl : '',
            appliedSettings: mapAppliedSettings(widget, isEdit, dataMetricsMetadata),
            showLabels: widget.sll,
            showLegends: widget.sld
          }
        default:
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
            showMaxValueOnWidget: widget.wsmv,
            appliedBackgroundColor: widget.wb ? widget.wb.sbc : {},
            valueStyles: widget.wvs ? {
              color: widget.wvs.sc,
              fontFamily: widget.wvs.sff,
              fontSize: widget.wvs.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '36'
              },
            titleStyles: widget.wts ? {
              color: widget.wts.sc,
              fontFamily: widget.wts.sff,
              fontSize: widget.wts.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
                fontFamily: 'Arial',
                fontSize: '12'
              },
            rangeValueStyles: widget.wrs ? {
              color: widget.wrs.sc,
              fontFamily: widget.wrs.sff,
              fontSize: widget.wrs.sfs
            } :
              {
                color: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                },
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
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },


            segmentColors: widget.wsgc && widget.wsgc.length > 0 ? widget.wsgc : [
              {
                r: 255, g: 0, b: 0, a: 1
              },
              {
                r: 255, g: 232, b: 0, a: 1
              },
              {
                r: 0, g: 255, b: 0, a: 1
              }
            ],
            barStyles: widget.wbs ? {
              backgroundColor: widget.wbs.sbc,
              color: widget.wbs.sc,
              fontFamily: widget.wbs.sff,
              fontSize: widget.wbs.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },

            xAxisStyles: widget.wsxs ? {
              backgroundColor: widget.wsxs.sbc,
              color: widget.wsxs.sc,
              fontFamily: widget.wsxs.sff,
              fontSize: widget.wsxs.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },
            yAxisStyles: widget.wsys ? {
              backgroundColor: widget.wsys.sbc,
              color: widget.wsys.sc,
              fontFamily: widget.wsys.sff,
              fontSize: widget.wsys.sfs
            } :
              {
                backgroundColor: {
                  r: 255,
                  g: 255,
                  b: 255,
                  a: 1
                }
              },
            enableMin: widget.wenmn,
            enableMax: widget.wenmx,
            enableBarLines: widget.wenbl,
            useSelectedBarColor: widget.wusbc,
            showYAxis: widget.wsy,
            scrollType: getScrollType(widget.twrst),
            scrollSpeed: widget.twrd,
            matrix: widget.wt == WidgetTypeEnum.Combo ? convertToMatrix(widget.wmx, widget.ws.srt.rc, widget.ws.srt.rf, widget.wid, widget.ws.stom) : '',
            PictureSelected: widget.wt == WidgetTypeEnum.Picture ? widget.wpsl : '',
            appliedSettings: mapAppliedSettings(widget, isEdit, dataMetricsMetadata),
            showLabels: widget.sll,
            showLegends: widget.sld
          }
      }
    })
  }
}

/**
 * mapping the custom combo headers
 * @param {*} cHeader 
 * @param {*} level 
 */
export function MappingCustomMatrixHeaders(cHeader, level) {
  cHeader.displayValue = level.displayName ? level.displayName : level.column.label;
  cHeader.column = level.column.label;
  cHeader.id = level.column.value;
  cHeader.dataType = level.column.type;
  cHeader.dateFormat = level.dateFormat && level.dateFormat.type;
  cHeader.showZeroValues = level.showZeroValues;
  cHeader.isSummary = level.isSummary;
  cHeader.displayFormatId = Object.keys(level.displayFormat).length > 0 ? level.displayFormat.value : level.displayFormat;
  cHeader.dateFormatId = level.dateFormat && level.dateFormat.value;
  cHeader.aggregateOperationId = level.aggregateOperation && level.aggregateOperation.value ? level.aggregateOperation.value : undefined;
  cHeader.timeFormatId = level.timeFormat && level.timeFormat.value ? level.timeFormat.value : undefined;
  cHeader.hoursFormatId = level.hoursFormat && level.hoursFormat.value ? level.hoursFormat.value : undefined;
  return cHeader;

}


function mapAppliedSettings(widget, isEdit, dataMetricsMetadata) {
  {
    return {
      dataMetrics: widget.ws && widget.ws.srt ? {
        statisticCategory: widget.ws.stom,
        displayFormat: widget.ws.srt.rsdfid ? getDisplayFormat(widget.ws.srt.rsdfid, dataMetricsMetadata) : '',
        group: widget.ws.srt.rsgid ? getSelectedGroup(widget.ws.srt, dataMetricsMetadata) : '',
        item: widget.ws.srt.rsiid ? getSelectedItem(widget.ws.srt, dataMetricsMetadata) : '',
        func: widget.ws.srt.rsfid ? getSelectedFunction(widget.ws.srt, dataMetricsMetadata) : '',
        drillDownOptions: widget.ws.srt.rf,
        columns: widget.ws.srt.rc,
        comboSelectedStatisticItems: _.map(widget.ws.srt.rc, (eachDataMetrics, i) => {
          return {
            id: Date.now(),
            item: {
              id: eachDataMetrics.cisiid
            },
            func: {
              id: eachDataMetrics.ciafid
            },
            displayFormat: {
              id: eachDataMetrics.cdf
            },
            widget: {
              value: eachDataMetrics.cwt
            },
            displayName: eachDataMetrics.dn ? eachDataMetrics.dn : undefined,
            isDefault: i == 1 ? true : false
          }
        }),
        query: widget.ws.sc.qry,
        levels: widget.ws.sc.isc ? addLevels(widget.wmx[0]) : []
      } :
        {},
      group: {
        isNew: false,
        isEdit: isEdit,
        isConfigured: widget.ws && widget.ws.sc && widget.ws.sc.isc,
        selectedDisplayFormat: widget.ws && widget.ws.sc && widget.ws.sc.dfId,
        filterStoreProcs: widget.ws && widget.ws.sc && widget.ws.sc.prl,
        selectedStoreProc: widget.ws && widget.ws.sc && widget.ws.sc.sSp ? {
          label: widget.ws && widget.ws.sc && widget.ws.sc.sSp,
          value: widget.ws && widget.ws.sc && widget.ws.sc.sSp
        } : undefined
      },
      thresholds: mapThresholds(widget.wth)

    }
  }
}

function convertToMatrix(resultMatrix, columns, filters, comboId, categoryId) {
  let i = 0,
    j = 0;
  let comboMatrixs = [];
  for (i = 0; i < resultMatrix.length; i++) {
    let comboRow = [];
    for (j = 0; j < resultMatrix[i].length; j++) {
      var comboInnerWidget = {};
      let eachWidget = resultMatrix[i][j];
      if (eachWidget.wt == WidgetTypeEnum.CircularProgress) {
        eachWidget.appliedSettings = {};
        eachWidget.appliedSettings.dataMetrics = {};
        eachWidget.appliedSettings.dataMetrics.displayFormat = {};
        eachWidget.appliedSettings.dataMetrics.displayFormat.id = columns[j].cdf;
      }
      comboInnerWidget = {
        id: eachWidget.wid,
        comboId: comboId,
        widgetType: eachWidget.wt,
        max: eachWidget.wmax,
        min: eachWidget.wmin,
        title: eachWidget.wtl,
        wri: -1,
        displayValue: categoryId == StatisticCategoryEnum.RealTime ? i == 0 || j == 0 ? eachWidget.wtl : '--' : i == 0 ? eachWidget.wtl : '--',
        value: '0',
        segmentColors: eachWidget.wsgc && eachWidget.wsgc.length > 0 ? eachWidget.wsgc : [
          {
            r: 255, g: 0, b: 0, a: 1
          },
          {
            r: 255, g: 232, b: 0, a: 1
          },
          {
            r: 0, g: 255, b: 0, a: 1
          }
        ],
        isComboWidget: true,
        scrollType: ScrollTypeEnum.None,
        widgetBody: StylesMapper(eachWidget.wb),
        valueStyles: StylesMapper(eachWidget.wvs),
        titleStyles: StylesMapper(eachWidget.wts),
        rangeValueStyles: StylesMapper(eachWidget.wrs),
        arcColor: eachWidget.cpac ? eachWidget.cpac : { r: 0, g: 192, b: 239, a: 1 },
        arcWidth: eachWidget.cpaw ? eachWidget.cpaw : 15,
        appliedBackgroundColor: categoryId == StatisticCategoryEnum.Custom && resultMatrix[0][j].abc ? resultMatrix[0][j].abc : StylesMapper(eachWidget.wb).backgroundColor,// categoryId ==  StatisticCategoryEnum.Custom ? GetWidget(WidgetTypeEnum.Box, true, 0).appliedBackgroundColor : StylesMapper(eachWidget.wb).backgroundColor,
        showMaxValueOnWidget: eachWidget.wsmv,
        appliedSettings: mapAppliedSettings(eachWidget),
        dataType: eachWidget.dty,
        dateFormat: eachWidget.df,
        showZeroValues: eachWidget.sz,
        displayFormatId: eachWidget.dpid,
        dateFormatId: eachWidget.dtid,
        timeFormatId: eachWidget.tfid,
        hoursFormatId: eachWidget.hfid,
        column: eachWidget.fc,
        showSettings: false,
        showEditor: false,
        isHeader: i == 0 ? true : false,
        hideIcon: categoryId == StatisticCategoryEnum.Custom && i > 0 ? true : false,
        basedColumn: eachWidget.bsdc ? { value: eachWidget.bsdc.v, label: eachWidget.bsdc.l, type: eachWidget.bsdc.t } : null,

        HideSettings: categoryId == StatisticCategoryEnum.RealTime && j == 0 ? true : false,
        aggregateOperationId: eachWidget.aggId,
        isSummary: eachWidget.isSummary
      };
      if ((filters && filters.length > 0) || (columns && columns.length > 0)) {
        if (i === 0) {
          comboInnerWidget.settings = {
            item: columns[j + 1] && columns[j + 1].cisiid,
            cWidgetType: eachWidget.wt,
            filter: j
          }
          comboInnerWidget.isRowrColumn = true;
        }
        else if (j === 0) {
          comboInnerWidget.settings = {
            filter: filters[i - 1]
          }
          comboInnerWidget.isRowrColumn = true;
        }
        else {
          comboInnerWidget.settings = {
            item: columns[j + 1] && columns[j + 1].cisiid,
            func: columns[j + 1] && columns[j + 1].ciafid,
            displayFormat: columns[j + 1] && columns[j + 1].cdf,
            filter: filters[i - 1]

          }
          comboInnerWidget.isRowrColumn = false;
        }

      }
      comboRow.push(comboInnerWidget);
    }
    comboMatrixs.push(comboRow);
  }
  return comboMatrixs;
}

function StylesMapper(styles) {
  return styles ? {
    backgroundColor: styles.sbc,
    color: styles.sc,
    fontFamily: styles.sff,
    fontSize: styles.sfs
  } : {};
}

/**
 * To add the levels for combo custom statistics
 * @param {*} levelsMatrix 
 */
function addLevels(levelsMatrix) {
  return _.map(levelsMatrix, (level, index) => {
    return {
      id: level.wid,
      level: index + 1,
      levelValue: null,
      expanded: true,
      column: {
        value: level.wid,
        label: level.fc,
        type: level.dty
      },
      showZeroValues: level.sz,
      displayFormat: level.dpid,
      dateFormat: getSelectedDateFormat(level.dtid),
      displayName: level.wtl == level.fc ? level.fc : level.wtl,
      hoursFormat: getSelectedHoursFormat(level.hfid),
      timeFormat: getSelectedTimeFormat(level.tfid),
      aggregateOperation: getSelectedAggregateFunction(level.aggId),
      isSummary: level.isSummary
    }
  });
}

/**
 * To get the selected aggregate function  based on id.
 * @param {*} aggregateOperationId 
 */
function getSelectedAggregateFunction(aggregateOperationId) {
  var selectedAggregateFunction = _.find(Constants.AggregateOperations, a => a.id == aggregateOperationId);
  if (selectedAggregateFunction) {
    return selectedAggregateFunction;
  } else {
    return undefined;
  }
}
/**
 * To get the hours format based on hoursfomratid.
 * @param {*} hoursFormatId 
 */
function getSelectedHoursFormat(hoursFormatId) {
  var selectedHoursFormat = _.find(Constants.hoursFormat, c => c.id == hoursFormatId);
  if (selectedHoursFormat) {
    return selectedHoursFormat;
  } else {
    return undefined;
  }
}
/**
 * To get the selected date format based on dateformat id.
 * @param {*} dateFormatId 
 */
function getSelectedDateFormat(dateFormatId) {
  var selectedDateFormat = _.find(Constants.dateFormats, c => c.id == dateFormatId);
  if (selectedDateFormat) {
    return selectedDateFormat;
  } else {
    return undefined;
  }
}

/**
 * To get the selected time format based on time format id.
 * @param {*} timeFormatId 
 */
function getSelectedTimeFormat(timeFormatId) {
  var selectedTimeFormat = _.find(Constants.customCombotimeFormat, c => c.id == timeFormatId);
  if (selectedTimeFormat) {
    return selectedTimeFormat;
  } else {
    return undefined;
  }
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