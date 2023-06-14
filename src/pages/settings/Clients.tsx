import parse from "html-react-parser";
import Modali, { useModali } from 'modali';
import { useEffect, useMemo, useState } from "react";
import { Table1 } from "../../components/Table/Table1";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { Button2 } from "../../components/Table/Button2";


function ClientSettings() {

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


    const [tableData, setTableData] = useState(null);

    const [template, setTemplate] = useState('');
    const parsedTemplate = parse(template);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://mwxdigital.com/kapsall/kapsall/API/?type=clients');
            const json = await response.json();
            setTableData(json);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };


    const getColumns = () => [
        {
            Header: "Client Name",
            accessor: "name",
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
                        <Button2 content={<FaEdit size="1rem" />} onClick={() => handleToggleEditModal(row.original)} />
                        <Button2 content={<FaRegEye size="1rem" />} onClick={() => handleTogglePreviewModal(row.original)} />
                    </div>
                );
            },
        },
    ];

    const fetchTemplate = async (templateData: any) => {
        try {
            const response = await fetch('https://mwxdigital.com/kapsall/kapsall/API/template.php?id=' + templateData.id);
            const templateHTML = await response.text();
            setTemplate(templateHTML);
            setModalContent({ title: templateData.name + ' preview', body: templateData.description, type: MODALTYPES.PREVIEW });
            toggleModal();
        } catch (error) {
            console.log('Error fetching template:', error);
        }
    };

    const handleTogglePreviewModal = (templateData: any) => {
        fetchTemplate(templateData); // fetch template from API
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
                                <p> UPLOAD TEMPLATE FILE HERE </p>
                            </div>
                        </div>
                    }
                </div>
            </Modali.Modal>
        </div>
    );
}

export { ClientSettings };
