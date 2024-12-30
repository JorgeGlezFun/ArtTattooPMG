import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import CustomCalendar from '@/Components/Componentes-ATP/CustomCalendar';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, descanso }) => {
    const { data, setData, put, processing, errors } = useForm({
        fecha: descanso.fecha,
    });

    console.log(data.fecha);

    useEffect(() => {
        setData('fecha', descanso.fecha);
    }, [descanso]);

    const handleCalendarChange = (newDate) => {
        const date = new Date(newDate);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        let formateo = localDate.toISOString().split('T')[0];
        setData('fecha', formateo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('fecha', data.fecha);
        try {
            await put(route('descansos.update', descanso.id), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    forceFormData: true,
                }
            });
            console.log('Descanso actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el descanso:', error.response ? error.response.data : error.message);
        }
    };


    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Editar Descanso" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Edita el descanso</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaDos'>
                                <div className='columnaApellido'>
                                    <CustomCalendar name={'Fecha'} value={data.fecha} onChange={handleCalendarChange}/>
                                    {errors['fecha'] && <div>{errors['fecha']}</div>}
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar descanso</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
