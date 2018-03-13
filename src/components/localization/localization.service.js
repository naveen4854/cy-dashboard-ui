import {ApiUrl} from "../../shared/constants";
import * as service from "../../utilities/http-service";

export function getLocaleData(culture) {
    return service.axiosGet(ApiUrl.LOCALE_BASE + '/' + culture);
}

export function GenerateNormalizedStringsFile(col) {
    return service.axiosPost(ApiUrl.LOCALE_GENERATE, col);
}

export function GenerateNormalizedStrings(col) {
    return service.axiosPost(ApiUrl.LOCALE_NORMALIZE, col);
}