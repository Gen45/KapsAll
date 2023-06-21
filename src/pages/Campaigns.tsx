import Modali, { useModali } from 'modali';
import { useEffect, useMemo, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit } from "react-icons/fa";
import { Button2 } from "@components/Table/Button2";
import { fetchData } from '../utils/fetch';
import { findById, processCampaigns, processProducts } from '@/utils/processors';

function Campaigns() {

    const MODALTYPES = {
        PREVIEW: 'preview',
        EDIT: 'edit',
    }

    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT' });

    const [Modal, toggleModal] = useModali({
        animated: true,
        title: modalContent.title,
        large: true,
    });

    const [productsData, setProductData] = useState(Array);
    const [clientsData, setClientData] = useState(Array);
    const [tableData, setTableData] = useState(Array);
    // let _productsData = [];

    useEffect(() => {

        const go = async () => {
            const products = fetch('https://mwxdigital.com/kapsall/kapsall/API/?type=products-real').then(r => r.json());
            const clients = fetch('https://mwxdigital.com/kapsall/kapsall/API/?type=clients').then(r => r.json());
            const campaigns = fetch('https://mwxdigital.com/kapsall/kapsall/API/?type=campaigns').then(r => r.json());

            const res = await Promise.all([products, clients, campaigns]);

            // console.log(res)
            const [productsRes, clientsRes, campaignsRes] = res;
            // console.log(processProducts(productsRes), clientsRes, processCampaigns(campaignsRes))
            setProductData(processProducts(productsRes))
            setClientData(clientsRes)
            setTableData(processCampaigns(campaignsRes))
        }
        go()

    }, [productsData,
        clientsData,
        tableData]);

    const getColumns = () => [
        {
            Header: "Campaign Code",
            accessor: "name",
        },
        {
            Header: "Client",
            accessor: "client",
            Cell: ({ row }: { row: any; }) => {
                const clientName = findById(clientsData, row.original.client) !== undefined ? findById(clientsData, row.original.client).name : 'nope'
                return (
                    <>
                        {clientName}
                    </>
                );
            },
        },
        {
            Header: "Product",
            accessor: "product",
            Cell: ({ row }: { row: any; }) => {
                const productName = findById(productsData, row.original.product) !== undefined ? findById(productsData, row.original.product).model : 'nope'

                return (
                    <>
                        {productName}
                    </>
                );
            },
        },
        {
            Header: "Quote",
            accessor: "quote",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Actions",
            accessor: "actions",
            unsortable: true,
            Cell: ({ row }: { row: any; }) => {
                return (
                    <div className="flex gap-2 items-center">
                        <Button2 content={<FaEdit size="1rem" />} onClick={() => handleToggleEditModal(row.original)} />
                    </div>
                );
            },
        },
    ]

    const handleToggleEditModal = (templateData: any) => {
        setModalContent({ title: templateData.name + ' edit', body: templateData.description, type: MODALTYPES.EDIT });
        toggleModal();
    }

    // const columns = useMemo(getColumns, []);
    const columns = useMemo(getColumns, []);


    return (
        <div className="flex flex-col grow overflow-auto p-8">
            {tableData
                ?
                <Table1 data={tableData} columns={columns} />
                // <p>ya va</p>
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">Loading...</div>
                )}

            <Modali.Modal {...Modal}>
                <div className="flex flex-col gap-4 grow p-8">
                    {modalContent.body}

                    {modalContent.type == MODALTYPES.EDIT &&
                        <div className="border-2 rounded-lg">
                            <div className="text-red-500 p-8">
                                <p> EDIT CLIENT DATA HERE </p>
                            </div>
                        </div>
                    }
                </div>
            </Modali.Modal>
        </div>
    );
}

export { Campaigns };
