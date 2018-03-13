import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CheckBoxListGroup from '../components/check-box-list-group/'

export default class LocalizationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPages: this.props.l.pages
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      selectedPages: this.props.l.pages
    }
  }

  componentWillMount() {
    this.props.GetCollection();
    this.props.GenerateNormalizedStrings();
  }

  generate() {
    this.props.GenerateNormalizedStringsFile();
  }

  filter(pageKey) {
    return _.find(this.state.selectedPages, (page) => {
      return page.value == pageKey && page.checked
    })
  }
  pageSelectAll(e) {
    this.setState({
      selectedPages: e
    })
  }
  pageSelection() {
    this.setState({
      selectedPages: this.state.selectedPages
    })
    // this.props.PageSelectionChanged(this.state.selectedPages);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-10">
          {
            Object.keys(this.props.l.normalizedCol).map((pageKey, index) => (
              this.filter(pageKey) &&
              <div className="panel panel-default">
                <div key={index}>
                  <div className="panel-heading">
                    <p className="panel-title">{pageKey}</p>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">
                      {
                        Object.keys(this.props.l.normalizedCol[pageKey]).map((strKey, index) => (
                          <li className="list-group-item row" key={index}>
                            <div className="col-xs-4">{strKey}</div>
                            <div className="col-xs-4">{this.props.l.normalizedCol[pageKey][strKey]}
                            </div>
                            <div className="col-xs-4" style={{ border: '1px solid red' }}>
                              {`this.props.l.t('${this.props.l.normalizedCol[pageKey][strKey]}', '${strKey}')`}
                              <CopyToClipboard text={`this.props.l.t('${this.props.l.normalizedCol[pageKey][strKey]}', '${strKey}')`}>
                                <button className="btn pull-right">Copy</button>
                              </CopyToClipboard>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="col-xs-2 left-panel">
          <button type="button" className="btn btn-sm btn btn-primary btn-block" onClick={() => this.generate()}>Generate</button>
          <CheckBoxListGroup checkList={this.state.selectedPages} onChange={(e) => this.pageSelectAll(e)} label="Pages" />
          <button type="button" className="btn btn-sm btn btn-primary btn-block" onClick={() => this.pageSelection()}>Filter</button>
        </div>
      </div>
    )
  }
}
