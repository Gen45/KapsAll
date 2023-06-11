import { Link } from "react-router-dom";

export function TopButton({ title, active, url, onClick }: { title: string; active?: boolean; url: string; onClick?: () => void }) {

  const className = `p-2 px-5 rounded-xl cursor-pointer ${active
    ? 'text-persian-red-600 bg-gray-100'
    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`

  return (
    <Link className={className} to={`${url}`} onClick={onClick}>
      {title}
    </Link>
  );
}
