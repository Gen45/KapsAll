import { FaSearch } from "react-icons/fa";
import { InputGroup7 } from "./InputGroup7";

export function GlobalSearchFilter1({
    globalFilter,
    setGlobalFilter,
    className = "",
}: { globalFilter: string, setGlobalFilter: (value: string | ((value: string) => string)) => void, className?: string }) {
    return (
        <InputGroup7
            name="search"
            value={globalFilter || ""}
            onChange={(e: any) => setGlobalFilter(e.target.value)}
            label="Search"
            decoration={<FaSearch size="1rem" className="text-gray-400" />}
            className={className}
        />
    );
}