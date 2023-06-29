export function TabButton({ title, active, dark, onClick }: { title: string; active?: boolean; dark?: boolean; onClick?: () => void; }) {

  let TabButtonStyle = " pt-3 px-4 cursor-pointer font-normal ";

  if (dark) {
    TabButtonStyle += active
      ? "border-b-red-600 border-b-2 text-red-600 "
      : "text-gray-500 hover:text-red-500 hover:border-b-4 border-b-transparent "
  } else {
    TabButtonStyle += active
      ? "border-b-white  border-b-4 text-white "
      : "text-red-300 hover:text-red-200 hover:border-b-4 border-b-transparent "
  }

  return (
    <a className={TabButtonStyle} onClick={onClick}>
      {title}
    </a>
  );
}
