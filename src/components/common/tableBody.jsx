import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, col) => {
    if (col.path) return _.get(item, col.path);

    return col.content(item);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            {columns.map((col, jdx) => (
              <td key={jdx}>{this.renderCell(item, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
