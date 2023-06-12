import { useState } from "react";
import { TabButton } from "../components/TabButton";
import { ClientSettings } from "./settings/Clients";
import { ProductsSettings } from "./settings/Products";
import { TemplatesSettings } from "./settings/Templates";
import { InformationSettings } from "./settings/Information";

export default function Settings() {

    const TABS = {
        CLIENTS: "Clients",
        PRODUCTS: "Products",
        TEMPLATES: 'Templates',
        INFORMATION: 'Information'
    }

    const [tab, setTab] = useState(TABS.CLIENTS);

    return (
        <div className="flex flex-col w-full">
            <nav className="container bg-white h-10 rounded-t-md overflow-hidden mx-auto flex text-sm text-white">
                <TabButton dark title={TABS.CLIENTS} active={TABS.CLIENTS == tab} onClick={() => setTab(TABS.CLIENTS)} />
                <TabButton dark title={TABS.PRODUCTS} active={TABS.PRODUCTS == tab} onClick={() => setTab(TABS.PRODUCTS)} />
                <TabButton dark title="Templates" active={TABS.TEMPLATES == tab} onClick={() => setTab(TABS.TEMPLATES)} />
                <TabButton dark title="Information" active={TABS.INFORMATION == tab} onClick={() => setTab(TABS.INFORMATION)} />
            </nav>
            <div className="container bg-gray-100 rounded-b-md overflow-hidden  mx-auto flex text-sm">
                {
                    tab == TABS.CLIENTS &&
                    <ClientSettings />
                }
                {
                    tab == TABS.PRODUCTS &&
                    <ProductsSettings />
                }
                {
                    tab == TABS.TEMPLATES &&
                    <TemplatesSettings />
                }
                {
                    tab == TABS.INFORMATION &&
                    <InformationSettings />
                }
            </div>
        </div>

    );
}
