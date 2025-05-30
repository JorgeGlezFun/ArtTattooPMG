import { useState } from 'react';
import ApplicationLogoAdmin from '@/Components/ComponentesAdmin/ApplicationLogoAdmin';
import NavLinkAdmin from '@/Components/ComponentesAdmin/NavLinkAdmin';
import NavLinkAdminDesplegable from '@/Components/ComponentesAdmin/NavLinkAdminDesplegable';
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
                        <NavLinkAdmin href={route('admin')} active={route().current('/')}>
                            Inicio
                        </NavLinkAdmin>
                        <div className='divLinkNavAdminDesplegable'>
                            <h1 className='w-full text-center'>Administrar Galerias y Eventos</h1>
                            <div className='desplegablesAdmin'>
                                <NavLinkAdminDesplegable href={route('galerias.index')} active={route().current('galerias.*')}>
                                    Galería
                                </NavLinkAdminDesplegable>
                                <NavLinkAdminDesplegable href={route('eventos.index')} active={route().current('eventos.*')}>
                                    Eventos
                                </NavLinkAdminDesplegable>
                                <div className='linkNavAdminDesplegable opacity-0'>
                                    Relleno
                                </div>
                            </div>
                        </div>
                        <div className='divLinkNavAdminDesplegable'>
                            <h1 className='w-full text-center'>Administrar Usuarios</h1>
                            <div className='desplegablesAdmin'>
                                <NavLinkAdminDesplegable href={route('usuario_tipo.index')} active={route().current('usuario_tipo.*')}>
                                    Tipos
                                </NavLinkAdminDesplegable>
                                <NavLinkAdminDesplegable href={route('usuarios.index')} active={route().current('usuarios.*')}>
                                    Usuarios
                                </NavLinkAdminDesplegable>
                                <div className='linkNavAdminDesplegable opacity-0'>
                                    Relleno
                                </div>
                            </div>
                        </div>

                            <DropdownAdmin>
                                <DropdownAdmin.Trigger>
                                    <span className="rounded-md">
                                    <button
                                        type="button"
                                        className="h-full 2xl:w-44 inline-flex justify-center items-center px-3 py-2 border border-transparent leading-4 text-xl font-normal text-black hover:text-[#efb810] hover:bg-black transition ease-in-out duration-500"
                                    >
                                        <span className="hidden 2xl:inline">Opciones</span>

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
                                    <DropdownAdmin.Link href={route('/')} active={route().current('/')}>Volver al lado del cliente</DropdownAdmin.Link>
                                    <DropdownAdmin.Link href={route('logout')} method="post" as="button">
                                        Cerrar Sesión
                                    </DropdownAdmin.Link>
                                </DropdownAdmin.Content>
                            </DropdownAdmin>
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
                    <ResponsiveNavLinkAdmin href={route('usuarios.index')} active={route().current('usuarios.*')}>
                        Usuarios
                    </ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('profile.edit')}>Perfil</ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin href={route('/')}>Volver al lado del cliente</ResponsiveNavLinkAdmin>
                    <ResponsiveNavLinkAdmin method="post" href={route('logout')} as="button">
                        Desconectarse
                    </ResponsiveNavLinkAdmin>
                </div>
            </nav>
        </>
    );
}
