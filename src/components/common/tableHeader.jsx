import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const order =
      this.props.sortColumn.path === path
        ? this.props.sortColumn.order === "asc"
          ? "desc"
          : "asc"
        : "asc";
    const sortColumn = { path, order };
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, idx) => (
            <th key={idx} onClick={() => this.raiseSort(column.path)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
