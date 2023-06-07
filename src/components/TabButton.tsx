export function TabButton({
  title,
  active,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <a
      className={`p-2 pt-3 px-2  cursor-pointer ${
        active
          ? "border-b-red-600  border-b-2 text-red-600"
          : "hover:text-gray-800 hover:border-b-2 border-b-gray-300 "
      }`}
    >
      {title}
    </a>
  );
}
