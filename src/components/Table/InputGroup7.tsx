export function InputGroup7({
    label,
    name,
    value,
    onChange,
    type = "text",
    decoration,
    className = "",
    inputClassName = "",
    decorationClassName = "",
    disabled,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { label: string, name: string, value: string, onChange: any, type?: string, decoration: any, className?: string, inputClassName?: string, decorationClassName?: string, disabled?: boolean }) {
    return (
        <div
            className={`flex flex-row-reverse items-stretch w-full rounded-md overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}
        >
            <input
                id={name}
                name={name}
                value={value}
                type={type}
                placeholder={label}
                aria-label={label}
                onChange={onChange}
                className={`text-sm peer block w-full p-3 text-gray-600 border-none focus:outline-none focus:ring-0 appearance-none ${disabled ? "bg-gray-200" : ""
                    } ${inputClassName}`}
                disabled={disabled}
            />
            <div
                className={`flex items-center pl-3 py-3 text-gray-600 ${disabled ? "bg-gray-200" : ""
                    } ${decorationClassName}`}
            >
                {decoration}
            </div>
        </div>
    );
}