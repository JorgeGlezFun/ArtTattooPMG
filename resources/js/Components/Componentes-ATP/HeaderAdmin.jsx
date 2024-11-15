import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function HeaderAdmin({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <nav className="navegadorAdmin">
                <div className="contenedorXLAdmin">
                    <div className="contenedorLogoAdmin">
                        <Link href={route('/')}>
                            <ApplicationLogo />
                        </Link>
                    </div>

                    <div className="contenedorBotonesNavAdmin">
                        <NavLink href={route('/')} active={route().current('/')}>
                            Inicio
                        </NavLink>
                        <NavLink href={route('sobrenosotros')} active={route().current('sobrenosotros')}>
                            Sobre Nosotros
                        </NavLink>
                        <NavLink href={route('galeria')} active={route().current('galeria')}>
                            Galería
                        </NavLink>
                        <NavLink href={route('eventos')} active={route().current('eventos')}>
                            Eventos
                        </NavLink>
                        <NavLink href={route('reservas.create')} active={route().current('reservas.create')}>
                            Reservar Cita
                        </NavLink>
                        {user ?
                            (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="rounded-md">
                                        <button
                                            type="button"
                                            className="h-full 2xl:w-44 inline-flex justify-center items-center px-3 py-2 border border-transparent leading-4 text-xl font-normal text-[#efb810] hover:text-black hover:bg-[#efb810] transition ease-in-out duration-500"
                                        >
                                            <span className="hidden 2xl:inline">{user.nombre}</span>

                                            <svg
                                                className="2xl:ms-2 h-6 w-6"
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
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) :
                            (
                                <Link href={route('login')} active={route().current('login')} className='linkUsuario'/>
                            )
                            }
                    </div>

                    <div className="contenedorXSAdmin">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="botonUsuario"
                        >
                            <svg className="flechaBotonUsuario" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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

                <div className={'xl:hidden ' + (showingNavigationDropdown ? 'block' : 'hidden') + ' xl:hidden'}>
                    <ResponsiveNavLink href={route('/')} active={route().current('/')}>
                        Inicio
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('sobrenosotros')} active={route().current('sobrenosotros')}>
                        Sobre Nosotros
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('galeria')} active={route().current('galeria')}>
                        Galería
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('eventos')} active={route().current('eventos')}>
                        Eventos
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('reservas.create')} active={route().current('reservas.create')}>
                        Reservar Cita
                    </ResponsiveNavLink>
                    { user ?
                    (
                        <>
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Desconectarse
                            </ResponsiveNavLink>
                        </>
                    ) : (
                        <ResponsiveNavLink href={route('login')} active={route().current('login')}>
                            Iniciar Sesión
                        </ResponsiveNavLink>
                     )
                    }
                </div>
            </nav>
        </>
    );
}
