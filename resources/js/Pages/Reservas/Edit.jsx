import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import { Head } from '@inertiajs/react';
import CustomCalendar from '@/Components/Componentes-ATP/CustomCalendar';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Edit = ({ auth, artistas, reserva, cliente, tatuaje }) => {
    const { data, setData, put, processing, errors } = useForm({
        cliente: {
            nombre: cliente.nombre,
            apellidos: cliente.apellidos,
            telefono: cliente.telefono,
            email: cliente.email,
        },
        artista_id: reserva.artista_id,
        tatuaje: {
            ruta_imagen: tatuaje.ruta_imagen,
            precio: tatuaje.precio,
            tiempo: tatuaje.tiempo,
            tamano: tatuaje.tamano,
            relleno: tatuaje.relleno,
            color: tatuaje.color,
            zona: tatuaje.zona
        },
        fecha: reserva.fecha,
        hora_inicio: reserva.hora_inicio,
        hora_fin: reserva.hora_fin,
        duracion: reserva.duracion
    });
    console.log(data);
    const [tatuajeOptions, setTatuajeOptions] = useState({
        tamano: reserva.tatuaje.tamano,
        relleno: reserva.tatuaje.relleno,
        color: reserva.tatuaje.color,
        zona: reserva.tatuaje.zona
    });

    const [imagenPreview, setImagePreviewUrl] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);

    useEffect(() => {
        calcularTiempoTatuaje();
    }, [tatuajeOptions.tamano, tatuajeOptions.color, tatuajeOptions.relleno, tatuajeOptions.zona]);

    useEffect(() => {
        if (data.fecha) {
            verificarDisponibilidad(data.fecha);
        }
    }, [data.hora_inicio, data.tatuaje.tiempo, data.fecha]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [parent, key] = name.split('.');
        if (key) {
            setData(parent, { ...data[parent], [key]: value });
        } else {
            setData(name, value);
        }
    };

    const handleCalendarChange = (newDate) => {
        const date = new Date(newDate);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        let p = localDate.toISOString().split('T')[0];
        setData('fecha', p);
    };

    useEffect(() => {
        if (data.fecha) {
            fetchHorasDisponibles(data.fecha);
        }
    }, [data.fecha]);

    const handleTatuajeOptionsChange = (e) => {
        const { name, value } = e.target;
        setTatuajeOptions({ ...tatuajeOptions, [name]: value });
        calcularPrecioTatuaje({ ...tatuajeOptions, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setData('tatuaje', { ...data.tatuaje, ruta_imagen: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('reservas.update', reserva.id), {
            forceFormData: true,
        });
    };

    const calcularPrecioTatuaje = (options) => {
        let precio = 0;

        switch (options.tamano) {
            case 'Grande':
                precio += 50;
                break;
            case 'Mediano':
                precio += 30;
                break;
            case 'Pequeño':
                precio += 15;
                break;
            default:
                break;
        }

        setData('tatuaje', { ...data.tatuaje, precio });
    };

    const calcularTiempoTatuaje = () => {
        let tiempo = 0;

        switch (tatuajeOptions.tamano) {
            case 'Grande':
                tiempo += 180; // 3 horas en minutos
                break;
            case 'Mediano':
                tiempo += 90; // 1.5 horas en minutos
                break;
            case 'Pequeño':
                tiempo += 30; // 0.5 horas en minutos
                break;
            default:
                break;
        }

        if (tatuajeOptions.color === 'A color') {
            tiempo += 30;
        }

        if (tatuajeOptions.relleno === 'Con relleno') {
            tiempo += 30;
        }

        setData('tatuaje', {
            ...data.tatuaje, tiempo,
            tamano: tatuajeOptions.tamano,
            relleno: tatuajeOptions.relleno,
            color: tatuajeOptions.color,
            zona: tatuajeOptions.zona
        });
    };

    const verificarDisponibilidad = (fecha) => {
        if (!data.hora_inicio || !data.tatuaje.tiempo) {
            return;
        }

        axios.get('/api/ultima-hora-fin', {
            params: { fecha: fecha },
        })
        .then(response => {
            const reservas = response.data;
            let minutosTotales = [];

            const horaFinTatuaje = new Date();

            reservas.forEach(reserva => {
                const primeraHora = reserva.hora_inicio.split(':').map(Number);
                const primeraHoraMinutos = primeraHora[0] * 60 + primeraHora[1];
                minutosTotales.push(primeraHoraMinutos);
            });

            const [horas, minutos] = data.hora_inicio.split(':').map(Number);
            const minutosTotalesInicio = horas * 60 + minutos;

            const minutosTotalesFinTatuaje = horas * 60 + minutos + data.tatuaje.tiempo;
            horaFinTatuaje.setHours(0, minutosTotalesFinTatuaje, 0, 0);
            const duracionTatuaje = Math.ceil(data.tatuaje.tiempo / 60);
            const horaFinStringTatuaje = horaFinTatuaje.toTimeString().slice(0, 5);

            let horaReservaMinima = minutosTotales.length === 0 ? 0 : Math.min(...minutosTotales);

            if ((minutosTotalesInicio <= horaReservaMinima) && (minutosTotalesFinTatuaje >= horaReservaMinima)) {
                setData(prevState => ({
                    ...prevState,
                    hora_fin: 'La reserva no es posible.',
                    duracion: 'La duración de la reserva es excesiva.'
                }));
            } else {
                if ((['11:30', '12:30', '13:30'].includes(data.hora_inicio) && horaFinStringTatuaje > '14:30') || horaFinStringTatuaje > '21:30') {
                    setData(prevState => ({
                        ...prevState,
                        hora_fin: 'La hora final supera al horario permitido.',
                        duracion: 'La duración de la reserva es excesiva.'
                    }));
                } else {
                    setData(prevState => ({
                        ...prevState,
                        hora_fin: horaFinStringTatuaje,
                        duracion: duracionTatuaje
                    }));
                }
            }
        });
    };

    function fetchHorasDisponibles(fecha) {
        let horas = ['11:30', '12:30', '13:30', '18:00', '19:00', '20:00'];
        let horasDisponibles = [...horas];

        axios.get('/api/ultima-hora-fin', {
            params: { fecha: fecha },
        })
        .then(response => {
            const reservas = response.data;

            reservas.forEach(reserva => {
                const inicio = reserva.hora_inicio;
                const duracion = reserva.duracion;

                let horaInicio = inicio.split(":");
                let hora = parseInt(horaInicio[0]);
                let minutos = horaInicio[1];

                for (let tiempo = 0; tiempo <= duracion; tiempo++) {
                    let nuevaHora = `${hora}:${minutos}`;
                    let index = horasDisponibles.indexOf(nuevaHora);
                    if (index !== -1) {
                        horasDisponibles.splice(index, 1);
                    }
                    hora += 1;
                }
            });

            setAvailableHours(horasDisponibles);
        });
    };

    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    return (
        <>
            <Head title="Editar Reserva" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Editar tu cita</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaUno'>
                                <div className='columnaNombre'>
                                    <label>Nombre:</label>
                                    <input className='inputs' type="text" name="cliente.nombre" value={data.cliente.nombre} onChange={handleChange} />
                                    {errors['cliente.nombre'] && <div>{errors['cliente.nombre']}</div>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Apellidos:</label>
                                    <input className='inputs' type="text" name="cliente.apellidos" value={data.cliente.apellidos} onChange={handleChange} />
                                    {errors['cliente.apellidos'] && <div>{errors['cliente.apellidos']}</div>}
                                </div>
                            </div>
                            <div className='columnas'>
                                <label>Teléfono:</label>
                                <input className='inputs' type="text" name="cliente.telefono" value={data.cliente.telefono} onChange={handleChange} />
                                {errors['cliente.telefono'] && <div>{errors['cliente.telefono']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Email:</label>
                                <input className='inputs' type="email" name="cliente.email" value={data.cliente.email} onChange={handleChange} />
                                {errors['cliente.email'] && <div>{errors['cliente.email']}</div>}
                            </div>
                            <div className='columnas'>
                                <label>Artista:</label>
                                <select className='listaTatuajes' name="artista_id" value={data.artista_id} onChange={handleChange}>
                                    <option value="">Seleccionar artista</option>
                                    {/* {artistas.map(artista => (
                                        <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                    ))} */}
                                    {artistas && artistas.length > 1 ? (
                                        artistas.map(artista => (
                                            <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                        ))
                                    ) : (
                                        <option value={artistas.id}>{artistas.nombre}</option>
                                    )}
                                </select>
                                {errors.artista_id && <div>{errors.artista_id}</div>}
                            </div>
                            <div className='filaDos'>
                                <div className='columnaTatuaje'>
                                    <div className='divTatuajes'>
                                        <label>Tamaño:</label>
                                        <select className='listaTatuajes' name="tamano" value={tatuajeOptions.tamano} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar tamaño</option>
                                            <option value="Grande">Grande</option>
                                            <option value="Mediano">Mediano</option>
                                            <option value="Pequeño">Pequeño</option>
                                        </select>
                                    </div>
                                    <div className='divTatuajes'>
                                        <label>Relleno:</label>
                                        <select className='listaTatuajes' name="relleno" value={tatuajeOptions.relleno} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar relleno</option>
                                            <option value="Con relleno">Con relleno</option>
                                            <option value="Sin relleno">Sin relleno</option>
                                        </select>
                                    </div>
                                    <div className='divTatuajes'>
                                        <label>Color:</label>
                                        <select className='listaTatuajes' name="color" value={tatuajeOptions.color} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar color</option>
                                            <option value="A color">A color</option>
                                            <option value="Blanco y negro">Blanco y negro</option>
                                        </select>
                                    </div>
                                    <div className='divTatuajes'>
                                        <label>Zona del cuerpo:</label>
                                        <select className='listaTatuajes' name="zona" value={tatuajeOptions.zona} onChange={handleTatuajeOptionsChange}>
                                            <option value="">Seleccionar zona</option>
                                            <option value="Brazo">Brazo</option>
                                            <option value="Pierna">Pierna</option>
                                            <option value="Espalda">Espalda</option>
                                            <option value="Costillas">Costillas</option>
                                            <option value="Pecho">Pecho</option>
                                            <option value="Barriga">Barriga</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='columnas'>
                                <label> Imagen de referencia:</label>
                                <div className='divInputImagen'>
                                    <label className='inputImagen'>
                                        {!imagenPreview && (
                                        <span>Haz click aquí para subir una imagen</span>
                                        )}
                                        <input className='inputImagen' type="file" accept='image/*' name="ruta_imagen" onChange={handleFileChange} />
                                        {errors['tatuaje.ruta_imagen'] && <div>{errors['tatuaje.ruta_imagen']}</div>}
                                        {imagenPreview && (
                                            <div>
                                                <img src={imagenPreview} alt="Diseño del tatuaje" className='previewImagen' />
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className='w-full flex flex-col xl:space-x-0'>
                                <div className='w-full flex flex-col space-x-0 2xl:flex-row 2xl:space-x-5'>
                                    <div className='columnas'>
                                        <CustomCalendar name={'Fecha'} value={data.fecha} onChange={handleCalendarChange} />
                                    </div>
                                    <div className='columnas'>
                                        <label>Hora Inicio:</label>
                                        <div className='w-full flex flex-row space-x-2'>
                                            <div className='w-full'>
                                                <div>
                                                    <label className="opcion">
                                                        <input
                                                            id="hora0"
                                                            type="radio"
                                                            name="hora_inicio"
                                                            value="11:30"
                                                            checked={data.hora_inicio === '11:30'}
                                                            onChange={handleChange}
                                                            disabled={availableHours.includes('11:30') ? false : true}
                                                        />
                                                        <span>11:30</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="opcion">
                                                        <input
                                                            id="hora1"
                                                            type="radio"
                                                            name="hora_inicio"
                                                            value="12:30"
                                                            checked={data.hora_inicio === '12:30'}
                                                            onChange={handleChange}
                                                            disabled={availableHours.includes('12:30') ? false : true}
                                                        />
                                                        <span>12:30</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="opcion">
                                                        <input
                                                            id="hora2"
                                                            type="radio"
                                                            name="hora_inicio"
                                                            value="13:30"
                                                            checked={data.hora_inicio === '13:30'}
                                                            onChange={handleChange}
                                                            disabled={availableHours.includes('13:30') ? false : true}
                                                        />
                                                        <span>13:30</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='w-full'>
                                                <div>
                                                    <label className="opcion">
                                                        <input
                                                            id="hora3"
                                                            type="radio"
                                                            name="hora_inicio"
                                                            value="18:00"
                                                            checked={data.hora_inicio === '18:00'}
                                                            onChange={handleChange}
                                                            disabled={availableHours.includes('18:00') ? false : true}
                                                        />
                                                        <span>18:00</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="opcion">
                                                        <input
                                                            id="hora4"
                                                            type="radio"
                                                            name="hora_inicio"
                                                            value="19:00"
                                                            checked={data.hora_inicio === '19:00'}
                                                            onChange={handleChange}
                                                            disabled={availableHours.includes('19:00') ? false : true}
                                                        />
                                                        <span>19:00</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="opcion">
                                                        <input
                                                            id="hora5"
                                                            type="radio"
                                                            name="hora_inicio"
                                                            value="20:00"
                                                            checked={data.hora_inicio === '20:00'}
                                                            onChange={handleChange}
                                                            disabled={availableHours.includes('20:00') ? false : true}
                                                        />
                                                        <span>20:00</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.hora_inicio && <div>{errors.hora_inicio}</div>}
                                    </div>
                                    <div className='columnas'>
                                        <label>Precio de la señal:</label>
                                        <input className='inputSeñal' type="text" value={data.tatuaje.precio + '€'} readOnly />
                                    </div>
                                </div>
                                <div className='w-full flex flex-col space-x-0 2xl:flex-row 2xl:space-x-5'>
                                    <div className=' columnas'>
                                        <label>Hora Fin:</label>
                                        <input className='inputFin' type="text" name="hora_fin" value={data.hora_fin} readOnly />
                                        {errors.hora_fin && <div>{errors.hora_fin}</div>}
                                    </div>
                                    <div className='columnas'>
                                        <label>Duración estimada:</label>
                                        <input className='inputFin' type="text" name="duracion" value={data.duracion} readOnly />
                                        {errors.duracion && <div>{errors.duracion}</div>}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Actualizar Reserva</button>
                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Edit;
