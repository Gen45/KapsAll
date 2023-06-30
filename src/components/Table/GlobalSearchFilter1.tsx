import { FaSearch } from "react-icons/fa";
import { TableSearch } from "./TableSearch";

export function GlobalSearchFilter1({
    globalFilter,
    setGlobalFilter,
    className = "",
}: { globalFilter: string, setGlobalFilter: (value: string | ((value: string) => string)) => void, className?: string }) {
    return (
        <TableSearch
            name="search"
            value={globalFilter || ""}
            //// eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => setGlobalFilter(e.target.value)}
            label="Search"
            decoration={<FaSearch size="1rem" className="text-gray-400" />}
            className={className}
        />
    );
}