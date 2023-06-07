export function TopButton({ title, active }: { title: string; active?: boolean; }) {
  return (
    <a className={`p-2 px-5 rounded-xl cursor-pointer ${active ? 'bg-[#c7362e] text-white' : 'hover:bg-slate-100 text-gray-600 hover:text-gray-700'}`}>
      {title}
    </a>
  );
}
