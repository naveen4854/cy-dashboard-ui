
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import _ from 'lodash';

import HTML5Backend from 'react-dnd-html5-backend';
import withDragDropContext from '../with-drag-drop-context';
import * as resolve from 'table-resolver';
import * as dnd from 'reactabular-dnd';
import * as Table from 'reactabular-table';

class DragAndDropTable extends React.Component {

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
    this.onMoveColumn = this.onMoveColumn.bind(this);
    this.onMoveChildColumn = this.onMoveChildColumn.bind(this);
    this.editClick = this.editClick.bind(this);
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
    return data.map((row) => {
      return Object.assign({}, row,
        {
          id: row.isDefault ? 1 : row.id,
          Edit: <a><i onClick={(e) => this.editClick(e, row)} className={ "fa fa-edit pointer"}></i></a>,
          Delete: <a> <i onClick={(e) => this.deleteClick(e, row)} className={row.isDefault ? "fa fa-trash-o" : "fa fa-trash-o pointer"}></i></a >
        })
    })
  }

  getColumns(data) {
    return data.map((_col) => {
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
    })
  }

  editClick(e, row) {
    this.props.onEdit(e, row)
  }

  deleteClick(e, row) {
    if (row.isDefault)
      return;
    this.props.onDelete(e, row)
  }

  onRow(row) {
    var clsArr = [];
    if (row.isDefault)
      clsArr.push("td-disabled")
    else
      clsArr.push("move")

    return {
      rowId: row.id,
      onMove: this.onMoveRow,
      className: clsArr.join(' '),
      onDrag: (e) => { e.target.classList.add(this.props.rowOnDragClass); },
      onDragStart: (e) => { },
      onDragEnd: (e) => { e.target.classList.remove(this.props.rowOnDragClass); },
    };
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

  onMoveColumn(labels) {
    return
    const movedColumns = dnd.moveLabels(this.state.columns, labels);

    if (movedColumns) {
      // Retain widths to avoid flashing while drag and dropping.
      const source = movedColumns.source;
      const target = movedColumns.target;
      const sourceWidth = source.props.style && source.props.style.width;
      const targetWidth = target.props.style && target.props.style.width;

      source.props.style = {
        ...source.props.style,
        width: targetWidth
      };
      target.props.style = {
        ...target.props.style,
        width: sourceWidth
      };

      this.setState({
        columns: movedColumns.columns
      });
    }
  }

  onMoveChildColumn(labels) {
    return

    const movedChildren = dnd.moveChildrenLabels(this.state.columns, labels);

    if (movedChildren) {
      const columns = cloneDeep(this.state.columns);

      columns[movedChildren.target].children = movedChildren.columns;

      // Here we assume children have the same width.
      this.setState({ columns });
    }
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
        className="table table-bordered table-striped no-margin"
      >
        <Table.Header
          headerRows={resolve.headerRows({ columns })}
        />

        <Table.Body
          rows={resolvedRows}
          rowKey="id"
          onRow={this.onRow}
        />
      </Table.Provider>
    );
  }

}

export default withDragDropContext(DragAndDropTable)