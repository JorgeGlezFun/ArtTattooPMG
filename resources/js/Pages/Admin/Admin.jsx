import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../../img/Logo-Fondo/Logo.png"
import { Head, Link } from '@inertiajs/react';

export default function Inicio({ auth }) {
    return (
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='mainAdmin'>
                <div className="infoAdmin">
                    <div className="infoTextoAdmin">
                        <h1 className="titulo">Bienvenido a la zona de administración</h1>
                        <hr className="separador"/>
                        <p className="texto">
                            En esta zona podrás gestionar las reservas, usuarios, galerias, eventos y mucho mas de la web de ArtTattooPMG.
                            <br />
                            Para ello simplemente haz click en la pestaña que quieras gestionar en la barra de navegación.
                            <br />
                            Una vez dentro tienes los métodos necesarios para crear, editar, ver o eliminar los elementos de la web.
                        </p>
                        <img src={logo} alt="Logo ArtTattooPMG del body" className="Logo"/>
                    </div>
                </div>
            </div>
        </>
    );
}
