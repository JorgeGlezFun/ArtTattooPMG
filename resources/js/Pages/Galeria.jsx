import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Logo-Fondo/Logo.png"
import { Head } from '@inertiajs/react';

export default function Galeria({ auth }) {
    let filas = [];
    for (let i = 0; i < 3; i++) {
        let divs = [];
        for (let j = 0; j < 4; j++) {
            divs.push(
                <div key={`${i}-${j}`} className='contenedorImagenGaleria'>
                    <img src={logo} alt="Logo" />
                </div>
            );
        }
        filas.push(<div key={i} className='fila'>{divs}</div>);
    }

    return (
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='mainGaleria'>
                <div className="contenedorGaleria">
                    <div className='h-full w-fit flex flex-col items-start justify-start p-4'>
                        <h1>Estilos:</h1>
                        <form action="" className='flex flex-col'>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor=""> A color</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor=""> A color</label>
                            </div>
                            <div>
                                <input type="checkbox" name="" id="" />
                                <label htmlFor=""> A color</label>
                            </div>
                        </form>
                    </div>
                    <div className=''>
                        {filas}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
