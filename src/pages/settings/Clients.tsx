import { faker } from "@faker-js/faker";
import { Avatar } from "../../components/Table/Avatar";
import { Table1 } from "../../components/Table/Table1";

const generateData = (numberOfRows = 25) =>
  [...Array(numberOfRows)].map(() => ({
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    accountNumber: faker.finance.account(8),
    accountName: faker.finance.accountName(),
    amount: faker.finance.amount(500, 1e4, 2, "$"),
  }));
const getColumns = () => [
  {
    Header: "Name",
    accessor: "name",
    width: "300px",
    Cell: ({ row, value }) => {
      return (
        <div className="flex gap-2 items-center">
          <Avatar src={row.original.image} alt={`${value}'s Avatar`} />
          <div>{value}</div>
        </div>
      );
    },
  },
  {
    Header: "Account Number",
    accessor: "accountNumber",
  },
  {
    Header: "Account Name",
    accessor: "accountName",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
];



function ClientSettings() {
  return (
    <div className="flex flex-col grow overflow-auto p-8">
      <Table1 generateData={generateData} getColumns={getColumns} />
    </div>
  );
}

export { ClientSettings };
