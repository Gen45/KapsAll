import Modali, { useModali } from 'modali';
import { useEffect, useMemo, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit } from "react-icons/fa";
import { Button2 } from "@components/Table/Button2";
import { processCampaigns } from '@/utils/processors';
import { Chip } from '@/components/Chip';
import { API_URL } from '@/utils/constants';

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

    const [tableData, setTableData] = useState(Array);

    useEffect(() => {
        const go = async () => {
            const products = fetch(`${API_URL}products`).then(r => r.json());
            const clients = fetch(`${API_URL}clients`).then(r => r.json());
            const campaigns = fetch('https://mwxdigital.com/kapsall/kapsall/API/dummy.php?type=campaigns').then(r => r.json());
            const res = await Promise.all([products, clients, campaigns]);
            const [productsRes, clientsRes, campaignsRes] = res;
            setTableData(processCampaigns(campaignsRes, productsRes, clientsRes))
        }
        go()
    }, []);

    const getColumns = () => [
        {
            Header: "Campaign Code",
            accessor: "name",
        },
        {
            Header: "Client",
            accessor: "client",
            Cell: ({ row }: { row: any; }) => {
                // console.log(row.original);
                return (
                    <>
                        {`${row.original.client.first} ${row.original.client.last}`}
                    </>
                );
            },
        },
        {
            Header: "Product",
            accessor: "product",
            Cell: ({ row }: { row: any; }) => {
                // console.log(row.original);
                return (
                    <>
                        {row.original.product.name}
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
            Cell: ({ row }: { row: any; }) => {
                return (
                    <>
                        <div className="flex gap-2 items-center">
                            <Chip type={row.original.status}>{row.original.status}</Chip>
                        </div>
                    </>
                );
            },
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
                                <p> EDIT CAMPAIGN HERE </p>
                            </div>
                        </div>
                    }
                </div>
            </Modali.Modal>
        </div>
    );
}

export { Campaigns };
