import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, galeria }) => {
    const { data, setData, put, processing, errors } = useForm({
        ruta_imagen: null, // Inicialmente null
    });

    const [imagenPreview, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        // Cargar la ruta de la imagen existente
        setData('ruta_imagen', galeria.ruta_imagen);
        setImagePreviewUrl(galeria.ruta_imagen);
    }, [galeria]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setData('ruta_imagen', file);
        } else {
            setData('ruta_imagen', null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let ruta_imagen = data.ruta_imagen;
        console.log(ruta_imagen);
        formData.append('ruta_imagen', ruta_imagen);

        try {
            await put(route('galerias.update', galeria.id), formData, {
                forceFormData: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Imagen actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar la imagen:', error.response ? error.response.data : error.message);
        }
    };

    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Editar Imagen" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Editar Imagen de la Galería</h1>
                            <hr className="separadorFormulario"/>
                            <div className='columnas'>
                                <label>Imagen de referencia:</label>
                                <div className='divInputImagen'>
                                    <label className='inputImagen'>
                                        {!imagenPreview && (
                                            <span>Haz click aquí para subir una galería</span>
                                        )}
                                        <input className='inputImagen' type="file" accept='image/*' name="ruta_imagen" onChange={handleFileChange} />
                                        {errors['ruta_imagen'] && <div>{errors['ruta_imagen']}</div>}
                                        {imagenPreview && (
                                            <div>
                                                <img src={imagenPreview} alt="Vista previa" className='previewImagenFormulario' />
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar Imagen</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
