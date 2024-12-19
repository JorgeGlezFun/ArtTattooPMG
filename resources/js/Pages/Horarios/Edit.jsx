import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, horario }) => { // Recibe 'horario' como prop
    const { data, setData, put, processing, errors } = useForm({
        hora: horario.hora || '', // Inicializa con la hora existente
    });

    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');

    // Cargar la hora y los minutos desde el horario existente
    useEffect(() => {
        if (horario.hora) {
            const [h, m] = horario.hora.split(':');
            setHora(h);
            setMinuto(m);
        }
    }, [horario]);

    // Actualiza el string de hora cada vez que cambian los inputs
    useEffect(() => {
        const horaFormateada = hora.padStart(2, '0');
        const minutoFormateado = minuto.padStart(2, '0');
        setData('hora', `${horaFormateada}:${minutoFormateado}`);
    }, [hora, minuto]); // Dependencias para actualizar cuando cambian hora o minuto

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('horas', data.horas);
        try {
            await put(route('horarios.update', horario.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    forceFormData: true,
                }
            });
            console.log('Horario actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el horario:', error.response ? error.response.data : error.message);
        }
    };

    const message = window.sessionStorage.getItem('flashMessage');

    // Limpiar el mensaje de la sesión después de mostrarlo
    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Editar Horario" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Editar horario</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Horas:</label>
                                    <div className='filaUno'>
                                        <input
                                            className='inputs'
                                            type="number"
                                            min='0'
                                            max='23'
                                            placeholder="Horas"
                                            value={hora}
                                            onChange={(e) => setHora(e.target.value)}
                                        />
                                        <input
                                            className='inputs'
                                            type="number"
                                            min='0'
                                            max='59'
                                            step={5}
                                            placeholder="Minutos"
                                            value={minuto}
                                            onChange={(e) => setMinuto(e.target.value)}
                                        />
                                    </div>
                                    {errors['hora'] && <div>{errors['hora']}</div>}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar horario</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
