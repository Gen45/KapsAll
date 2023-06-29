import { useEffect, useState } from "react";
import { Select, Option, Button, Input } from "@material-tailwind/react";
import { Template1 } from "@templates/Template1";
import { API_URL } from "@/utils/constants";
// import { processProducts } from "@/utils/processors";

export function Preview() {

    const [clientsData, setClientData] = useState(Array);
    const [productsData, setProductData] = useState(Array);

    const [client, setClient] = useState(null);

    useEffect(() => {

        const go = async () => {
            const clients = fetch(`${API_URL}clients`).then(r => r.json());
            const products = fetch(`${API_URL}products`).then(r => r.json());

            const res = await Promise.all([products, clients]);

            const [productsRes, clientsRes] = res;
            setClientData(clientsRes)
            setProductData(productsRes)
        }
        go()

    }, []);

    const handleSelectClient = (target: any) => {
        console.log(target);
        setClient(target);
    }

    return (
        <main className="flex w-full">
            <div className="grow pr-10 pt-20">
                <div className="form pr-11">

                    <div className="flex flex-col gap-6">
                        {
                            client != 0 &&
                            <Select variant="outlined" label="Select client" color="red" onChange={(target) => handleSelectClient(target)}>
                                {
                                    [{ id: 0, first: "ADD NEW", last: '' }, ...clientsData]?.map((client: any) => {
                                        return <Option key={`${client.id}`} value={`${client.id}`}>{client.first} {client.last}</Option>
                                    })
                                }
                            </Select>
                        }
                        <Select variant="outlined" label="Select product" color="red">
                            {
                                productsData?.map((product: any) => {
                                    return <Option key={`${product.id}`} value={`${product.id}`}>{product.name}</Option>
                                })
                            }
                        </Select>
                        <Input color="red" label="Meeting URL" />
                        <Button ripple={true} color="red">Save Campaign</Button>
                    </div>

                </div>
            </div>
            <div className="w-[700px]">
                <nav className="container px-10 bg-[#c7362e] rounded-t-md overflow-hidden -mb-[2px] mx-auto flex gap-3 text-sm font-semibold text-white">
                    {/* <span className={`py-2 pt-3 border-b-gray-200 font-light`}>
                        Template:
                    </span>
                    <TabButton title="Day one" active />
                    <TabButton title="3 days" />
                    <TabButton title="10 days" />
                    <TabButton title="30 days" /> */}
                </nav>
                <div className="flex bg-white  rounded-md p-4 z-10 dark:bg-gray-900">
                    <Template1
                        product={{
                            name: "Model AU-4 Unscrambler",
                            code: "AU-4",
                            model: "Model AU-4 Unscrambler",
                        }}
                        meetingUrl="https://something.com/"
                        client={{ name: "Jeff", id: "1" }}
                    />
                </div>
            </div>
        </main>
    )
}