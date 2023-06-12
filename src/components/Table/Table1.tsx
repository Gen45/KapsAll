import { useMemo } from "react";
import {
    useTable,
    useGlobalFilter,
    useSortBy,
    usePagination,
  } from "react-table";
import { GlobalSearchFilter1 } from "./GlobalSearchFilter1";
import { SelectMenu1 } from "./SelectMenu1";
import TableComponent from "./TableComponent";
import { PaginationNav1 } from "./Pagination";

export function Table1({generateData, getColumns}:{ generateData: (numberOfRows?: number) => any[], getColumns: () => any[]}) {
    const data = useMemo(() => generateData(100), []);
    const columns = useMemo(getColumns, []);
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      state,
      setGlobalFilter,
      page: rows,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageSize: 5 },
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <GlobalSearchFilter1
            className="sm:w-64"
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <SelectMenu1
            className="sm:w-44"
            value={pageSize}
            setValue={setPageSize}
            options={[
              { id: 5, caption: "5 items per page" },
              { id: 10, caption: "10 items per page" },
              { id: 20, caption: "20 items per page" },
            ]}
          />
        </div>
        <TableComponent
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
        <div className="flex justify-center">
          <PaginationNav1
            gotoPage={gotoPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
          />
        </div>
      </div>
    );
  }