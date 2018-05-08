import { stylesMapperToServer, stylesMapper } from './styles-utils';
import { mapThresholdsToServer } from './threshold-utils';
import { WidgetTypeEnum, StatisticCategoryEnum, ScrollTypeEnum } from '../../enums';
import { rgba } from '../../../utilities';
import { mapAppliedSettings, getDisplayFormat, getSelectedItem, getSelectedFunction } from './settings-utils';
import { defaultComboHeaderHeight } from '../../constants/constants';

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
                // ws: { stom: eachWidget.appliedSettings.dataMetrics.statisticCategory },
                tfid: eachWidget.timeFormatId,
                dtid: eachWidget.dateFormatId,
                hfid: eachWidget.hoursFormatId,
                bsdc: eachWidget.appliedSettings.basedColumn ? {
                    v: eachWidget.appliedSettings.basedColumn.value,
                    l: eachWidget.appliedSettings.basedColumn.label,
                    t: eachWidget.appliedSettings.basedColumn.type,
                    did: eachWidget.appliedSettings.basedColumnDisplayFormat.id
                } : null,
                bsrl: eachWidget.appliedSettings.basedReal ? {
                    rsiid: eachWidget.appliedSettings.basedReal.itemId,
                    rsfid: eachWidget.appliedSettings.basedReal.funcId,
                    rsdfid: eachWidget.appliedSettings.basedReal.dsId,
                    nm: eachWidget.appliedSettings.basedReal.itemName
                } : null,
                isSummary: eachWidget.isSummary,
                aggId: eachWidget.aggregateOperationId,
                isLive: eachWidget.isLive,
                //isSummary:  eachWidget.displayFormatId,
                stylesConfigured: eachWidget.stylesConfigured,
                ws: {
                    srt: eachWidget && eachWidget.appliedSettings && eachWidget.appliedSettings.dataMetrics ? {
                        rsgid: eachWidget.appliedSettings.dataMetrics.group ? eachWidget.appliedSettings.dataMetrics.group.id : null,
                        rsiid: eachWidget.appliedSettings.dataMetrics.item ? eachWidget.appliedSettings.dataMetrics.item.id : null,
                        rsfid: eachWidget.appliedSettings.dataMetrics.func ? eachWidget.appliedSettings.dataMetrics.func.id : null,
                        rsdfid: eachWidget.appliedSettings.dataMetrics.displayFormat ? eachWidget.appliedSettings.dataMetrics.displayFormat.id : null,


                    } : {},
                }

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
        pictureSelected: widget.wt == WidgetTypeEnum.Picture ? widget.wpsl : '',
        appliedSettings: mapAppliedSettings(widget, isEdit, dataMetricsMetadata),
    };

    let columns = comboWidget.appliedSettings.dataMetrics.columns;
    let selectedGroup = comboWidget.appliedSettings.dataMetrics.group;
    let filters = widget.ws.srt.rf;

    let height = comboWidget.height;
    let headerHeight = defaultComboHeaderHeight;
    let remainingHeight = height - headerHeight;
    let eachCellHeight = _.floor(remainingHeight / (filters.length > 0 ? filters.length : 1));
    let eachCellWidth = comboWidget.width / columns.length;
    let adjustedHeaderHeight = height - (filters.length * eachCellHeight);

    let measures = { eachCellHeight, eachCellWidth, adjustedHeaderHeight }
    comboWidget = {
        ...comboWidget,
        matrix: convertToMatrix(widget.wmx, columns, filters, widget.wid, widget.ws.stom, selectedGroup, dataMetricsMetadata, measures)
    }
    return comboWidget;
}


