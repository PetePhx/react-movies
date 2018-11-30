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

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || !column.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    if (sortColumn.order === "desc") return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, idx) => (
            <th
              key={idx}
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
