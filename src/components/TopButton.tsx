import { Link } from "react-router-dom";

export function TopButton({ title, active, url }: { title: string; active?: boolean; url: string; }) {

  const className = `p-2 px-5 rounded-xl cursor-pointer ${active
      ? 'bg-[#c7362e] text-white'
      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`

  return (
    <Link className={className} to={`${url}`} >
      {title}
    </Link>
  );
}
