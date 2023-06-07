import { useState } from "react";
import { TopButton } from "./components/TopButton";
import { TabButton } from "./components/TabButton";
import { Template1 } from "./templates/Template1";
import { ClientForm } from "./components/ClientForm";

import Logo from "./assets/KapsAll-logo.png";

function App() {
  const [campaigns, setCampaign] = useState([
    {
      id: 1,
      nameId: 1,
      productId: 1,
    },
  ]);

  const information = {
    sales: {
      email: "Mike@kapsall.com",
      phone: "631-727-0300",
      website: "http://www.KapsAll.com",
    },
    northenFacility: {
      address1: "200 Mill Road",
      address2: "Riverhead, NY  11901",
    },
    southernFacility: {
      address1: "251 North Congress Ave.",
      address2: "Delray Beach, FL  33445",
    },
  };

  return (
    <>
      <div className="flex flex-col grow h-screen w-full dark:bg-gray-900">
        <header className="">
          <div className="flex py-5 items-center bg-white dark:bg-gray-900">
            <div className="container px-10 pb-5  flex items-center justify-between mx-auto border-b-[1px] dark:border-gray-700">
              <h1 className="text-3xl text-red mr-10">
                <img className="h-11" src={Logo} alt="KapsAll Logo" />
              </h1>
              <nav className="flex  gap-3 text-sm font-semibold text-gray-400">
                <TopButton title="Compose" active />
                <TopButton title="Replies" />
                <TopButton title="Settings" />
              </nav>
            </div>
          </div>
          <div className="flex mb-10 py-5 items-center">
            <div className="container px-10 mx-auto flex">
              <h2 className="text-3xl font-semibold dark:text-white">
                Compose
              </h2>
            </div>
          </div>
        </header>

        <div className="flex flex-col grow bg-slate-100 dark:bg-gray-800">
          <main className="flex container px-10 mx-auto ">
            <div className="grow pr-10 pt-10">
              <ClientForm />
              <ClientForm />
            </div>
            <div className="w-[700px]">
              <nav className="container px-10 -mt-10 bg-slate-200 rounded-t-md overflow-hidden -mb-[2px] mx-auto flex gap-3 text-sm font-semibold text-gray-500">
                <span className={`py-2 pt-3  border-b-gray-200 font-light`}>
                  Template:
                </span>
                <TabButton title="Day one" active />
                <TabButton title="3 days" />
                <TabButton title="10 days" />
                <TabButton title="30 days" />
              </nav>
              <div className="flex bg-white border-slate border-2 rounded-b-md p-4 z-10 dark:bg-black">
                <Template1
                  product={{
                    name: "Model AU-4 Unscrambler",
                    code: "AU-4",
                    model: "Model AU-4 Unscrambler",
                  }}
                  meetingUrl="https://something.com/"
                  client={{ name: "Jeff", id: "1" }}
                  information={information}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
