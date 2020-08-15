import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (column, item) => {
    // if (column.path) return _.get(item, column.path);
    // return column.content(item);
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {/* {item[coulmn.path]} */}
                {this.renderCell(column, item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
