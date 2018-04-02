import { ApiUrl, Constants } from "../../shared/constants";
import { axiosGet, axiosPost } from "../../utilities/http-service";


export function getWidgetPreviewData(widgetData, dashboardId) {
    var url = ApiUrl.WIDGET_PREVIEW;
    if (dashboardId && dashboardId != Constants.DefaultDashboardId)
        url = url + '/' + dashboardId;
    else
        url = url + '/-1';

    return axiosPost(
        url, widgetData
    )
}