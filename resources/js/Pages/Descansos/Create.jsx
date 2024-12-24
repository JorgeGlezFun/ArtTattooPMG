import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import CustomCalendar from '@/Components/Componentes-ATP/CustomCalendar';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        fecha: '',
    });

    console.log(data.fecha);

    const handleCalendarChange = (newDate) => {
        const date = new Date(newDate);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        let formateo = localDate.toISOString().split('T')[0];
        setData('fecha', formateo);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('descansos.store'), {
            forceFormData: true,
        });
    };

    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Descansos" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Crea el descanso</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <CustomCalendar name={'Fecha'} value={data.fecha} onChange={handleCalendarChange}/>
                                    {errors['fecha'] && <div>{errors['fecha']}</div>}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Crear descanso</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
