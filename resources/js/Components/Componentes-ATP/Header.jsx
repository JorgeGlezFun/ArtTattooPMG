import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Header({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState([]);

    return (
        <>
            <nav className="navegador">
                <div className="contenedorXL">
                    <div className="contenedorLogo">
                        <Link href={route('/')}>
                            <ApplicationLogo />
                        </Link>
                    </div>

                    <div className="contenedorBotonesNav">
                        <NavLink href={route('/')} active={route().current('/')}>
                            Inicio
                        </NavLink>
                        <NavLink href={route('sobrenosotros')} active={route().current('sobrenosotros')}>
                            Sobre Nosotros
                        </NavLink>
                        <NavLink href={route('galerias.public')} active={route().current('galerias.public')}>
                            Galería
                        </NavLink>
                        <NavLink href={route('eventos.public')} active={route().current('eventos.public')}>
                            Eventos
                        </NavLink>
                        <NavLink href={route('contacto')} active={route().current('contacto')}>
                            Reservar Cita
                        </NavLink>
                    </div>

                    <div className="contenedorXS">
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
                    <ResponsiveNavLink href={route('galerias.public')} active={route().current('galerias.public')}>
                        Galería
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('eventos.public')} active={route().current('eventos.public')}>
                        Eventos
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('contacto')} active={route().current('contacto')}>
                        Reservar Cita
                    </ResponsiveNavLink>
                    {user ? (
                        <>
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            {(tipoUsuario === 'Admin' || tipoUsuario === 'admin') && (
                                <ResponsiveNavLink href={route('admin')}>Administración</ResponsiveNavLink>
                            )}
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Desconectarse
                            </ResponsiveNavLink>
                        </>
                    ) : (
                        <ResponsiveNavLink href={route('login')} active={route().current('login')}>
                            Iniciar Sesión
                        </ResponsiveNavLink>
                    )}
                </div>
            </nav>
        </>
    );
}
