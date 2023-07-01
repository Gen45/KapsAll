import classNames from "classnames";

export function TabButton({ title, active, onClick }: { title: string; active?: boolean; dark?: boolean; onClick?: () => void; }) {


  const TabButtonStyle = classNames(
    'py-3 cursor-pointer font-normal mr-5 relative uppercase',
    {
      'text-gray-500': !active,
    },
    {
      'text-black': active,
    }
  );

  return (
    <a className={TabButtonStyle} onClick={onClick}>
      {title}
      {active &&
        <span className="absolute bottom-0 left-1/2 w-4 -translate-x-2 h-[2px] bg-red-600  z-10"></span>
      }
    </a>
  );
}
