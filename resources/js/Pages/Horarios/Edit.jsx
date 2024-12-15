import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/HeaderAdmin';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, horario }) => {
    const { data, setData, put, processing, errors } = useForm({
        estacion: horario.estacion || '',
        horas: Array.isArray(horario.horas) ? horario.horas.map(h => ({ hora: h.split(':')[0], minuto: h.split(':')[1] })) : [],
    });

    const handleChange = (index, field, value) => {
        const updatedHoras = [...data.horas];
        updatedHoras[index][field] = value;
        setData('horas', updatedHoras);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('estacion', data.estacion);
        formData.append('horas', data.horas);
        // Agregar horas al FormData
        // data.horas.forEach((horaObj, index) => {
        //     formData.append(`horas[${index}][hora]`, horaObj.hora);
        //     formData.append(`horas[${index}][minuto]`, horaObj.minuto);
        // });

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
    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');

    const anadirHoras = () => {
        if (hora && minuto) {
            // Asegurarse de que hora y minuto tengan dos dígitos
            const horaFormateada = hora.padStart(2, '0');
            const minutoFormateado = minuto.padStart(2, '0');

            const nuevaHora = `${horaFormateada}:${minutoFormateado}`;
            setData('horas', [...data.horas, nuevaHora]);
            setHora(''); // Limpiar el input de horas
            setMinuto(''); // Limpiar el input de minutos
        }
    };

    return (
        <>
            <Head title="Editar Horario" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className=' formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita el horario</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaNombre'>
                                    <label>Estación:</label>
                                    <input
                                        className='inputs'
                                        type="text"
                                        name="estacion"
                                        value={data.estacion}
                                        onChange={(e) => setData('estacion', e.target.value)}
                                    />
                                    {errors.estacion && <div className="error">{errors.estacion}</div>}
                                </div>
                                {/* <div className='columnaApellido'>
                                    <label>Horas:</label>
                                    {Array.isArray(horario.horas) && horario.horas.length > 0 ? (
                                        <ul>
                                            {horario.horas.map((hora, index) => {
                                                const [horaValue, minutoValue] = hora.split(':');
                                                return (
                                                    <li key={index}>
                                                        <input
                                                            className='inputs'
                                                            type="number"
                                                            min='0'
                                                            max='23'
                                                            placeholder="Horas"
                                                            value={data.horas[index]?.hora || horaValue}
                                                            onChange={(e) => handleChange(index, e.target.value)}
                                                        />
                                                        <input
                                                            className='inputs'
                                                            type="number"
                                                            min='0'
                                                            max='59'
                                                            placeholder="Minutos"
                                                            value={data.horas[index]?.minuto || minutoValue}
                                                            onChange={(e) => handleChange(index, e.target.value)}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : <p>No hay horas disponibles</p>}
                                    {errors.horas && <div className="error">{errors.horas}</div>}
                                </div> */}
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
