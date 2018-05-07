
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import _ from 'lodash';

import withDragDropContext from '../../with-drag-drop-context';

import * as resolve from 'table-resolver';
import * as dnd from 'reactabular-dnd';
import * as Table from 'reactabular-table';

class DragAndDropComboFilters extends React.Component {

  constructor(props) {
    super(props);

    let _columns = this.getColumns(this.props.columns);
    let _rows = this.getRows(this.props.rows);

    this.state = {
      columns: _columns,
      rows: _rows
    }

    this.onRow = this.onRow.bind(this);
    this.onMoveRow = this.onMoveRow.bind(this);

    this.onRowSelected = this.onRowSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    let _columns = this.getColumns(nextProps.columns);
    let _rows = this.getRows(nextProps.rows);

    this.setState({
      columns: _columns,
      rows: _rows
    })
  }

  getRows(data) {
    return data ? data.map((row) => {
      return row ? Object.assign({}, row,
        {
          id: row.value + row.checked,
          value: row.value,
          rowId: row.value + row.checked,
          checked: row.checked,
          label: row.label
        }) : {}
    }) : []
  }

  getColumns(data) {
    return data ? data.map((_col) => {
      return {
        property: _col.property,
        props: {
          label: _col.name,
          style: {
          }
        },
        header: {
          label: _col.name,
          props: {
            onMove: o => this.onMoveColumn(o)
          }
        }
      }
    }) : []
  }

  onRow(row) {
    var clsArr = [];
    clsArr.push("move")

    clsArr.push(row.checked ? 'list-item-selected' : 'list-item');

    return {
      rowId: row.value + row.checked,
      id: row.value + row.checked,
      value: row.value,
      checked: row.checked,
      label: row.label,
      className: clsArr.join(' '),

      onMove: this.onMoveRow,
      onDrag: (e) => { e.target.classList.add(this.props.rowOnDragClass); },
      onDragStart: (e) => { },
      onDragEnd: (e) => { e.target.classList.remove(this.props.rowOnDragClass); },
      onClick: () => { this.onRowSelected(row) }
    };
  }

  onRowSelected(row) {
    row.checked = !row.checked;
    let allRows = this.state.rows;
    let index = _.findIndex(allRows, { value: row.value });

    allRows.splice(index, 1, row);
    this.setState({ rows: allRows });

    this.props.updateItem(row);
  }

  onMoveRow({ sourceRowId, targetRowId }) {
    if (sourceRowId == 1 || targetRowId == 1)
      return

    const rows = dnd.moveRows({
      sourceRowId,
      targetRowId
    })(this.state.rows);

    if (rows) {
      this.setState({ rows });
    }
    this.props.onRowOrderChange(this.state.rows)
  }

  render() {
    const components = {
      header: {
        cell: dnd.Header
      },
      body: {
        row: dnd.Row
      }
    };
    const { columns, rows } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });
    const resolvedRows = resolve.resolve({
      columns: resolvedColumns,
      method: resolve.nested
    })(rows);

    return (
      <Table.Provider
        components={components}
        columns={resolvedColumns}
        style={{ width: '100%' }}
      >

        <Table.Body
          rows={resolvedRows}
          rowKey="value"
          onRow={this.onRow}
        />
      </Table.Provider>
    );
  }

}

export default withDragDropContext(DragAndDropComboFilters)