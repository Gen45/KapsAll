export function Button2({ content, onClick, active, disabled }: { content: any, onClick: () => void, active?: boolean, disabled?: boolean }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
        ${active
          ? "bg-persian-red-600 text-white"
          : "bg-white text-persian-red-600"
        } 
        ${!disabled
          ? "hover:bg-persian-red-600 hover:text-white"
          : "opacity-30 text-persian-red-300 cursor-not-allowed"
        }
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
