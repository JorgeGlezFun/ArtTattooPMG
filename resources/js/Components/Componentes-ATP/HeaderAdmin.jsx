import { useState } from 'react';
import ApplicationLogoAdmin from '@/Components/ComponentesAdmin/ApplicationLogoAdmin';
import NavLinkAdmin from '@/Components/ComponentesAdmin/NavLinkAdmin';
import DropdownAdmin from '@/Components/ComponentesAdmin/DropdownAdmin';
import ResponsiveNavLinkAdmin from '@/Components/ComponentesAdmin/ResponsiveNavLinkAdmin';
import { Link } from '@inertiajs/react';

export default function HeaderAdmin({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <>
            <nav className="navegadorAdmin">
                <div className="contenedorXLAdmin">
                    <div className="contenedorLogoAdmin">
                        <Link href={route('/')}>
                            <ApplicationLogoAdmin />
                        </Link>
                    </div>

                    <div className="contenedorBotonesNavAdmin">
                        <NavLinkAdmin href={route('/')} active={route().current('/')}>
                            Inicio
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('galerias.index')} active={route().current('galerias.*')}>
                            Galería
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('eventos.index')} active={route().current('eventos.*')}>
                            Eventos
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('estaciones.index')} active={route().current('estaciones.*')}>
                            Estaciones
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('horarios.index')} active={route().current('horarios.*')}>
                            Horas
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('descansos.index')} active={route().current('descansos.*')}>
                            Descansos
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('artistas.index')} active={route().current('artistas.*')}>
                            Artistas
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('usuarios.index')} active={route().current('usuarios.*')}>
                            Usuarios
                        </NavLinkAdmin>
                        <NavLinkAdmin href={route('reservas.index')} active={route().current('reservas.*')}>
                            Reservas
                        </NavLinkAdmin>
                        {user ?
                            (
                                <DropdownAdmin>
                                    <DropdownAdmin.Trigger>
                                        <span className="rounded-md">
                                        <button
                                            type="button"
                                            className="h-full 2xl:w-44 inline-flex justify-center items-center px-3 py-2 border border-transparent leading-4 text-xl font-normal text-black hover:text-[#efb810] hover:bg-black transition ease-in-out duration-500"
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
                                    </DropdownAdmin.Trigger>

                                    <DropdownAdmin.Content>
                                        <DropdownAdmin.Link href={route('profile.edit')} active={route().current('profile.edit')}>Perfil</DropdownAdmin.Link>
                                        <DropdownAdmin.Link href={route('logout')} method="post" as="button">
                                            Cerrar Sesión
                                        </DropdownAdmin.Link>
                                    </DropdownAdmin.Content>
                                </DropdownAdmin>
                            ) :
                            (
                                <Link href={route('login')} active={route().current('login')} className='linkUsuario'/>
                            )
                            }
                    </div>

                    <div className="contenedorXSAdmin">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="botonUsuarioAdmin"
                        >
                            <svg className="flechaBotonUsuarioAdmin" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                    <ResponsiveNavLinkAdmin href={route('/')} active={route().current('/')}>
                        Inicio
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('galerias.index')} active={route().current('galeria.*')}>
                        Galería
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('eventos.index')} active={route().current('eventos.*')}>
                        Eventos
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('estaciones.index')} active={route().current('estaciones.*')}>
                        Estaciones
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('horarios.index')} active={route().current('horarios.*')}>
                        Horas
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('descansos.index')} active={route().current('descansos.*')}>
                        Descansos
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('artistas.index')} active={route().current('artistas.*')}>
                        Artistas
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('usuarios.index')} active={route().current('usuarios.*')}>
                        Usuarios
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('reservas.index')} active={route().current('reservas.*')}>
                        Reservas
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('profile.edit')}>Perfil</ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin method="post" href={route('logout')} as="button">
                        Desconectarse
                    </ResponsiveNavLinkAdmin>
                </div>
            </nav>
        </>
    );
}
