function Cell({ title, header, children }: { title?: any; header?: boolean; children?: any; }) {

    const th = "bg-persian-red-600 font-medium p-4 py-0 text-white h-10 text-center first:pl-8  last:pr-8" as string;
    const td = "border-b border-gray-100 dark:border-gray-700 p-4 py-3 first:pl-8 text-gray-500 dark:text-gray-400 text-center last:pr-8 group-hover:bg-slate-50 group-hover:dark:bg-slate-800 group-last:border-0" as string;

    return (header ?
        <th className={th}>{title || children}</th> :
        <td className={td}>{title || children}</td>
    )
}

function Row({ row, header }: { row: object; header?: boolean }) {
    return (
        <tr>
            {
                Object.keys(row).map((item, index) => {

                    return (header
                        ?
                        <Cell key={index} header title={item} />
                        :
                        <Cell key={index}>{row[item]}</Cell>
                    )
                })
            }
        </tr>
    )
}

export function Table() {

    interface status {
        on: "string";
        draft: "string"
        cancelled: "string"
    }

    const example = [{
        "Campaign ID": "MM01",
        "Client": "Malcolm Lockyer",
        "Product": "Model AU-4 Unscrambler",
        "Status": "on",
        "Replies": 1,
    }, {
        "Campaign ID": "MM02",
        "Client": "Malcolm Jackson",
        "Product": "Model AU-5 Unscrambler",
        "Status": "cancelled",
        "Replies": 0,
    }]

    const status = {
        on: "bg-green-200 text-black text-xs font-semibold text-center p-1 px-3 rounded-full w-28 inline-block",
        draft: "bg-slate-200 text-black text-xs font-semibold text-center p-1 px-3 rounded-full w-28 inline-block",
        cancelled: "bg-red-200 text-black text-xs font-semibold text-center p-1 px-3 rounded-full w-28 inline-block"
    }

    return (
        <table className="border-collapse table-auto w-full text-sm">
            <thead>
                <Row header row={example[0]} />
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
                {

                    example.map((item, index) => {
                        return (
                            <Row key={index} row={item} />
                        )
                    })
                }
            </tbody>
        </table>
    )
}