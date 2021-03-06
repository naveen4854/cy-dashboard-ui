import { PageEnum } from "../../shared/enums";

const collection = {
  MY_DASHBOARD: {
    name: PageEnum.MY_DASHBOARD, strings: [
      "Dashboard Name",
      "Modified",
      "of",
      "Are you sure you want to delete",
      "dashboard",
      "Live view",
      "Edit",
      "Delete",
      "Global",
      'Are you sure you want to delete ${dashboardName} dashboard?'
    ]
  },
  NEW_DASHBOARD: {
    name: PageEnum.NEW_DASHBOARD, strings: [
      "Picture",
      "Bar",
      "Progress",
      "Files",
      "Save",
      "Save As",
      "Preview",
      "Live",
      "Pie",
      "Speedo",
      "Clock",
      "Box",
      "Combo",
      "Text",
      "Name",
      "Default",
      "Global",
      "Delete",
      "Hide",
      "Are you sure you want to discard the changes?",
      "Are you sure you want to delete",
      "dashboard?",
      "Save",
      "Save As",
      "Save Dashboard",
      "Save As Dashboard",
      "Enter dashboard name",
      "A dashboard with name",
      "already exists. Do you want to overwrite?",
      "Save And Exit",
      "Dashboard Name",
      "Notification triggered",
      "Invalid credentials",
      "Invalid server or portnumber",
      "Some error occured.",
      "Are you sure you want to delete ${dashboardName} dashboard?"
    ]
  },
  DATA_METRICS: {
    name: PageEnum.DATA_METRICS, strings: [
      "Combo Settings",
      "Data Metrics",
      "Statistics:",
      "Statistic Group:",
      "Selected Statistic items",
      "Add Statistic Item",
      "Aggregate Function",
      "Display Format",
      "Edit", "Delete",
      "Apply",
      "Statistic Item",
      "Select Widget",
      "Cancel",
      "Add Item",
      "Edit Item",
      "Preview",
      "Custom Query",
      "Type your custom query",
      "Next",
      "Choose/Configure Column",
      "Add Column",
      "Column",
      "Column:",
      "Type:",
      "Display Name:",
      "Show Zero Values:",
      "Select filter(s):",
      "Add / Edit",
      "Validate Query",
      " Summary:",
      "Date Format :",
      "Please select a statistic item",
      "Statistic Function:",
      "Select_All",
      "Select_None",
      "Select",
      "Unselect",
      "Available Items",
      "Selected Items",
      "Clock Type:",
      "Hours Format:",
      "Time Format:",
      "Display Days:",
      "Display Date:",
      "Time Zone:",
      "Time Zone Label:",
      "No filters available",
      "Test",
      "Column :",
      "When it reaches :",
      "Color :",
      "Email to :",
      "SMS to :",
      "Email subject:",
      "Email is empty or not in correct format",
      "Email ${emailIndex} cannot be empty",
      "Email Id(s) cannot be empty",
      "Email Id ${emailIndex} cannot be empty",
      'Email Id ${emailIndex} is not in correct format',
      "SMS ${smsIndex} cannot be empty",
      "SMS numbers(s) is not in correct format",
      "SMS number is empty",
      "Display format is not set in Data Metrics.",
      " Threshold value cannot be empty.",
      "Level ${levelNumber} Entered threshold value is not valid. (Threshold value should be in same format as \'Display Format\').",
      'Level ${levelNumber} Threshold value cannot be empty.',
      "Are you sure you want to delete",
      "Are you sure you want to delete Level ${levelNumber} threshold?",
      "Alert: Threshold Level has been reached.",
      "New Threshold",
      "Save all levels",
      "Based on column:",
      "All the previously set thresholds will not work if the data metrics are changed.",
      "Some error occured.",
      "Query Generator",
      "Param Name",
      "Param Type",
      "Param Value",
      "Generate Query",
      "Or Type your custom query",
      "Save Query",
      "Stored Procedure:",
      'Are you sure you want to delete Level ${levelNumber} threshold?',
      'Please select Column ${columnNumber}',
      'Box Configurations',
      'Step Configurations',
      'Speedo Configurations',
      'Text Configurations',
      'Picture Configurations',
      'Pie Configurations',
      'Bar Configurations',
      'Clock Configurations',
      'Circular Progress Configurations',
      'Combo Configurations',
      'Configurations'
    ]
  },
  THRESHOLDS: {
    name: PageEnum.THRESHOLDS, strings: [

    ]
  },
  WIDGET_STYLES: {
    name: PageEnum.WIDGET_STYLES, strings: [
      "Segment Color 1:",
      "Segment Color 2:",
      "Segment Color 3:",
      "Stage1 Color:",
      "Stage2 Color:",
      "Stage3 Color:",
      "Background Color:",
      "Title:",
      "Title color:",
      "Title font:",
      "Title font size:",
      "Value color:",
      "Value font:",
      "Value font size:",
      "Min:",
      "Max:",
      "Range color:",
      "Range font:",
      "Range font size:",
      "Refresh interval (in sec):",
      "Save",
      "Image Exceeding Max Size",
      "Use selected bar color:",
      "Bar color:",
      "Bar value color:",
      "Bar value style:",
      "Bar value size:",
      "Y-Axis text color:",
      "Y-Axis font style:",
      "Y-Axis font size:",
      "X-Axis text color:",
      "X-Axis font style:",
      "X-Axis font size:",
      "Title font style:",
      "Enable min value:",
      "Enable max value:",
      "Enable bar lines:",
      "Show legends:",
      "Show labels:",
      "Show Max Value:",
      "Arc color:",
      "Outer Background Color:",
      "Clock Border Color:",
      "Hour Hand Color:",
      "Minute Hand Color:",
      "Seconds Hand Color:",
      "Numbers Font Color:",
      "Numbers Font Size:",
      "Numbers Font Style:",
      "Days Font Color:",
      "Days Font Size:",
      "Days Font Style",
      "Current Day Font Color:",
      "Date Font Color:",
      "Date Font Style:",
      "Date Font Size:",
      "Time Font Color:",
      "Time Font Size:",
      "Time Font Style:",
      "Time Zone Font Color:",
      "Time Zone Font Size:",
      "Apply to combo:",
      "Color:",
      "Font:",
      "Font size:",
      "Picture Stretch:",
      "Note: Max file size is 4MB",
      "selected",
      "Choose file to upload.",
      "Label Text color:",
      "Label font style:",
      "Label font size:",
      "Scroll Type:",
      "Scroll Speed:",
      "Apply to:",
      "Sytles not present for this widget"

    ]
  },
  NOTIFICATIONS: {
    name: PageEnum.NOTIFICATIONS, strings: [
      "Yes",
      "No",
      'Are you sure about that!',
      'Dashboard details are saved successfully',
      'You are trying to access degraded dashboard.',
      'Network Error',
      'Some error occured.'
    ]
  },
  LOGIN: {
    name: PageEnum.LOGIN, strings: [
      "CCA Sign In",
      "Username",
      "Password",
      "Login"
    ]

  },
  APPLICATION: {
    name: PageEnum.APPLICATION, strings: [

    ]
  },
  SLIDER:{
    name:PageEnum.SLIDER,strings:[
      "Name",
      "Default",
      "Global",
      "Add Dashboard",
      "Create Slider",
      "Preview",
      "+Add"
    ]
  }
}


export default collection;
