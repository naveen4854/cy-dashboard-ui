const envconfig = require('./static/envconfig');

const baseUrl = envconfig.apiUrl;
//const baseUrl = "http://13.75.148.24:8051/api/";
const baseUrl_No_API = baseUrl.replace('api/', '');

const ApiUrl = {
  ACDAGENT: baseUrl + "Filters/GetACDAgents",
  AGENT: baseUrl + "Filters/GetAgents",
  BREAKTYPES: baseUrl + "Filters/GetBreakTypes",
  DIRECTORYTREE: baseUrl + "Filters/GetDirectories",
  CAMPAIGN: baseUrl + "Filters/GetCampaigns",
  COMPLETION_CODES: baseUrl + "Filters/GetCompletionCodes",
  SITES: baseUrl + "Filters/GetSites",
  TRUNKGROUP: baseUrl + "Filters/GetTrunkGroups",
  TEAMS: baseUrl + "Filters/GetTeams",
  QUEUE: baseUrl + "Filters/GetQueues",
  EMAIL_SMS: baseUrl + "Filters/GetEmailSMS",
  CALL_TYPES: baseUrl + "Filters/GetCallTypes",

  DATA_METRICS: baseUrl + "datametrics/all",
  STATISTIC_CATEGORY_METADATA: baseUrl + "datametrics/scmetadata",
  DATA_METRICS_ITEMS: baseUrl + "DataMetrics/GetDataMetricItems",
  DATA_METRICS_FUNCTIONS: baseUrl + "datametrics/GetDataMetricFunctions",
  DATA_METRICS_DRILL_DOWN_METADATA: baseUrl + "datametrics/drilldowndata",

  WIDGET_PREVIEW: baseUrl + "Dashboard/Preview",
  SLIDER_DASHBOARD: baseUrl + "Dashboard/GetSliderDashboards",
  WIDGET_DATA: baseUrl + "dashboard/getwidgetdata",
  SVAE_DASHBOARD: baseUrl + "dashboard/savedashboard",
  DASHBOARD_CATEGORIES: baseUrl + "dashboard/getdashboardcategories",
  PICTURE_SAVE: baseUrl + "dashboard/pictureSave",
  GET_DASHBOARDS_BY_CATEGORY: baseUrl + "dashboard/GetUserDashboards",
  DELETE_DASHBOARD: baseUrl + "dashboard/deleteDashboardById",
  GET_DASHBOARD_BY_ID: baseUrl + "dashboard",
  LOCALE_BASE: baseUrl + "localization/getlocale",
  LOCALE_JSON_URL: "locale.json",
  WIDGET_VIEW_DATA: baseUrl + "dashboard/viewWidgetData",
  UPDATE_DASHBOARD: baseUrl + "dashboard/update",
  CUSTOM_STATISTICS_STOREPROC: baseUrl + "DataMetrics/CustomStatistics",
  LOAD_COLUMNS: baseUrl + "DataMetrics/LoadColumns",
  DISPLAY_FORMATS: baseUrl + "DataMetrics/DisplayFormats",
  AUTH_TOKEN: baseUrl_No_API + "token",
  LOCALE_GENERATE : baseUrl + 'localization/generate',
  LOCALE_NORMALIZE : baseUrl + 'localization/normalize',
  LOGOUT_URL: baseUrl + 'Account/logout',
  TEST_THRESHOLD: baseUrl + "dashboard/TestThreshold",
  DEFAULT_REFRESHINTERVAL: baseUrl + "dashboard/DefaultRefreshInterval",
  DEFAULT_DASHBOARD: baseUrl + "account/defaultDashboard",
  VALIDATE_QUERY: baseUrl + "dashboard/ValidateQuery",
  TIME_ZONES: baseUrl + "DataMetrics/TimeZones",
  ENCRYPT: baseUrl + "Crypto/Encrypt"
};

export default ApiUrl;
