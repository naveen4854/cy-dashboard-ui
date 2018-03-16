import React from 'react';
import * as localizationService from './localization.service';
import * as RtlDetect from '../../utilities/rtl-detect';

import * as collection from './collection';

const INITALIZE_LOCALIZATION = "INITALIZE_LOCALIZE";
const LOCALIZED_PAGE_DATA = "LOCALIZED_PAGE_DATA";
const GET_LOCALIZATION_DATA = "GET_LOCALIZATION_DATA";
const GET_COL = "GET_COL";
const UPDATE_NORMALIZEDSTRINGS = "UPDATE_NORMALIZEDSTRINGS";
const UPDATE_NORMALIZEDCOL = "UPDATE_NORMALIZEDCOL";
const UPDATE_RTL = "UPDATE_RTL";
const GET_PAGES = "GET_PAGES";

const initialState = {
  data: {},
  isRtl: false,
  col: {},
  normalizedCol: {},
  normalizedStrings: "",
  currentLocale: "",
  dir: "ltr",
  pages: []
};

export function GetLocalizationData(culture) {
  return (dispatch, getState) => {
    if (getState().localizationStore.currentLocale == culture)
      return;

    dispatch(getState().spinnerStore.BeginTask());

    let isRtl = RtlDetect.isRtlLang(culture);

    localizationService.getLocaleData(culture).then((res) => {
      dispatch(getState().spinnerStore.EndTask());
      console.log('GetLocalizationData')
      dispatch({
        type: GET_LOCALIZATION_DATA,
        data: res.data ? res.data : {},
        isRtl: isRtl,
        currentLocale: culture,
        dir: isRtl ? "rtl" : "ltr"
      });
    }).catch((err) => {
      dispatch(getState().spinnerStore.EndTask());
    });
  }
}

export function GetCollection() {
  return (dispatch, getState) => {
    var _col = _.cloneDeep(collection.default);
    var _pages = _.cloneDeep(collection.PageEnums);
    dispatch({
      type: GET_COL,
      col: _col
    })
    dispatch({
      type: GET_PAGES,
      pages: Object.keys(_pages).map((key, index) => {
        return {
          value: `${key}|${_pages[key]}`,
          label: _pages[key],
          checked: true
        }
      })
    })
  }
}

export function GenerateNormalizedStringsFile() {
  return (dispatch, getState) => {
    var _col = _.cloneDeep(collection.default);
    localizationService.GenerateNormalizedStringsFile(_col).then((res) => {
      dispatch({
        type: UPDATE_NORMALIZEDSTRINGS,
        normalizedStrings: res.data
      })

      let blob = new Blob([res.data], { type: "application/octet-stream" }),
        url = window.URL.createObjectURL(blob);
      window.open(url, "_self");
    });
  }
}

export function GenerateNormalizedStrings() {
  return (dispatch, getState) => {
    var _col = _.cloneDeep(collection.default);
    localizationService.GenerateNormalizedStrings(_col).then((res) => {
      dispatch({
        type: UPDATE_NORMALIZEDCOL,
        normalizedCol: res.data
      })
    });
  }
}

export function PageSelectionChanged(pages) {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PAGES,
      pages: pages
    })
  }
}

export const ACTION_HANDLERS = {
  [GET_LOCALIZATION_DATA]: (state, action) => {
    return Object.assign({}, state, {
      data: action.data,
      isRtl: action.isRtl,
      currentLocale: action.currentLocale,
      dir: action.dir
    });
  },
  [GET_COL]: (state, action) => {
    return Object.assign({}, state, {
      col: action.col,
    });
  },
  [UPDATE_NORMALIZEDSTRINGS]: (state, action) => {
    return Object.assign({}, state, {
      normalizedStrings: action.normalizedStrings,
    });
  },
  [UPDATE_NORMALIZEDCOL]: (state, action) => {
    return Object.assign({}, state, {
      normalizedCol: action.normalizedCol,
    });
  },
  [UPDATE_RTL]: (state, action) => {
    return Object.assign({}, state, {
      isRtl: action.isRtl,
    });
  },
  [GET_PAGES]: (state, action) => {
    return Object.assign({}, state, {
      pages: action.pages,
    });
  },
}

export default function LocalizationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
