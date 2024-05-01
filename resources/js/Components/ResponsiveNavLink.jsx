import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start justify-center ps-3 pe-4 py-8 ${
                active
                    ? 'text-black bg-[#efb810] focus:text-black focus:bg-[#ffbf00]'
                    : 'border-transparent text-[#efb810] hover:text-black hover:bg-[#efb810] focus:text-black focus:bg-[#ffbf00]'
            } text-base font-bold focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
