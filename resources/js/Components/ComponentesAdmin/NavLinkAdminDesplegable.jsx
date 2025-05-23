import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                (active
                    ? ' linkNavActivoAdminDesplegable'
                    : ' linkNavAdminDesplegable')
            }
        >
            {children}
        </Link>
    );
}
