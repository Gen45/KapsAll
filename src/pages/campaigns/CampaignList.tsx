import { useEffect, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit } from "react-icons/fa";
import { API_URL, CAMPAIGNSTATUS, MODALTYPES } from '@/utils/constants';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select, Spinner } from '@material-tailwind/react';
import { Button2 } from "@components/Table/Button2";
import { findById, processCampaigns } from '@/utils/processors';
import { StatusChip } from "@/components/StatusChip";

export default function CampaignList() {

    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT', data: null });
    const [campaignsRawData, setCampaignsRawData] = useState<any | null>(null);
    const [campaignsData, setCampaignsData] = useState<any | null>(null);
    const [campaignData, setCampaignData] = useState<any | null>(null);
    const [productsData, setProductsData] = useState<any | null>(null);
    const [clientsData, setClientsData] = useState<any | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    // const [listReady, setListReady] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const getCampaignsData = async () => {
        const products = fetch(`${API_URL}products`).then(r => r.json());
        const clients = fetch(`${API_URL}clients`).then(r => r.json());
        const campaigns = fetch(`${API_URL}campaigns`).then(r => r.json());
        const res = await Promise.all([products, clients, campaigns]);
        const [productsRes, clientsRes, campaignsRes] = res;

        setProductsData(productsRes);
        setClientsData(clientsRes);
        setCampaignsRawData(campaignsRes);
        setCampaignsData(processCampaigns(campaignsRes, productsRes, clientsRes));
    }

    useEffect(() => {
        getCampaignsData()
    }, [campaignData]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (modalContent.data !== null) {
            fetch(`${API_URL}campaigns/${campaignData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ code: campaignData.code, client: campaignData.client, product: campaignData.product, meeting_url: campaignData.meeting_url, quote: campaignData.quote, status: campaignData.status })
            })
                .then((response) => {
                    if (response.ok) {
                        // console.log(response);
                        // console.log(response.json());
                        setErrorMessage('');
                        handleOpen();
                        getCampaignsData();
                    } else {
                        // console.log(response);
                        // console.log(response.json());
                    }
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage('Error saving client data...');
                    handleOpen();
                });
        }
    };

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
                        <Button2 content={<FaEdit size="1rem" />} onClick={() => handleToggleEditModal(row.original)} />
                    </div>
                );
            },
        },
    ]

    const handleToggleEditModal = (data: any) => {
        const RawData = findById(campaignsRawData, data.id);
        setCampaignData({ id: RawData.id, code: RawData.code, client: RawData.client, product: RawData.product, meeting_url: RawData.meeting_url, quote: RawData.quote, status: RawData.status });
        setModalContent({ title: 'Edit Campaign', body: data.description, type: MODALTYPES.EDIT, data: data });
        handleOpen();
    }

    return (
        <div className="flex flex-col grow overflow-auto p-8">
            {campaignsData
                ?
                <Table1 data={campaignsData} columns={getColumns()} />
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">
                        <Spinner className="h-12 w-12" color="red" />
                    </div>
                )}

            <Dialog open={open} size="xl" handler={handleOpen} >
                <DialogHeader>{modalContent.title}</DialogHeader>
                <DialogBody divider>
                    {modalContent.body}

                    {modalContent.type == MODALTYPES.EDIT &&
                        <div className="p-8">
                            <div className="max-w-lg mx-auto mb-4 p-8">
                                <div className="mb-4">
                                    <Input size="lg" label="Campaign code" color="red" defaultValue={campaignData.code} onChange={(e) => setCampaignData({ ...campaignData, code: e.target.value })} />
                                </div>
                                <div className="mb-4 flex gap-1">
                                    <Select variant="outlined" label="Select client" value={campaignData.client} color="red" onChange={(target) => setCampaignData({ ...campaignData, client: target })}>
                                        {
                                            clientsData.map((client: any) => {
                                                return <Option key={`${client.id}`} value={`${client.id}`}><span>{client.first} {client.last}</span></Option>
                                            })
                                        }
                                    </Select>
                                    {/* <Button size="sm" variant="text" color="red" className="border-gray-500 whitespace-nowrap flex items-center gap-3" onClick={() => console.log('add new client')}><FaPlus size="1rem" /> <span>Create new</span></Button> */}

                                </div>
                                <div className="mb-4 flex gap-1">
                                    <Select variant="outlined" label="Select product" value={campaignData.product} color="red" onChange={(target) => setCampaignData({ ...campaignData, product: target })}>
                                        {
                                            productsData.map((product: any) => {
                                                return <Option key={`${product.id}`} value={`${product.id}`}><span>{product.name}</span></Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="mb-4">
                                    <Input size="lg" label="Quote" color="red" defaultValue={campaignData.quote} onChange={(e) => setCampaignData({ ...campaignData, quote: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <Input size="lg" label="Meeting url" color="red" defaultValue={campaignData.meeting_url} onChange={(e) => setCampaignData({ ...campaignData, meeting_url: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <Select variant="outlined" label="Status" value={campaignData.status.toUpperCase()} color="red" onChange={(target) => setCampaignData({ ...campaignData, status: target })}>
                                        {
                                            Object.keys(CAMPAIGNSTATUS).map((status: string, index: number) => {
                                                return <Option key={index} value={status.toUpperCase()}><span>{status}</span></Option>
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className="mb-4">

                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <p>{errorMessage}</p>
                                </div>
                            </div>
                        </div>
                    }
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleSubmit}>
                        <span>Save</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}