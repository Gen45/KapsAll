import React from 'react';

export type TableColumn = {
    key: string;
    title: string;
    envelope?: any;
    envelopeAttributes?: Array<string>;
};

export type TableProps = {
    columns: TableColumn[];
    data: any[];
};

const InnerCell = ({ attributes, children }: { attributes?: any, children: any }) => {
    return (
        <span {...attributes}>
            {children}
        </span>
    )
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
    return (
        <table className="min-w-full bg-white ">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            className="py-2 px-4 border-b font-semibold text-left"
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        {columns.map((column) => (
                            <td key={column.key} className="py-2 px-4 ">
                                {
                                    column.envelope ?
                                        <column.envelope {...column.envelopeAttributes}>
                                            {row[column.key]}
                                        </column.envelope>
                                        : row[column.key]
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
