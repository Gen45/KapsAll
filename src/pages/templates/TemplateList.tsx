import parse from "html-react-parser";
import { useEffect,  useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { API_URL, MODALTYPES } from "@/utils/constants";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner } from '@material-tailwind/react';
import { Button2 } from "@components/Table/Button2";

export default function TemplatesList() {

    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT', data: null });

    const [templatesData, setTemplatesData] = useState<any | null>(null);
    const [templateData, setTemplateData] = useState<any | null>(null);
    const [template, setTemplate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const parsedTemplate = parse(template);

    // Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const getTemplatesData = async () => {
        const templates = fetch(`${API_URL}templatex`).then(r => r.json());
        const res = await Promise.all([templates]);
        const [templatesRes] = res;
        setTemplatesData(templatesRes);
        // console.log(templatesRes);
    }

    useEffect(() => {
        getTemplatesData()
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (modalContent.data !== null) {
            fetch(`${API_URL}templates/${templateData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({ first: templateData.first, last: templateData.last, email: templateData.email })
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        console.log(response.json());
                        setErrorMessage('Success');
                        handleOpen();
                        getTemplatesData();
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
                    setErrorMessage('Error saving template data...');
                    handleOpen();
                });
        }
    };

    const getColumns = () => [
        {
            Header: "Template Name",
            accessor: "name",
        },
        {
            Header: "Description",
            accessor: "description",
        },
        {
            Header: "Actions",
            accessor: "actions",
            unsortable: true,
            Cell: ({ row }: { row: any; }) => {
                return (
                    <div className="flex gap-2 items-center">
                        <Button2 content={<FaEdit size="1rem" />} onClick={() => handleToggleEditModal(row.original)} />
                        <Button2 content={<FaRegEye size="1rem" />} onClick={() => handleTogglePreviewModal(row.original)} />
                    </div>
                );
            },
        },
    ];

    const fetchTemplate = async (templateData: any) => {
        try {
            const response = await fetch(`${API_URL}template/${templateData.file}`);
            const templateHTML = await response.text();
            setTemplate(templateHTML);
            setModalContent({ title: templateData.name + ' preview', body: templateData.description, type: MODALTYPES.PREVIEW, data: templateData });
            handleOpen();
        } catch (error) {
            console.log('Error fetching template:', error);
        }
    };

    const handleTogglePreviewModal = (data: any) => {
        if (data.file !== '') {
            fetchTemplate(data); // fetch template from API
        } else {
            handleToggleEditModal(data); // if no template file, open edit modal instead
        }
    }

    const handleToggleEditModal = (data: any) => {
        setTemplateData({ id: data.id, first: data.first, last: data.last, email: data.email });
        setModalContent({ title: 'Edit template', body: data.description, type: MODALTYPES.EDIT, data: data });
        handleOpen();
    }

    return (
        <div className="flex flex-col grow overflow-auto p-8">
            {templatesData
                ?
                <Table1 data={templatesData} columns={getColumns()} />
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">
                        <Spinner className="h-12 w-12" color="red" />
                    </div>
                )}

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{modalContent.title}</DialogHeader>
                <DialogBody divider>
                    {modalContent.body}
                    {modalContent.type == MODALTYPES.PREVIEW &&
                        <div className="border-2 rounded-lg">
                            {parsedTemplate != ''
                                ?
                                parsedTemplate
                                :
                                <div className="text-red-500 p-8">
                                    <p>No template file found</p>
                                </div>
                            }
                        </div>
                    }
                    {modalContent.type == MODALTYPES.EDIT &&
                        <div className="border-2 rounded-lg">
                            <div className="text-red-500 p-8">
                                <label className="text-sm font-medium text-gray-900 block mb-2" htmlFor="user_avatar">Upload template file</label>
                                <input className="block w-full p-4 cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-sm" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                                <div className="mt-1 text-sm text-gray-500" id="user_avatar_help">
                                    Upload an html file with the template code
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

export { TemplatesList };
