import { useState, useEffect } from "react";
import { TabButton } from "@components/TabButton";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Settings() {

    const TABS = {
        CLIENTS: "Clients",
        PRODUCTS: "Products",
        TEMPLATES: 'Templates',
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const locationURL = location.pathname.replace('/settings/', '').toUpperCase()
        setTab(TABS.hasOwnProperty(locationURL) ? TABS[locationURL] : TABS.CLIENTS);
        navigate(`/settings/${(TABS.hasOwnProperty(locationURL) ? locationURL : TABS.CLIENTS).toLowerCase()}`);
    }, [])

    const handleClick = (tab: string) => {
        setTab(tab);
        navigate(`/settings/${tab.toLowerCase()}`);
    }

    return (
        <div className="flex flex-col w-full">
            <nav className="container bg-white h-10 rounded-t-md overflow-hidden mx-auto flex text-sm text-white">
                <TabButton dark title={TABS.CLIENTS} active={TABS.CLIENTS == tab} onClick={() => handleClick(TABS.CLIENTS)} />
                <TabButton dark title={TABS.PRODUCTS} active={TABS.PRODUCTS == tab} onClick={() => handleClick(TABS.PRODUCTS)} />
                <TabButton dark title={TABS.TEMPLATES} active={TABS.TEMPLATES == tab} onClick={() => handleClick(TABS.TEMPLATES)} />
            </nav>
            <div className="container bg-gray-100 rounded-b-md overflow-hidden  mx-auto flex text-sm">
                <Outlet />
            </div>
        </div>
    );
}
