import { useState } from "react";
import { API_URL, CAMPAIGNSTATUS, MODALTYPES } from '@/utils/constants';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select } from '@material-tailwind/react';
import { Client } from "@/utils/types";

export const CampaignModal = ({ modalContent, singleCampaignData, setSingleCampaignData, clientsData, productsData, open, handleOpen }:
    { modalContent: any; singleCampaignData: any; setSingleCampaignData: any; clientsData: any; productsData: any; open: boolean; handleOpen: any }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        if (modalContent.data === null || singleCampaignData === null) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}campaigns/${singleCampaignData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ ...singleCampaignData })
            });

            if (response.ok) {
                setErrorMessage('');
                handleOpen();
            } else {
                throw new Error('Error saving client data...');
            }
        } catch (error) {
            setErrorMessage('Error saving client data...');
            handleOpen();
        }
    };


    return <Dialog open={open} size="md" handler={handleOpen}>
        <DialogHeader>{modalContent.title}</DialogHeader>
        <DialogBody divider>

            {modalContent.type == MODALTYPES.EDIT && singleCampaignData !== null &&
                <div className="p-8">
                    <div className="max-w-lg mx-auto mb-4 p-8">
                        <div className="mb-4">
                            <Input size="lg" label="Campaign code" color="red" defaultValue={singleCampaignData.code} onChange={(e) => setSingleCampaignData({ ...singleCampaignData, code: e.target.value })} />
                        </div>
                        <div className="mb-4 flex gap-1">
                            <Select variant="outlined" label="Select client" value={String(singleCampaignData.client)} color="red" onChange={(target) => setSingleCampaignData({ ...singleCampaignData, client: Number(target) })}>
                                {clientsData !== null &&
                                    clientsData.map((client: Client) => {
                                        return <Option key={`${client.id}`} value={`${client.id}`}><span>{client.first} {client.last}</span></Option>;
                                    })}
                            </Select>
                            {/* <Button size="sm" variant="text" color="red" className="border-gray-500 whitespace-nowrap flex items-center gap-3" onClick={() => console.log('add new client')}><FaPlus size="1rem" /> <span>Create new</span></Button> */}

                        </div>
                        <div className="mb-4 flex gap-1">
                            <Select variant="outlined" label="Select product" value={String(singleCampaignData.product)} color="red" onChange={(target) => setSingleCampaignData({ ...singleCampaignData, product: Number(target) })}>
                                {productsData !== null &&
                                    productsData.map((product: any) => {
                                        return <Option key={`${product.id}`} value={`${product.id}`}><span>{product.name}</span></Option>;
                                    })}
                            </Select>
                        </div>
                        <div className="mb-4">
                            {singleCampaignData !== null &&
                                <Input size="lg" label="Quote" color="red" defaultValue={singleCampaignData.quote} onChange={(e) => setSingleCampaignData({ ...singleCampaignData, quote: Number(e.target.value) })} />}
                        </div>
                        <div className="mb-4">
                            {singleCampaignData !== null &&
                                <Input size="lg" label="Meeting url" color="red" defaultValue={singleCampaignData.meeting_url} onChange={(e) => setSingleCampaignData({ ...singleCampaignData, meeting_url: e.target.value })} />}
                        </div>
                        <div className="mb-4">
                            {singleCampaignData !== null &&
                                <Select variant="outlined" label="Status" value={singleCampaignData.status.toUpperCase()} color="red" onChange={(target) => setSingleCampaignData({ ...singleCampaignData, status: target })}>
                                    {Object.keys(CAMPAIGNSTATUS).map((status: string, index: number) => {
                                        return <Option key={index} value={status.toUpperCase()}><span>{status}</span></Option>;
                                    })}
                                </Select>}
                        </div>
                        <div className="mb-4">

                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                </div>}
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
    </Dialog>;
};
