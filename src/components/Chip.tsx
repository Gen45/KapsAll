import { ReactNode } from "react";

interface ChipProps {
    type: string;
    children: ReactNode;
}

export const Chip = ({ type }: ChipProps) => {
    let className = '';
    if (type == 'active') {
        className = 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
    if (type == 'inactive') {
        className = 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
    if (type == 'draft') {
        className = 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
    if (type == 'paused') {
        className = 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
    if (type == 'sent') {
        className = 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold';
    }
    return (
        <div className={className}>{type.toUpperCase()}</div>
    )
}