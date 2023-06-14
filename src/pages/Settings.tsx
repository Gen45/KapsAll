import { useState, useEffect } from "react";
import { TabButton } from "../components/TabButton";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Settings() {

    const TABS = {
        CLIENTS: "Clients",
        PRODUCTS: "Products",
        TEMPLATES: 'Templates',
        INFORMATION: 'Information'
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        if (tab == '') {
            const initialTab = TABS.CLIENTS;
            setTab(initialTab);
            navigate(`/settings/${initialTab.toLowerCase()}`);
        } else {
            setTab(TABS[location.pathname.replace('/settings/', '').toUpperCase()]);
        }
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
                <TabButton dark title="Templates" active={TABS.TEMPLATES == tab} onClick={() => handleClick(TABS.TEMPLATES)} />
                {/* <TabButton dark title="Information" active={TABS.INFORMATION == tab} onClick={() => handleClick(TABS.INFORMATION)} /> */}
            </nav>
            <div className="container bg-gray-100 rounded-b-md overflow-hidden  mx-auto flex text-sm">
                <Outlet />
            </div>
        </div>
    );
}
