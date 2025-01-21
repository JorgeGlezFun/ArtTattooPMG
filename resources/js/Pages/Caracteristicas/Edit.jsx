import React from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';

const Edit = ({ auth, caracteristica, tipos }) => {
    const { data, setData, put, processing, errors } = useForm({
        caracteristica_tipos_id: caracteristica.caracteristica_tipos_id,
        nombre: caracteristica.nombre,
        precio: caracteristica.precio,
        tiempo: caracteristica.tiempo,
    });

    console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('caracteristica_tipos_id', data.caracteristica_tipos_id); // Asegúrate de incluir este campo
        formData.append('nombre', data.nombre);
        formData.append('precio', data.precio);
        formData.append('tiempo', data.tiempo);

        try {
            await put(route('caracteristicas.update', caracteristica.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Característica actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar la característica:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Head title="Editar Característica" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita la característica</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnas'>
                                    <label>Tipo:</label>
                                    <select className='listaTatuajes' name="caracteristica_tipos_id" value={data.caracteristica_tipos_id} onChange={(e) => setData('caracteristica_tipos_id', e.target.value)}>
                                        <option value="">Seleccionar tipo</option>
                                        {tipos.map(tipo => (
                                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                        ))}
                                    </select>
                                    {errors.caracteristica_tipos_id && <div>{errors.caracteristica_tipos_id}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Nombre de la característica:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Nombre de la característica"
                                        value={data.nombre}
                                        onChange={(e ) => setData('nombre', e.target.value)}
                                    />
                                    {errors['nombre'] && <div>{errors['nombre']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Precio:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Precio de la aplicación de la característica"
                                        value={data.precio}
                                        onChange={(e) => setData('precio', e.target.value)}
                                    />
                                    {errors['precio'] && <div>{errors['precio']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Tiempo:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Tiempo que dura la realización de la característica"
                                        value={data.tiempo}
                                        onChange={(e) => setData('tiempo', e.target.value)}
                                    />
                                    {errors['tiempo'] && <div>{errors['tiempo']}</div>}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar característica</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
