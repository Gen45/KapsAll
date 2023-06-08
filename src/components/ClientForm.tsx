import { TopButton } from "./TopButton";

export function ClientForm() {
  const inputStyle =
    "bg-slate-200 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500";
  return (
    <>
      <div className="flex justify-between items-center gap-5 mb-5">
        <h1 className="text-xl text-slate-600">Client</h1>
        <button type="button" className="ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600  dark:text-slate-400 dark:hover:text-slate-300"><span className="sr-only">Search</span><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6"></circle></svg></button>
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
          <div className="mb-6  max-w-sm">
            <label className="block text-sm text-gray-500" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              className={inputStyle}
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
      </div>
    </>
  );
}
