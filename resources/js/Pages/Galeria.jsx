import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Tatuajes/Normales/Normal-9.jpeg";
import { Head } from '@inertiajs/react';
import ModalImage from "react-modal-image";

export default function Galeria({ auth }) {
    const imagenes = [logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo];

    let filas = [];
    let prueba = [];
    for (let fila = 0; fila < 3; fila++) {
        let divs = [];
        for (let columna = 0; columna < 5; columna++) {
            divs.push(
                <div key={`${fila}-${columna}`} className='hidden contenedorImagenGaleria'>
                    <ModalImage
                        small={imagenes[fila * 5 + columna]}
                        large={imagenes[fila * 5 + columna]}
                        alt={`Imagen ${fila * 5 + columna}`}
                        className='imagenGaleria'
                    />
                </div>
            );
        }
        filas.push(<div key={fila} className='fila'>{divs}</div>);
    }

    imagenes.forEach(imagen => {
        prueba.push(
        <div className='contenedorImagenGaleria'>
            <ModalImage
                small={imagen}
                large={imagen}
                alt="Imagen"
                className='imagenGaleria'
            />
        </div>
        );
    });

    return (
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='mainGaleria'>
                <div className="contenedorGaleria">
                    <div className='contenedorSeleccion'>
                        <h1>Estilos:</h1>
                        <form action="" className='flex flex-col w-full h-full'>
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
                        {prueba}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
