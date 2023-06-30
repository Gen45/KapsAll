import { useState } from "react";
import { TabButton } from "@components/TabButton";
import CampaignList from "./CampaignList";
import Campaign from "./Campaign";
import { useLocation } from 'react-router-dom';

export default function CampaignMain() {

    const TABS = {
        SENT: "Sent",
        REPLIED: "Replied",
        NEW: "New",
    }

    const location = useLocation();
    const { state } = location;
    const { newCampaign } = state || {};
    const [tab, setTab] = useState(newCampaign ? TABS.NEW : TABS.SENT);


    return (
        <div className="flex flex-col w-full">
            <nav className="container px-4 h-10 rounded-t-xl overflow-hidden mx-auto flex text-sm text-white">
                <TabButton dark title={TABS.SENT} active={TABS.SENT == tab} onClick={() => setTab(TABS.SENT)} />
            </nav>
            <div className="container hiidden bg-gray-100 rounded-xl overflow-hidden mx-auto  text-sm">
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