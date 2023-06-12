export function TabButton({ title, active, dark, onClick }: { title: string; active?: boolean; dark?: boolean; onClick?: () => void; }) {

  let TabButtonStyle: string = " pt-3 px-4 cursor-pointer font-semibold ";

  if (dark) {
    TabButtonStyle += active
      ? "border-b-persian-red-600 border-b-2 text-persian-red-600 "
      : "text-gray-500 hover:text-persian-red-500 hover:border-b-4 border-b-transparent "
  } else {
    TabButtonStyle += active
      ? "border-b-white  border-b-4 text-white "
      : "text-persian-red-300 hover:text-persian-red-200 hover:border-b-4 border-b-transparent "
  }

  return (
    <a className={TabButtonStyle} onClick={onClick}>
      {title}
    </a>
  );
}
