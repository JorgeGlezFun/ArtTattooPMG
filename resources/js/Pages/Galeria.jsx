import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Tatuajes/Normales/Normal-9.jpeg";
import { Head } from '@inertiajs/react';
import ModalImage from "react-modal-image";

export default function Galeria({ auth }) {
    const imagenes = [logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo];

    return (
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='mainGaleria'>
                <div className="contenedorGaleria">
                    <div className='contenedorSeleccion'>
                        <h1>Estilos:</h1>
                        <form action="" className='flex flex-col w-fit h-full'>
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
                    <div className='imagenesLightbox'>
                        {imagenes.map((imagen, index) => (
                            <div key={index} className='contenedorImagenGaleria'>
                                <ModalImage
                                    small={imagen}
                                    large={imagen}
                                    hideDownload={true}
                                    alt={`Imagen ${index}`}
                                    className='imagenGaleria'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
