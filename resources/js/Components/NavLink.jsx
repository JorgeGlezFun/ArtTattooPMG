import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'w-44 h-full font-normal inline-flex justify-center items-center text-xl transition duration-500 ease-in-out ' +
                (active
                    ? ' bg-[#efb810] text-black border-b-4 border-black'
                    : ' text-[#efb810] bg-black hover:bg-[#efb810] hover:text-black') +
                className
            }
        >
            {children}
        </Link>
    );
}
