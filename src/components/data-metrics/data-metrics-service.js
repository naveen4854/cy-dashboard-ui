
import { ApiUrl } from "../../shared/constants";
import { axiosGet, axiosPost } from "../../utilities/http-service";

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
    return axiosPost(
        ApiUrl.LOAD_COLUMNS, `=${query}`
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
 
export function validateQuery(query) {
    return axiosPost(
        ApiUrl.VALIDATE_QUERY, `=${query}`
    )
}

export function getTimeZones() {
    return axiosGet(ApiUrl.TIME_ZONES);
}
