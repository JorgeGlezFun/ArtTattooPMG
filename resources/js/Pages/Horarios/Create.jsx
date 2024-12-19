import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        hora: '', // Inicializa como un string vacío
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
        post(route('horarios.store'), {
            forceFormData: true,
        });
    };

    const message = window.sessionStorage.getItem('flashMessage');

    // Limpiar el mensaje de la sesión después de mostrarlo
    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Reservas" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea el horario</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <label>Horas:</label>
                                    <div className='filaUno'>
                                        <input
                                            className='inputs'
                                            type="number"
                                            min='9'
                                            max='22'
                                            placeholder="Horas"
                                            value={hora}
                                            onChange={(e) => setHora(e.target.value)}
                                        />
                                        <input
                                            className='inputs'
                                            type="number"
                                            min='0'
                                            max='55'
                                            step={5}
                                            placeholder="Minutos"
                                            value={minuto}
                                            onChange={(e) => setMinuto(e.target.value)}
                                        />
                                    </div>
                                    {errors['hora'] && <div>{errors['hora']}</div>}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Crear horario</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
