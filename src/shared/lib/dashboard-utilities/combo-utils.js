import { stylesMapperToServer, stylesMapper } from './styles-utils';
import { mapThresholdsToServer } from './threshold-utils';
import { WidgetTypeEnum, StatisticCategoryEnum, ScrollTypeEnum } from '../../enums';
import { rgba } from '../../../utilities';
import { mapAppliedSettings } from './settings-utils';

/**
 * generates matrix for given widget
 * @param {*} inputWidget 
 */
export function getComboMatrix(inputWidget) {
    let i = 0,
        j = 0;
    let comboMatrixs = [];
    for (i = 0; i < inputWidget.matrix.length; i++) {
        let comboRow = [];
        for (j = 0; j < inputWidget.matrix[i].length; j++) {
            var comboInnerWidget = {};
            let eachWidget = inputWidget.matrix[i][j];
            let thresholds = mapThresholdsToServer(eachWidget);
            comboInnerWidget = {
                height: eachWidget.height,
                width: eachWidget.width,
                wid: eachWidget.id,
                cid: eachWidget.comboId,
                icw: eachWidget.isComboWidget,
                wt: eachWidget.widgetType,
                wmax: eachWidget.max,
                wmin: eachWidget.min,
                wtl: eachWidget.displayValue,
                wri: -1,
                abc: eachWidget.appliedBackgroundColor,
                wsgc: (eachWidget.widgetType === WidgetTypeEnum.Speedo || eachWidget.widgetType === WidgetTypeEnum.Progress) ? eachWidget.segmentColors : [],
                wth: thresholds,
                wb: stylesMapperToServer(eachWidget.widgetBody),
                wvs: stylesMapperToServer(eachWidget.valueStyles),
                wts: stylesMapperToServer(eachWidget.titleStyles),
                wrs: stylesMapperToServer(eachWidget.rangeValueStyles),
                wsmv: eachWidget.showMaxValueOnWidget,
                cpac: eachWidget.arcColor,
                cpaw: eachWidget.arcWidth,
                fc: eachWidget.column ? eachWidget.column : "",
                dty: i == 0 && eachWidget.dataType ? eachWidget.dataType : null,
                df: i == 0 && eachWidget.dateFormat ? eachWidget.dateFormat : null,
                sz: i == 0 && eachWidget.showZeroValues ? eachWidget.showZeroValues : false,
                dpid: eachWidget.displayFormatId,
                tfid: eachWidget.timeFormatId,
                dtid: eachWidget.dateFormatId,
                hfid: eachWidget.hoursFormatId,

                bsdc: eachWidget.basedColumn ? {
                    v: eachWidget.basedColumn.value,
                    l: eachWidget.basedColumn.label,
                    t: eachWidget.basedColumn.type
                } : null,
                isSummary: eachWidget.isSummary,
                aggId: eachWidget.aggregateOperationId,
                isLive: eachWidget.isLive
                //isSummary:  eachWidget.displayFormatId,

            };
            comboRow.push(comboInnerWidget);
        }
        comboMatrixs.push(comboRow);
    }
    return comboMatrixs;
}

export function comboWidgetConfigurationsFromServer(widget, dataMetricsMetadata, isEdit) {
    let comboWidget = {
        x: widget.wxp,
        y: widget.wyp,
        width: widget.width,
        height: widget.height,
        z: widget.zIndex,
        id: widget.wid,
        widgetType: widget.wt,
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
        widgetBody: widget.wb ? {
            backgroundColor: widget.wb.sbc,
            color: widget.wb.sc,
            fontFamily: widget.wb.sff,
            fontSize: widget.wb.sfs
        } :
            {
                backgroundColor: rgba(255, 255, 255, 1)
            },
        PictureSelected: widget.wt == WidgetTypeEnum.Picture ? widget.wpsl : '',
        appliedSettings: mapAppliedSettings(widget, isEdit, dataMetricsMetadata),
    };
    let columns = comboWidget.appliedSettings.dataMetrics.columns;
    let selectedGroup = comboWidget.appliedSettings.dataMetrics.group;
    comboWidget = {
        ...comboWidget,
        matrix: convertToMatrix(widget.wmx, columns, widget.ws.srt.rf, widget.wid, widget.ws.stom, selectedGroup)
    }

    return comboWidget;
}


function convertToMatrix(resultMatrix, columns, filters, comboId, categoryId, selectedGroup) {
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
                eachWidget.appliedSettings.dataMetrics.displayFormat.id = columns[j + 1].cdf;
            }
            let isColumnHeader = i == 0;
            let isRowHeader = j == 0;

            comboInnerWidget.columnId = columns[j].cid;
            comboInnerWidget.rowId = isColumnHeader ? -1 : filters[i - 1] + '_' + selectedGroup.id; // using combination because there is chance of same id for unrelated drilldown options
            comboInnerWidget = {
                ...comboInnerWidget,
                height: eachWidget.height,
                width: eachWidget.width,
                id: eachWidget.wid,
                comboId: comboId,
                widgetType: eachWidget.wt,
                max: eachWidget.wmax,
                min: eachWidget.wmin,
                title: eachWidget.wtl,
                wri: -1,
                displayValue: categoryId == StatisticCategoryEnum.RealTime ? i == 0 || j == 0 ? eachWidget.wtl : '--' : i == 0 ? eachWidget.wtl : '--',
                value: '0',
                segmentColors: eachWidget.wsgc && eachWidget.wsgc.length > 0 ? eachWidget.wsgc : [rgba(255, 0, 0, 1), rgba(255, 232, 0, 1), rgba(0, 255, 0, 1)],
                isComboWidget: true,
                scrollType: ScrollTypeEnum.None,
                widgetBody: stylesMapper(eachWidget.wb),
                valueStyles: stylesMapper(eachWidget.wvs),
                titleStyles: stylesMapper(eachWidget.wts),
                rangeValueStyles: stylesMapper(eachWidget.wrs),
                arcColor: eachWidget.cpac ? eachWidget.cpac : rgba(0, 192, 239, 1),
                arcWidth: eachWidget.cpaw ? eachWidget.cpaw : 15,
                appliedBackgroundColor: categoryId == StatisticCategoryEnum.Custom && resultMatrix[0][j].abc ? resultMatrix[0][j].abc : stylesMapper(eachWidget.wb).backgroundColor,// categoryId ==  StatisticCategoryEnum.Custom ? GetWidget(WidgetTypeEnum.Box, true, 0).appliedBackgroundColor : StylesMapper(eachWidget.wb).backgroundColor,
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
                isColumnHeader,
                isRowHeader,
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