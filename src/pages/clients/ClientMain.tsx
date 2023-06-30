import { useState } from "react";
import { TabButton } from "@components/TabButton";
import ClientList from "./ClientList";

export default function ClientMain() {

    const TABS = {
        LIST: "List",
        NEW: "New",
    }

    const [tab, setTab] = useState(TABS.LIST);

    return (
        <div className="flex flex-col w-full">
            <nav className="container hidden px-4 h-10  rounded-t-xl overflow-hidden  mx-auto text-sm  text-white">
                <TabButton dark title={TABS.LIST} active={TABS.LIST == tab} onClick={() => setTab(TABS.LIST)} />
                {/* <TabButton dark title={TABS.NEW} active={TABS.NEW == tab} onClick={() => setTab(TABS.NEW)} /> */}
            </nav>
            <div className="container  bg-gray-100 rounded-b-md overflow-hidden mx-auto flex text-sm">
                <ClientList />
            </div>
        </div>
    )
}