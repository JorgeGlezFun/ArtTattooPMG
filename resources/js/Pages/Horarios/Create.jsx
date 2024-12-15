import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        estacion: '',
        horas: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

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

    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');

    const anadirHoras = () => {
        if (hora && minuto) {
            const horaFormateada = hora.padStart(2, '0');
            const minutoFormateado = minuto.padStart(2, '0');

            const nuevaHora = `${horaFormateada}:${minutoFormateado}`;
            setData('horas', [...data.horas, nuevaHora]);
            setHora('');
            setMinuto('');
        }
    };

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
                                <div className='columnaNombre'>
                                    <label>Estación:</label>
                                    <input className='inputs' type="text" name="estacion" value={data.estacion} onChange={handleChange} />
                                    {errors['estacion'] && <div>{errors['estacion']}</div>}
                                </div>
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
                                        <button type="button" onClick={anadirHoras} className='botonFormulario'>Añadir horas</button>
                                    </div>
                                    <p>Horas añadidas: {data.horas.join(', ')}</p>
                                    {errors['horas'] && <div>{errors['horas']}</div>}
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
