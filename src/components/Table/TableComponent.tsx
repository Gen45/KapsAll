import { FaSortDown, FaSortUp } from "react-icons/fa";

export function TableComponent({
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
}: { getTableProps: any, headerGroups: any, getTableBodyProps: any, rows: any, prepareRow: any }) {
    return (
        <div className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
            <table {...getTableProps()} className="w-full">
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={`px-3 text-start text-xs font-light uppercase cursor-pointer ${column.className}`}
                                    style={{ width: column.width }}
                                >
                                    <div className="flex gap-2 items-center">
                                        <div className="text-gray-600">
                                            {column.render("Header")}
                                        </div>

                                        {!column.unsortable &&
                                            <div className="flex flex-col">
                                                <FaSortUp
                                                    className={`text-sm translate-y-1/2 ${column.isSorted && !column.isSortedDesc
                                                        ? "text-red-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                                <FaSortDown
                                                    className={`text-sm -translate-y-1/2 ${column.isSortedDesc ? "text-red-400" : "text-gray-300"
                                                        }`}
                                                />
                                            </div>
                                        }
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-100" >
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                                        >
                                            {cell.render("Cell")}
                                        </td>
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

export default TableComponent;