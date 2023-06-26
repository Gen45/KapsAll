import { useState } from "react";
import { TabButton } from "@components/TabButton";
import CampaignList from "./CampaignList";
import Campaign from "./Campaign";
import { useLocation } from 'react-router-dom';


export default function CampaignMain() {

    const location = useLocation();
    const { state } = location;
    const { newCampaign } = state || {};

    // console.log(location);

    const TABS = {
        SENT: "Sent",
        REPLIED: "Replied",
        NEW: "New",
    }

    const [tab, setTab] = useState(newCampaign ? TABS.NEW : TABS.SENT);

    return (
        <div className="flex flex-col w-full">
            <nav className="container bg-white  h-10  rounded-t-md overflow-hidden  mx-auto flex text-sm  text-white">
                <TabButton dark title={TABS.SENT} active={TABS.SENT == tab} onClick={() => setTab(TABS.SENT)} />
                {/* <TabButton dark title={TABS.NEW} active={TABS.NEW == tab} onClick={() => setTab(TABS.NEW)} /> */}
            </nav>
            <div className="container bg-gray-100 rounded-b-md overflow-hidden  mx-auto flex text-sm">
                {
                    tab == TABS.SENT &&
                    <CampaignList />
                }
                {
                    tab == TABS.NEW &&
                    <Campaign />
                }
            </div>
        </div>
    )
}