function convertToMatrix(resultMatrix, columns, filters, comboId, categoryId, selectedGroup, dataMetricsMetadata, measures) {
    let i = 0,
        j = 0;
    let comboMatrixs = [];
    for (i = 0; i < resultMatrix.length; i++) {
        let comboRow = [];
        for (j = 0; j < resultMatrix[i].length; j++) {
            var comboInnerWidget = {};
            let oldWidget = resultMatrix[i][j];
            let isColumnHeader = i == 0;
            let isRowHeader = j == 0;
            comboInnerWidget.columnId = categoryId == StatisticCategoryEnum.RealTime ? columns[j].cid : columns[j].id;
            comboInnerWidget.rowId = isColumnHeader || categoryId == StatisticCategoryEnum.Custom ? -1 : filters[i - 1] + '_' + selectedGroup.id; // using combination because there is chance of same id for unrelated drilldown options
            comboInnerWidget = {
                ...comboInnerWidget,
                height: oldWidget.height == 0 ? isColumnHeader ? measures.adjustedHeaderHeight : measures.eachCellHeight : oldWidget.height,
                width: oldWidget.width == 0 ? measures.eachCellWidth : oldWidget.width,
                id: oldWidget.wid,
                comboId: comboId,
                widgetType: oldWidget.wt,
                max: oldWidget.wmax,
                min: oldWidget.wmin,
                title: oldWidget.wtl,
                wri: -1,
                displayValue: categoryId == StatisticCategoryEnum.RealTime ? i == 0 || j == 0 ? oldWidget.wtl : '--' : i == 0 ? oldWidget.wtl : '--',
                value: '0',
                segmentColors: oldWidget.wsgc && oldWidget.wsgc.length > 0 ? oldWidget.wsgc : [rgba(255, 0, 0, 1), rgba(255, 232, 0, 1), rgba(0, 255, 0, 1)],
                isComboWidget: true,
                scrollType: ScrollTypeEnum.None,
                widgetBody: stylesMapper(oldWidget.wb),
                valueStyles: stylesMapper(oldWidget.wvs),
                titleStyles: stylesMapper(oldWidget.wts),
                rangeValueStyles: stylesMapper(oldWidget.wrs),
                arcColor: oldWidget.cpac ? oldWidget.cpac : rgba(0, 192, 239, 1),
                arcWidth: oldWidget.cpaw ? oldWidget.cpaw : 15,
                appliedBackgroundColor: categoryId == StatisticCategoryEnum.Custom && resultMatrix[0][j].abc ? resultMatrix[0][j].abc : stylesMapper(oldWidget.wb).backgroundColor,// categoryId ==  StatisticCategoryEnum.Custom ? GetWidget(WidgetTypeEnum.Box, true, 0).appliedBackgroundColor : StylesMapper(eachWidget.wb).backgroundColor,
                showMaxValueOnWidget: oldWidget.wsmv,
                appliedSettings: mapAppliedSettings(oldWidget),
                dataType: oldWidget.dty,
                dateFormat: oldWidget.df,
                showZeroValues: oldWidget.sz,
                displayFormatId: oldWidget.dpid,
                dateFormatId: oldWidget.dtid,
                timeFormatId: oldWidget.tfid,
                hoursFormatId: oldWidget.hfid,
                column: oldWidget.fc,
                showSettings: false,
                showEditor: false,
                isColumnHeader,
                isRowHeader,
                hideIcon: categoryId == StatisticCategoryEnum.Custom && i > 0 ? true : false,
                HideSettings: categoryId == StatisticCategoryEnum.RealTime && j == 0 ? true : false,
                aggregateOperationId: oldWidget.aggId,
                isSummary: oldWidget.isSummary,
                aggregateOperationId: oldWidget.aggId,
                stylesConfigured: oldWidget.stylesConfigured

            };
            let dataMetrics = {
                item: getSelectedItem(columns[j] && columns[j].cisiid, dataMetricsMetadata),
                func: getSelectedFunction(columns[j] && columns[j].ciafid, dataMetricsMetadata),
                displayFormat: getDisplayFormat(columns[j] && columns[j].cdf, dataMetricsMetadata),//columns[j] && columns[j].cdf,
                filter: filters[i - 1],
                statisticCategory: categoryId
            }

            let appliedSettings = {
                ...comboInnerWidget.appliedSettings,
                basedColumn: oldWidget.bsdc ? { value: oldWidget.bsdc.v, label: oldWidget.bsdc.l, type: oldWidget.bsdc.t } : null,
                basedColumnDisplayFormat: oldWidget.bsdc ? { id: oldWidget.bsdc.did, label: undefined, value: oldWidget.bsdc.did } : null,
                dataMetrics
            };
            comboInnerWidget.appliedSettings = appliedSettings;
            comboRow.push(comboInnerWidget);
        }
        comboMatrixs.push(comboRow);
    }
    return comboMatrixs;
}