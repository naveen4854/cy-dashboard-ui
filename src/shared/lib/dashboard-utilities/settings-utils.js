import { StatisticCategoryEnum } from "../../enums";
import { getRandom } from "../../../utilities/utils";
import { Constants } from '../../constants';

export function mapAppliedSettings(widget, isEdit, dataMetricsMetadata) {
  {
    //if (widget.isComboWidget)
    let columns, comboSelectedStatisticColumns = []
    let settings = widget.ws || {};
    let realTimeSettings = settings.srt || {}
    let customSettings = settings.sc || {}
    if (settings.stom == StatisticCategoryEnum.Custom) {
      columns = customSettings.isc ? getCustomColumns(widget.wmx[0]) : [];
      comboSelectedStatisticColumns = []
    } else {
      // For exisitng dashboard id's will be empty, hence defaulting them and using the same id from here on
      columns = _.map(realTimeSettings.rc, (column) => { return { ...column, cid: column.cid || getRandom() } })
      // removing the default column got for some cross check 
      columns.splice(0, 1)
      comboSelectedStatisticColumns = _.map(columns, (column, i) => {
        return {
          id: column.cid,
          item: {
            id: column.cisiid
          },
          func: {
            id: column.ciafid
          },
          displayFormat: {
            id: column.cdf
          },
          widget: {
            value: column.cwt
          },
          displayName: column.dn ? column.dn : undefined,
          isDefault: i == 1 ? true : false
        }
      })
    }
    return {
      basedReal: widget.bsrl && {
        itemId: widget.bsrl.rsiid,
        funcId: widget.bsrl.rsfid,
        dsId: widget.bsrl.rsdfid,
        itemName: widget.bsrl.nm
      },
      dataMetrics: settings && realTimeSettings ? {
        statisticCategory: settings.stom,
        displayFormat: realTimeSettings.rsdfid ? getDisplayFormat(realTimeSettings.rsdfid, dataMetricsMetadata) : '',
        group: realTimeSettings.rsgid ? getSelectedGroup(realTimeSettings.rsgid, dataMetricsMetadata) : '',
        item: realTimeSettings.rsiid ? getSelectedItem(realTimeSettings.rsiid, dataMetricsMetadata) : '',
        func: realTimeSettings.rsfid ? getSelectedFunction(realTimeSettings.rsfid, dataMetricsMetadata) : '',
        drillDownOptions: realTimeSettings.rf,
        columns,
        comboSelectedStatisticColumns,
        query: customSettings.qry,
        // levels: customSettings.isc ? addLevels(widget.wmx[0]) : []
        isConfigured: settings && customSettings && customSettings.isc,
        filterStoreProcs: settings && customSettings && customSettings.prl,
        selectedStoreProc: settings && customSettings && customSettings.sSp ? {
          label: settings && customSettings && customSettings.sSp,
          value: settings && customSettings && customSettings.sSp
        } : undefined
      } :
        {},
      group: {
        isNew: false,
        isEdit: isEdit,
        isConfigured: settings && customSettings && customSettings.isc,
        selectedDisplayFormat: settings && customSettings && customSettings.dfId,
        filterStoreProcs: settings && customSettings && customSettings.prl,
        selectedStoreProc: settings && customSettings && customSettings.sSp ? {
          label: settings && customSettings && customSettings.sSp,
          value: settings && customSettings && customSettings.sSp
        } : undefined
      },
      thresholds: mapThresholds(widget.wth)

    }
  }
}


export function getSelectedGroup(group, metrics) {
  var selectedGroup = _.find(metrics, {
    'StatisticGroupId': group
  });
  if (selectedGroup) {
    return {
      id: selectedGroup.StatisticGroupId,
      label: selectedGroup.StatisticGroup,
      value: selectedGroup.Id
    }
  } else {
    return {
      id: group,
      label: 'metrics unavailable'
    }
  }

}

export function getSelectedItem(item, metrics) {
  var selectedItem = _.find(metrics, {
    'StatisticItemId': item
  });
  if (selectedItem) {
    return {
      id: selectedItem.StatisticItemId,
      label: selectedItem.StatisticItem,
      value: selectedItem.Id
    }
  } else {
    return {
      id: item,
      label: 'metrics unavailable'
    }
  }


}

export function getSelectedFunction(func, metrics) {
  var selectedFunc = _.find(metrics, {
    'StatisticFunctionId': func
  });
  if (selectedFunc) {
    return {
      id: selectedFunc.StatisticFunctionId,
      label: selectedFunc.StatisticFunction,
      value: selectedFunc.Id
    }
  } else {
    return {
      id: func,
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

/**
 * To add the levels for combo custom statistics
 * @param {*} customHeaderWidgets 
 */
function getCustomColumns(customHeaderWidgets) {
  return _.map(customHeaderWidgets, (headerWidget, index) => {
    return {
      id: headerWidget.wid,
      level: index + 1,
      levelValue: null,
      expanded: true,
      selectedColumn: {
        value: headerWidget.wid,
        label: headerWidget.fc,
        type: headerWidget.dty
      },
      showZeroValues: headerWidget.sz,
      displayFormat: headerWidget.dpid,
      dateFormat: getSelectedDateFormat(headerWidget.dtid),
      displayName: headerWidget.wtl == headerWidget.fc ? headerWidget.fc : headerWidget.wtl,
      hoursFormat: getSelectedHoursFormat(headerWidget.hfid),
      timeFormat: getSelectedTimeFormat(headerWidget.tfid),
      aggregateOperation: getSelectedAggregateFunction(headerWidget.aggId),
      isSummary: headerWidget.isSummary
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
