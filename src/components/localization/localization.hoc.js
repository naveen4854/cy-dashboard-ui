import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

export default function localize(Component, pageName) {
  class LocalizedComponent extends PureComponent {
    constructor(props) {
      super(props);
      this.getTranslationDataForPage = this.getTranslationDataForPage.bind(this)
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    getTranslationDataForPage(locData, pageName) {
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
        }
      };
    }

    render() {
      return (
        <div className="localized">
          <Component {...this.props} l={this.getTranslationDataForPage(this.props.localizationStore, pageName)} />
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {

    }
  }

  const mapStateToProps = (state) => {
    return {
      localizationStore: state.localizationStore
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(LocalizedComponent);
}
