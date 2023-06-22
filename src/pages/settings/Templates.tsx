import parse from "html-react-parser";
import Modali, { useModali } from 'modali';
import { useEffect, useMemo, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { Button2 } from "@components/Table/Button2";
// import { fetchData } from "@/utils/fetch";
import { API_URL, MODALTYPES } from "@/utils/constants";

function TemplatesSettings() {

    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT' });

    const [Modal, toggleModal] = useModali({
        animated: true,
        title: modalContent.title,
        large: true,
    });

    const [tableData, setTableData] = useState(null);

    const [template, setTemplate] = useState('');
    const parsedTemplate = parse(template);

    useEffect(() => {
        const go = async () => {
            const templates = fetch(`${API_URL}templates`).then(r => r.json());
            const res = await Promise.all([templates]);
            const [templatesRes] = res;
            setTableData(templatesRes);
            // console.log(templatesRes);
        }
        go()
    }, []);

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
            setModalContent({ title: templateData.name + ' preview', body: templateData.description, type: MODALTYPES.PREVIEW });
            toggleModal();
        } catch (error) {
            console.log('Error fetching template:', error);
        }
    };

    const handleTogglePreviewModal = (templateData: any) => {
        if(templateData.file !== ''){
            fetchTemplate(templateData); // fetch template from API
        } else {
            handleToggleEditModal(templateData); // if no template file, open edit modal instead
        }
    }

    const handleToggleEditModal = (templateData: any) => {
        setModalContent({ title: templateData.name + ' edit', body: templateData.description, type: MODALTYPES.EDIT });
        toggleModal();
    }

    const columns = useMemo(getColumns, []);

    return (
        <div className="flex flex-col grow overflow-auto p-8">
            {tableData
                ?
                <Table1 data={tableData} columns={columns} />
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">Loading...</div>
                )}

            <Modali.Modal {...Modal}>
                <div className="flex flex-col gap-4 grow p-8">
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
                            </div>
                        </div>
                    }
                </div>
            </Modali.Modal>
        </div>
    );
}

export { TemplatesSettings };
