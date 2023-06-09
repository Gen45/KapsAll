import Modali, { useModali } from 'modali';
import { useEffect, useMemo, useState } from "react";
import { Table1 } from "@components/Table/Table1";
import { FaEdit } from "react-icons/fa";
import { Button2 } from "@components/Table/Button2";
import { API_URL, MODALTYPES } from '@/utils/constants';
import { Spinner } from '@material-tailwind/react';

export default function ProductList() {

    const [modalContent, setModalContent] = useState({ title: 'title', body: 'body', type: 'PREVIEW | EDIT' });

    const [Modal, toggleModal] = useModali({
        animated: true,
        title: modalContent.title,
        large: true,
    });

    const [tableData, setTableData] = useState<any | null>(null);

    useEffect(() => {
        const go = async () => {
            const products = fetch(`${API_URL}products`).then(r => r.json());
            const res = await Promise.all([products]);
            const [productsRes] = res;
            setTableData(productsRes);
        }
        go()
    }, []);

    const getColumns = () => [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Model",
            accessor: "model",
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
    ];

    const handleToggleEditModal = (templateData: any) => {
        setModalContent({ title: templateData.name + ' edit', body: templateData.description, type: MODALTYPES.EDIT });
        toggleModal();
    }

    const columns = useMemo(getColumns, []);

    return (
        <div className="flex flex-col grow overflow-auto pt-4">
            {tableData
                ?
                <Table1 data={tableData} columns={columns} />
                : (
                    <div className="flex justify-center items-center w-full h-full py-36">
                        <Spinner className="h-12 w-12" color="red" />
                    </div>
                )}

            <Modali.Modal {...Modal}>
                <div className="flex flex-col gap-4 grow p-8">
                    {modalContent.body}

                    {modalContent.type == MODALTYPES.EDIT &&
                        <div className="border-2 rounded-lg">
                            <div className="text-red-500 p-8">
                                <p> EDIT PRODUCT DATA HERE </p>
                            </div>
                        </div>
                    }
                </div>
            </Modali.Modal>
        </div>
    );
}