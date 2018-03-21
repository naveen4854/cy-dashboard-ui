
import { ApiUrl } from "../../shared/constants";
import { axiosGet } from "../../utilities/http-service";

export function getStatisticGroups() {
    return axiosGet(
        ApiUrl.DATA_METRICS
    )
}

export function getStatisticCategories() {
    return axiosGet(
        ApiUrl.STATISTIC_CATEGORY_METADATA
    )
}

export function getDrillDownMetaData(statisticGroupId) {
    return axiosGet(
        ApiUrl.DATA_METRICS_DRILL_DOWN_METADATA,
        `statisticGroupId=${statisticGroupId}`
    )
}

export function getStoreProcs() {
    return axiosGet(
        ApiUrl.CUSTOM_STATISTICS_STOREPROC
    )
}

/**
 * To load the SQL query results metada.
 * @param {*} query 
 */
export function loadColumns(query) {
    query = btoa(query); //IE 10 and above
    return axiosGet(
        ApiUrl.LOAD_COLUMNS, `query=${query}`
    )
}

/**
 * To load the displayformats based on the statisticcategoryId.
 * @param {*} statisticsCategoryId 
 */
export function getDisplayformats(statisticsCategoryId) {
    return axiosGet(
        ApiUrl.DISPLAY_FORMATS, `statisticCategoryId=${statisticsCategoryId}`
    )
}
 

