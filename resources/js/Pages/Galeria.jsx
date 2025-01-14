import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Tatuajes/Normales/Normal-9.jpeg";
import { Head } from '@inertiajs/react';
import ModalImage from "react-modal-image";

export default function Galeria({ auth }) {
    const imagenes = [logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo, logo];

    return (
        <>
            <Head title="Galeria" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorGaleria">
                    <div className='infoGaleria'>
                        <h1 className='titulo'>Galería</h1>
                        <hr className='separadorSN'/>
                        <p className='textoGaleria'>
                            Bienvenido a la galeria de nuestro estudio. Aquí podrás encontrar una muestra de los trabajos que hemos realizado, ya sean tatuajes o piercings. <br />
                            Si te interesa alguno de los trabajos que ves aquí, no dudes en contactarnos para agendar una cita.
                        </p>
                    </div>
                    {/* <div className='contenedorSeleccion'>
                        <form action="" className='flex flex-row w-full h-full justify-between'>
                            <div>
                                <h2>Trabajo:</h2>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Tatuaje</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Piercing</label>
                                </div>
                            </div>
                            <div>
                                <h2>Estilos:</h2>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Anime</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Disney</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Realista</label>
                                </div>
                            </div>
                            <div>
                                <h2>Tamaño:</h2>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Pequeño</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Mediano</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Grande</label>
                                </div>
                            </div>
                            <div>
                                <h2>Tamaño:</h2>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Pequeño</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Mediano</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <label htmlFor=""> Grande</label>
                                </div>
                            </div>
                        </form>
                    </div> */}
                    <div className='contenedorImagenesGaleria'>
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
            </div>
            <Footer />
        </>
    );
}
