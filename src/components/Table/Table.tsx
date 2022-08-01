import styles from './Table.module.scss';
import React from 'react'
import {Column, useSortBy, useTable} from "react-table";

interface TableProps {
    columns: Column<any>[];
    data: any[];
}

function Table({columns, data}: TableProps): JSX.Element {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data}, useSortBy);

    return (
        <div className={styles.container}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                            return (
                                <th className={styles.row} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? " 🔽"
                                            : " 🔼"
                                        : ""}
                                </span>
                                </th>)
                        })}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <tr id={`row-${rowIndex}`} className={styles.item} {...row.getRowProps()}>
                            {row.cells.map((cell, cellIndex) => {
                                return (
                                    <td id={`row-${rowIndex}-cell-${cellIndex}`}
                                        className={styles.row} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;