import { LocalizationPlaceHolder } from "../constants/constantValues";
import _ from 'lodash';


export function getTranslationDataForPage(locData, pageName) {
  let data = locData.data ? locData.data[pageName] : {}
  return {
    isRtl: locData.isRtl ? locData.isRtl : false,
    dir: locData.dir,
    t: (key, str, params) => {
      let localizedString = !data ? str : data[key] || str;

      if (!params)
        return localizedString;
      _.forEach(Object.keys(params), (key) => {
        localizedString = localizedString.replace('${' + key + '}', params[key]);
      })

      return localizedString
      // return _.map(localizedString.split(LocalizationPlaceHolder), (element, i) => {
      //   return i < params.length ? element + params[i] : element
      // }).join('');
    }
  };
}
