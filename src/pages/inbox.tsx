import { useState } from "react";
import { TabButton } from "../components/TabButton";
import { Table, TableColumn } from "../components/Table";
import { Campaigns } from "./Campaigns";

export function Inbox() {

    const TABS = {
        SENT: "Sent",
        REPLIED: "Replied",
    }

    const [tab, setTab] = useState(TABS.SENT);

    return (
        <div className="flex flex-col w-full">
            <nav className="container bg-white  h-10  rounded-t-md overflow-hidden  mx-auto flex text-sm  text-white">
                <TabButton dark title={TABS.SENT} active={TABS.SENT == tab} onClick={() => setTab(TABS.SENT)} />
                {/* <TabButton dark title={TABS.REPLIED} active={TABS.REPLIED == tab} onClick={() => setTab(TABS.REPLIED)} /> */}
            </nav>
            <div className="container  bg-gray-100 rounded-b-md overflow-hidden  mx-auto flex text-sm">
                <Campaigns />
            </div>
        </div>
    )
}