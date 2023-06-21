import { ClientForm } from "@components/ClientForm";
import { TabButton } from "@components/TabButton";
import { Template1 } from "@templates/Template1";

export function Preview() {
    // interface information {
    //     sales: object;
    //     northenFacility: object;
    //     southernFacility: string;
    // }
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
        <main className="flex w-full">
            <div className="grow pr-10 pt-20">
                <ClientForm />
                <ClientForm />
            </div>
            <div className="w-[700px]">
                <nav className="container px-10 bg-[#c7362e] rounded-t-md overflow-hidden -mb-[2px] mx-auto flex gap-3 text-sm font-semibold text-white">
                    <span className={`py-2 pt-3 border-b-gray-200 font-light`}>
                        Template:
                    </span>
                    <TabButton title="Day one" active />
                    <TabButton title="3 days" />
                    <TabButton title="10 days" />
                    <TabButton title="30 days" />
                </nav>
                <div className="flex bg-white  rounded-b-md p-4 z-10 dark:bg-gray-900">
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
    )
}