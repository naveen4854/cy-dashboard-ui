import { StatisticCategoryEnum } from "../../enums";
import { getRandom } from "../../../utilities/utils";

export function mapAppliedSettings(widget, isEdit, dataMetricsMetadata) {
  {
    let columns, comboSelectedStatisticColumns = []
    let settings = widget.ws || {};
    let realTimeSettings = settings.srt || {}
    let customSettings = customSettings || {}
    if (settings.stom == StatisticCategoryEnum.Custom) {
      columns = customSettings.isc ? getCustomColumns(widget.wmx[0]) : [];
      comboSelectedStatisticColumns = []
    } else {
      // For exisitng dashboard id's will be empty, hence defaulting them and using the same id from here on
      columns = _.map(realTimeSettings.rc, (column) => { return { ...column, cid: column.cid || getRandom() } })
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
      dataMetrics: settings && realTimeSettings ? {
        statisticCategory: settings.stom,
        displayFormat: realTimeSettings.rsdfid ? getDisplayFormat(realTimeSettings.rsdfid, dataMetricsMetadata) : '',
        group: realTimeSettings.rsgid ? getSelectedGroup(realTimeSettings, dataMetricsMetadata) : '',
        item: realTimeSettings.rsiid ? getSelectedItem(realTimeSettings, dataMetricsMetadata) : '',
        func: realTimeSettings.rsfid ? getSelectedFunction(realTimeSettings, dataMetricsMetadata) : '',
        drillDownOptions: realTimeSettings.rf,
        columns,
        comboSelectedStatisticColumns,
        query: customSettings.qry,
        // levels: customSettings.isc ? addLevels(widget.wmx[0]) : []
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