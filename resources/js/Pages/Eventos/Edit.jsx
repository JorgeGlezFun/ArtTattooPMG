import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, evento }) => {
    const { data, setData, put, processing, errors } = useForm({
        titulo: evento.titulo,
        contenido: evento.contenido,
        ruta_imagen: null,
    });

    const [imagenPreview, setImagePreviewUrl] = useState(null);

    useEffect(() => {
        setData('ruta_imagen', evento.ruta_imagen);
        setImagePreviewUrl(evento.ruta_imagen);
    }, [evento]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setData('ruta_imagen', file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let ruta_imagen = data.ruta_imagen;
        formData.append('titulo', data.titulo);
        formData.append('contenido', data.contenido);
        formData.append('ruta_imagen', ruta_imagen);

        try {
            await put(route('eventos.update', evento.id), formData, {
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
                            <div className='columnaApellido'>
                                <label>Titulo:</label>
                                <input
                                    className='inputs'
                                    type="text"
                                    placeholder="Nombre del evento"
                                    value={data.titulo}
                                    onChange={(e) => setData('titulo', e.target.value)}
                                />
                                {errors['titulo'] && <div>{errors['titulo']}</div>}
                            </div>
                            <div className='columnaApellido'>
                                <label>Contenido:</label>
                                <textarea name="" id=""
                                    className='inputs'
                                    type="text"
                                    placeholder="Cuerpo del evento"
                                    value={data.contenido}
                                    onChange={(e) => setData('contenido', e.target.value)}
                                />
                                {errors['contenido'] && <div>{errors['contenido']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Imagen de referencia:</label>
                                <div className='divInputImagen'>
                                    <label className='inputImagen'>
                                        {!imagenPreview && (
                                            <span>Haz click aquí para subir una imagen</span>
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
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar Evento</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
