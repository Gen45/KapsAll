import { useEffect, useMemo, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit } from "react-icons/fa";
import { API_URL, MODALTYPES } from '@/utils/constants';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner } from '@material-tailwind/react';
import { Button2 } from "@/components/Table/Button2";

export default function ClientList() {
    
    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT', data: null });
    const [clientsData, setClientsData] = useState<any | null>(null);
    const [clientData, setClientData] = useState<any | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const getClientsData = async () => {
        const clients = fetch(`${API_URL}clients`).then(r => r.json());
        const res = await Promise.all([clients]);
        const [clientsRes] = res;
        setClientsData(clientsRes);
    }

    useEffect(() => {
        getClientsData()
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (modalContent.data !== null) {
            fetch(`${API_URL}clients/${clientData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ first: clientData.first, last: clientData.last, email: clientData.email })
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        console.log(response.json());
                        setErrorMessage('Success');
                        handleOpen();
                        getClientsData();
                    } else {
                        console.log(response);
                        console.log(response.json());
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
            Header: "First name",
            accessor: "first"
        },
        {
            Header: "Last name",
            accessor: "last",
            hidden: true,
        },
        {
            Header: "Email",
            accessor: "email",
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
        setClientData({ id: data.id, first: data.first, last: data.last, email: data.email });
        setModalContent({ title: 'Edit client', body: data.description, type: MODALTYPES.EDIT, data: data });
        handleOpen();
    }

    const columns = useMemo(getColumns, []);

    return (
        <div className="flex flex-col grow overflow-auto p-4">
            {clientsData
                ?
                <Table1 data={clientsData} columns={columns} />
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">
                        <Spinner className="h-12 w-12" color="red" />
                    </div>
                )}

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{modalContent.title}</DialogHeader>
                <DialogBody divider>
                    {modalContent.body}

                    {modalContent.type == MODALTYPES.EDIT &&
                        <div className="p-8">
                            <div className="max-w-md mx-auto mb-4 p-8">
                                <div className="mb-4">
                                    <Input size="lg" label="First name" color="red" defaultValue={clientData.first} onChange={(e) => setClientData({ ...clientData, first: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <Input size="lg" label="Last name" color="red" defaultValue={clientData.last} onChange={(e) => setClientData({ ...clientData, last: e.target.value })} />
                                </div>
                                <div className="mb-4">
                                    <Input size="lg" label="Email" color="red" defaultValue={clientData.email} onChange={(e) => setClientData({ ...clientData, email: e.target.value })} />
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
