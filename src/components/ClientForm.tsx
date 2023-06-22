import { TopButton } from "./TopButton";

export function ClientForm() {
  const inputStyle =
    "bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500";
  return (
    <>
      <div className="flex justify-between items-center gap-5 mb-5">
        <h1 className="text-xl text-gray-600">Client</h1>
        <button type="button" className="ml-auto text-gray-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-gray-600  dark:text-gray-400 dark:hover:text-gray-300"><span className="sr-only">Search</span>
          
        </button>
      </div>
      <div className="form">
        <div className="flex gap-5">
          <div className="mb-6 max-w-sm">
            <label className="block text-sm text-gray-500" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              className={inputStyle}
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>
      </div>
    </>
  );
}
