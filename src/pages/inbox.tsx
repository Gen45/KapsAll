import { useState } from "react";
import { TabButton } from "../components/TabButton";
import { Table, TableColumn } from "../components/Table";

export function Inbox() {

    const TABS = {
        SENT: "Sent",
        REPLIED: "Replied",
    }

    const columns: TableColumn[] = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age' }
    ];

    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 3, name: 'Bob Johnson', age: 35 }
    ];

    const [tab, setTab] = useState(TABS.SENT);

    return (
        <div className="flex flex-col w-full">
            <nav className="container bg-white  h-10  rounded-t-md overflow-hidden  mx-auto flex text-sm  text-white">
                <TabButton dark title={TABS.SENT} active={TABS.SENT == tab} onClick={() => setTab(TABS.SENT)} />
                <TabButton dark title={TABS.REPLIED} active={TABS.REPLIED == tab} onClick={() => setTab(TABS.REPLIED)} />
            </nav>
            <div className="container  bg-white rounded-b-md overflow-hidden  mx-auto flex text-sm">
                <Table columns={columns} data={data} />
            </div>
        </div>
    )
}