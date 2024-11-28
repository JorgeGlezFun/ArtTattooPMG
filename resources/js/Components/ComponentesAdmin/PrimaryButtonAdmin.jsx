export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-black border border-transparent rounded-md font-semibold text-xs text-[#efb810] uppercase tracking-widest hover:text-black hover:bg-[#efb810] focus:bg-[#ffde44] active:text-black active:bg-[#ffde44] transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
