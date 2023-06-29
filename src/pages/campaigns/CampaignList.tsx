import { useEffect, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit } from "react-icons/fa";
import { MODALTYPES } from '@/utils/constants';
import { Spinner } from '@material-tailwind/react';
import { Button2 } from "@components/Table/Button2";
import { findById, processCampaigns } from '@/utils/processors';
import { StatusChip } from "@/components/StatusChip";
import { Campaign, CampaignProcessed, Client, Product } from "@/utils/types";
import { getCampaignsData } from "./getData";
import { CampaignModal } from "./CampaignModal";

export default function CampaignList() {

    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT', data: null });
    const [campaignsData, setCampaignsData] = useState<Array<CampaignProcessed> | null>(null);
    const [campaignsRawData, setCampaignsRawData] = useState<Array<Campaign> | null>(null);
    const [singleCampaignData, setSingleCampaignData] = useState<any | null>(null);
    const [productsData, setProductsData] = useState<Array<Product> | null>(null);
    const [clientsData, setClientsData] = useState<Array<Client> | null>(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const fetchData = async () => {
            const [productsRes, clientsRes, campaignsRes] = await getCampaignsData();
            setProductsData(productsRes);
            setClientsData(clientsRes);
            setCampaignsRawData(campaignsRes);
            setCampaignsData(processCampaigns(campaignsRes, productsRes, clientsRes));
        };

        fetchData();
    }, [singleCampaignData]);

    const getColumns = () => [
        {
            Header: "Campaign Code",
            accessor: "code",
        },
        {
            Header: "Client",
            accessor: "client",
            Cell: ({ row }: { row: any; }) => {
                return (
                    <div className='whitespace-nowrap'>
                        {row.original.client
                            ?
                            `${row.original.client}`
                            :
                            <i className='italic text-red-400'>{'No client assigned'}</i>
                        }
                    </div>
                );
            },
        },
        {
            Header: "Product",
            accessor: "product",
            Cell: ({ row }: { row: any; }) => {
                return (
                    <div className='whitespace-nowrap'>
                        {row.original.product
                            ?
                            `${row.original.product} `
                            :
                            <i className='italic text-red-400'>{'No product assigned'}</i>
                        }
                    </div>
                );
            },
        },
        {
            Header: "Meeting URL",
            accessor: "meeting_url",
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

                            <StatusChip type={row.original.status.toLowerCase()}>{row.original.status}</StatusChip>
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
                        <Button2 children={<FaEdit size="1rem" />} onClick={() => handleToggleEditModal(row.original)} />
                    </div>
                );
            },
        },
    ]

    const handleToggleEditModal = (data: any) => {
        const RawData = findById(campaignsRawData, data.id);
        setSingleCampaignData({ ...RawData });

        setModalContent({
            title: 'Edit Campaign',
            body: data.description, type: MODALTYPES.EDIT, data: data
        });

        handleOpen();
    }

    return (
        <div className="flex flex-col grow overflow-auto p-4">
            {campaignsData
                ?
                <Table1 data={campaignsData} columns={getColumns()} />
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">
                        <Spinner className="h-12 w-12" color="red" />
                    </div>
                )}

            <CampaignModal
                setSingleCampaignData={setSingleCampaignData}
                modalContent={modalContent}
                singleCampaignData={singleCampaignData}
                clientsData={clientsData}
                productsData={productsData}
                open={open}
                handleOpen={handleOpen}
            />
        </div>
    );
}