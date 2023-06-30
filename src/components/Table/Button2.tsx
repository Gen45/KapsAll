import { ReactNode } from "react";

export function Button2({ children, onClick, active, disabled }: { children: ReactNode, onClick: () => void, active?: boolean, disabled?: boolean }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-8 h-8  text-sm font-normal transition-colors rounded-md
        ${active
          ? "bg-red-600 text-white"
          : "bg-white text-red-600"
        } 
        ${!disabled
          ? "hover:bg-red-600 hover:text-white"
          : "opacity-30 text-red-300 cursor-not-allowed"
        }
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
