import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = (props) => {
  const { columns, onSort, sortColumn, data } = props;
  return (
    <table className="table table-striped">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
