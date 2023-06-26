import { useState } from "react";
import { TabButton } from "@components/TabButton";
import ProductList from "./ProductList";

export default function ProductMain() {

    const TABS = {
        LIST: "List",
        NEW: "New",
    }

    const [tab, setTab] = useState(TABS.LIST);

    return (
        <div className="flex flex-col w-full">
            <nav className="container bg-white  h-10  rounded-t-md overflow-hidden  mx-auto flex text-sm  text-white">
                <TabButton dark title={TABS.LIST} active={TABS.LIST == tab} onClick={() => setTab(TABS.LIST)} />
            </nav>
            <div className="container  bg-gray-100 rounded-b-md overflow-hidden  mx-auto flex text-sm">
                <ProductList />
            </div>
        </div>
    )
}