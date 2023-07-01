import { useState } from "react";
import { TabButton } from "@components/TabButton";
import CampaignList from "./CampaignList";
import Campaign from "./Campaign";
import { useLocation, useOutletContext } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { usePage } from "@/App";

export default function CampaignMain() {

    const TABS = {
        SENT: "Sent",
        DRAFT: "Draft",
        NEW: "New",
    }

    const location = useLocation();
    const { state } = location;
    const { newCampaign } = state || {};
    const [tab, setTab] = useState(newCampaign ? TABS.NEW : TABS.SENT);

    const handleNewCampaign = () => { }

    const page = usePage()

    return (

        <>
            <div className="flex flex-col bg-gray-50 dark:bg-gray-900 pt-16  items-center  ">
                <div className="container px-10 mx-auto flex justify-between items-center">
                    <h2 className="text-4xl font-semiBold first-letter:uppercase  dark:text-gray-200">
                        {page}
                    </h2>
                    <Button className="rounded-full shadow-none" ripple color="red" onClick={() => { handleNewCampaign() }} >Create Campaign</Button>
                </div>
                <nav className="container rounded-t-xl overflow-hidden mx-auto pt-5 px-10 flex text-sm text-white">
                    <TabButton title={TABS.SENT} active={TABS.SENT == tab} onClick={() => setTab(TABS.SENT)} />
                    <TabButton title={TABS.DRAFT} active={TABS.DRAFT == tab} onClick={() => setTab(TABS.DRAFT)} />
                </nav>
            </div>
            <div className="flex flex-col grow bg-gray-50 dark:from-gray-800 dark:to-slate-900  border-t-[1px]">
                <main className="flex flex-col container px-10 py-14 mx-auto ">
                    <div className="flex flex-col w-full">

                        <div className="container rounded-xl overflow-hidden mx-auto text-sm">
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
                </main>
            </div>
        </>



    )
}