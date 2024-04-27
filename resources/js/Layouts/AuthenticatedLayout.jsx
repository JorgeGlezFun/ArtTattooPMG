import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-blue-100">
            <nav className="bg-black text-xl text-[#efb810]">
                <div className="max-[720px]:px-4">
                    <div className="flex justify-between h-20 max-[720px]:justify-center">
                        <div className="flex-shrink-0 flex justify-start pl-4 max-[720px]:pl-0 max-[720px]:ml-[19rem] max-[640px]:ml-[16.5rem]">
                            <Link href="/">
                                <ApplicationLogo />
                            </Link>
                        </div>

                        <div className="max-[720px]:hidden flex justify-end w-full">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Inicio
                            </NavLink>
                            <NavLink href={route('/')} active={route().current('/')}>
                                Sobre Nosotros
                            </NavLink>
                            <NavLink href={route('/')} active={route().current('/')}>
                                Galería
                            </NavLink>
                            <NavLink href={route('/')} active={route().current('/')}>
                                Eventos
                            </NavLink>
                            <NavLink href={route('/')} active={route().current('/')}>
                                Reservar Cita
                            </NavLink>
                        </div>
                        {/*}
                        <div className="hidden flex items-center ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Desconectarse
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div> */}

                        <div className="max-[720px]:-me-2 max-[720px]:flex max-[720px]:items-center hidden max-[720px]:mx-auto">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-[#efb810] hover:text-black hover:bg-[#efb810] focus:outline-none focus:bg-[#efb810] focus:text-black transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={'sm:hidden ' + (showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Inicio
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                        Sobre Nosotros
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                        Galería
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                        Eventos
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                        Reservar Cita
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                        Desconectarse
                    </ResponsiveNavLink>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
