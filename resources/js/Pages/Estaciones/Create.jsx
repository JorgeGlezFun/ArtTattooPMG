import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth, horarios }) => {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '', // Campo para el nombre de la estación
        horas: [], // Inicializa como un array para las horas seleccionadas
    });

    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');

    // Actualiza el string de hora cada vez que cambian los inputs
    useEffect(() => {
        const horaFormateada = hora.padStart(2, '0');
        const minutoFormateado = minuto.padStart(2, '0');
        setData('hora', `${horaFormateada}:${minutoFormateado}`);
    }, [hora, minuto]); // Dependencias para actualizar cuando cambian hora o minuto

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('estaciones.store'), {
            forceFormData: true,
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('horas', [...data.horas, value]); // Agrega la hora seleccionada
        } else {
            setData('horas', data.horas.filter(hora => hora !== value)); // Elimina la hora deseleccionada
        }
    };

    const message = window.sessionStorage.getItem('flashMessage');

    // Limpiar el mensaje de la sesión después de mostrarlo
    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Crear Estación" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea una nueva estación</h1>
                            <hr className="separadorFormulario"/>

                            {/* Campo para el nombre de la estación */}
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Nombre de la estación:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        placeholder="Nombre de la estación"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                    />
                                    {errors['nombre'] && <div>{errors['nombre']}</div>}
                                </div>
                            </div>

                            {/* Selección de horas */}
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Selecciona las horas:</label>
                                    <div className='filaUno'>
                                        {horarios.map((horario) => (
                                            <div key={horario.id}>
                                                <input
                                                    type="checkbox"
                                                    value={horario.id}
                                                    onChange={handleCheckboxChange}
                                                    checked={data.horas.includes(horario.id.toString())} // Asegúrate de que el valor sea un string
                                                />
                                                <label>{horario.hora}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors['horas'] && <div>{errors['horas']}</div>}
                                </div>
                            </div>

                            <button type="submit" disabled={processing} className='botonFormulario'>Crear estación</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
