import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import CheckoutModal from '@/Components/Componentes-ATP/CheckoutModal';
import { Head } from '@inertiajs/react';
import CustomCalendar from '@/Components/Componentes-ATP/CustomCalendar';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth, artistas, reservas }) => {
    const nombre = auth.user ? auth.user.nombre : '';
    const apellido = auth.user ? auth.user.apellidos : '';
    const correo = auth.user ? auth.user.email : '';
    const telefono = auth.user ? auth.user.telefono : '';

    const { data, setData, post, processing, errors } = useForm({
        cliente: {
            nombre: nombre,
            apellidos: apellido,
            telefono: telefono,
            email: correo,
        },
        artista_id: '',
        tatuaje: {
            ruta_imagen: null,
            precio: 0,
            tiempo: 0,
            tamano: '',
            relleno: '',
            color: '',
            zona: ''
        },
        fecha: '',
        hora_inicio: '',
        hora_fin: 'No hay ninguna hora marcada',
        duracion: 'No hay ninguna hora marcada'
    });

    const [tatuajeOptions, setTatuajeOptions] = useState({
        tamano: '',
        relleno: '',
        color: '',
        zona: ''
    });

    const [imagenPreview, setImagePreviewUrl] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [horasEstacion, setHorasEstacion] = useState([]);
    const [horariosCompleto, setHorarios] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handlePostReservation = () => {
        post(route('reservas.store'), {
            forceFormData: true,
            cliente: data.cliente,
            artista_id: data.artista_id,
            tatuaje: data.tatuaje,
            fecha: data.fecha,
            hora_inicio: data.hora_inicio,
            hora_fin: data.hora_fin,
            duracion: data.duracion,
            precio: data.tatuaje.precio,
        });
        handleCloseModal();
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     post(route('reservas.store'), {
    //         forceFormData: true,
    //     });
    // };

    useEffect(() => {
        calcularTiempoTatuaje();
    }, [tatuajeOptions.tamano, tatuajeOptions.color, tatuajeOptions.relleno, tatuajeOptions.zona]);

    useEffect(() => {
        if (data.fecha) {
            verificarDisponibilidad(data.fecha);
        }
    }, [data.hora_inicio, data.tatuaje.tiempo, data.fecha]);

    useEffect(() => {
        if (data.fecha) {
            fetchHorasDisponibles(data.fecha);
        }
    }, [data.fecha]);

    useEffect(() => {
        if (data.fecha) {
            fetchHorasPorEstacion(data.fecha);
        }
    }, [data.fecha]);

    useEffect(() => {
        fetchHorarios();
    }, []);

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
        let formateo = localDate.toISOString().split('T')[0];
        setData('fecha', formateo);
    };

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

        if (reservas != undefined) {
            if ((reservas.length % 8 === 0) && (reservas.length !== 0)) {
                precio *= 0.9;
            }
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

            // Este primer bloque coge la primera hora que hay sido reservada y la compara con la hora de inicio de la reserva y la hora final de la misma
            if ((minutosTotalesInicio <= horaReservaMinima) && (minutosTotalesFinTatuaje >= horaReservaMinima)) {
                setData(prevState => ({
                    ...prevState,
                    hora_fin: 'La reserva no es posible.',
                    duracion: 'La duración de la reserva es excesiva.'
                }));
            } else {
                // Este segundo bloque mira la hora final y la compara si es mayor a las 14:00 o a las 21:30 para que no pase el horario permitido
                if ((horaFinStringTatuaje > '14:00') || (horaFinStringTatuaje > '21:30')) {
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

    const fetchHorasDisponibles = (fecha) => {
        let horasDisponibles = [...horariosCompleto];

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
                console.log('duracion:', duracion);
                for (let tiempo = 0; tiempo <= duracion; tiempo++) {
                    let nuevaHora = `${hora.toString().padStart(2, '0')}:${minutos}`;
                    let index = horasDisponibles.indexOf(nuevaHora);
                    if (index !== -1) {
                        horasDisponibles.splice(index, 1);
                    }
                    hora += 1;
                    console.log('Nueva hora del for:' , nuevaHora);
                }
                let nuevaHora = `${hora.toString().padStart(2, '0')}:${minutos}`;
                console.log('Nueva hora fuera del for:' , nuevaHora);
                console.log('Horas disponibles:', horasDisponibles[0]);
                console.log('condicion del if:', horasDisponibles[0] > nuevaHora);
                if (horasDisponibles[0] > nuevaHora) {
                    let index = horasDisponibles.indexOf(horasDisponibles[0]);
                    horasDisponibles.splice(index, 1)
                }
            });
            setAvailableHours(horasDisponibles);
        });
    };

    const fetchHorasPorEstacion = async (fecha) => {
        const mes = new Date(fecha).getMonth();
        let estacion = '';

        if (mes >= 5 && mes <= 7) {
            estacion = 'Verano';
        } else if (mes >= 8 && mes <= 10) {
            estacion = 'Otoño';
        } else if (mes === 11 || mes === 0 || mes === 1) {
            estacion = 'Invierno';
        } else {
            estacion = 'Primavera';
        }

        try {
            const response = await axios.get('/api/horas-por-estacion', {
                params:{estacion: estacion},
            });

            if (response.data && response.data.horas) {
                setHorasEstacion(response.data.horas);
            } else {
                fetchTodasLasHoras();
            }
        } catch (error) {
            console.error("Error consiguiendo las horas por estación:", error.response ? error.response.data : error.message);
            fetchTodasLasHoras();
        }
    };

    const fetchTodasLasHoras = async () => {
        try {
            const response = await axios.get('/api/todas-las-horas');
            if (response.data && response.data.horas) {
                setHorasEstacion(response.data.horas);
            }
        } catch (error) {
            console.error("Error fetching all hours:", error);
        }
    };

    const fetchHorarios = async () => {
        try {
            const response = await axios.get('/api/todas-las-horas');
            if (response.data && response.data.horas) {
                setHorarios(response.data.horas);
            }
        } catch (error) {
            console.error("Error fetching all hours:", error);
        }
    };

    const message = window.sessionStorage.getItem('flashMessage');

    if (message) {
        window.sessionStorage.removeItem('flashMessage');
    }

    console.log(availableHours);

    return (
        <>
            <Head title="Reservas" />
            <Header user={auth.user} />
            <div className='main'>
                <MensajeFlash message={message} />
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
                            <h1 className="titulo">Reserva tu cita</h1>
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
                                    {artistas.map(artista => (
                                        <option key={artista.id} value={artista.id}>{artista.nombre}</option>
                                    ))}
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
                                <label>Imagen de referencia:</label>
                                <div className='divInputImagen'>
                                    <label className='inputImagen'>
                                        {!imagenPreview && (
                                        <span>Haz click aquí para subir una imagen</span>
                                        )}
                                        <input className='inputImagen' type="file" accept='image/*' name="ruta_imagen" onChange={handleFileChange} />
                                        {errors['tatuaje.ruta_imagen'] && <div>{errors['tatuaje.ruta_imagen']}</div>}
                                        {imagenPreview && (
                                            <div>
                                                <img src={imagenPreview} alt="Diseño del tatuaje" className='previewImagenFormulario' />
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
                                        <div className='w-full flex space-x-2'>
                                            {Array.isArray(horasEstacion) && horasEstacion.length > 0 ? (
                                                <>
                                                    {horasEstacion.sort().reduce((acc, hora, index) => {
                                                        // Agrupar las horas en subarreglos de 5
                                                        if (index % 4 === 0) acc.push([]); // Crear un nuevo grupo
                                                        acc[acc.length - 1].push(hora); // Agregar la hora al grupo actual
                                                        return acc;
                                                    }, []).map((group, groupIndex) => (
                                                        <div key={groupIndex} className='flex flex-col w-full'>
                                                            {group.map((hora, horaIndex) => (
                                                                <div key={horaIndex} className=''>
                                                                    <label className='opcion'>
                                                                        <input
                                                                            type="radio"
                                                                            name="hora_inicio"
                                                                            value={hora}
                                                                            checked={data.hora_inicio === hora}
                                                                            disabled={!availableHours.includes(hora)}
                                                                            onChange={handleChange}
                                                                            className=''
                                                                        />
                                                                        <span>{hora}</span>
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <div>No hay horas disponibles</div> // Mensaje si no hay horas
                                            )}
                                        </div>
                                        {errors.hora_inicio && <div>{errors.hora_inicio}</div>}
                                    </div>
                                    <div className='columnas'>
                                        <label>Precio de la señal:</label>
                                        <input className='inputSeñal' type="text" value={data.tatuaje.precio + '€'} readOnly />
                                    </div>
                                </div>
                                <div className='w-full flex flex-col space-x-0 2xl:flex-row 2xl:space-x-5'>
                                    <div className='columnas'>
                                        <label>Hora Fin:</label>
                                        <input className='inputFin' type="text" name="hora_fin" value={data.hora_fin} readOnly />
                                        {errors.hora_fin && <div>{errors.hora_fin}</div>}
                                    </div>
                                    <div className='columnas'>
                                        <label>Duracion estimada:</label>
                                        <input className='inputFin' type="text" name="duracion" value={data.duracion} readOnly />
                                        {errors.duracion && <div>{errors.duracion}</div>}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className='botonFormulario'>Reservar</button>
                            <CheckoutModal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                orderData={data}
                                amount={data.tatuaje.precio}
                                onConfirm={handlePostReservation}
                            />
                        </form>
                        <div className='w-full'>
                            <div className='contenedorContactos'>
                                <h1 className="titulo">Otras formas de contacto</h1>
                                <hr className="separadorFormulario"/>
                                <p>Si quieres un trato más personalizado con uno de nuestros profesionales, puedes escribirnos haciendo click en el siguiente enlace: </p>
                                <a href='https://wa.chatfuel.com/arttattoopmg' target='_blank' className='botonContacto'>Envianos un WhatsApp haciendo click aquí</a>
                            </div>
                            <div className='contenedorMapa'>
                                <h1 className="titulo">Donde nos encontramos</h1>
                                <hr className="separadorFormulario"/>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199.3470050739778!2d-6.066423831767834!3d36.924972570650986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0d939f67715b2f%3A0x2fe1b09f9b009cfc!2sArttattoo%20pmg!5e0!3m2!1ses!2ses!4v1716230894555!5m2!1ses!2ses"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className='w-full h-96 2xl:h-[43.8rem] 3xl:h-[45.8rem]'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='contenedorNormas'>
                        <div className='infoNormas'>
                            <h1 className='titulo'>Normas de la reserva</h1>
                            <hr className="separadorFormulario"/>
                            <ul className='listaNormas'>
                                <li>Se deberá dar una señal del 40% del valor del tatuaje a realizar.</li>
                                <li>El pago se puede hacer a traves de la página web o por Bizum al siguiente numero: 687 81 76 83</li>
                                <li>En caso de cancelacion de la cita, la señal se perderá.</li>
                                <li>La cita puede ser aplazada o modificada una sola vez siempre que se haya avisado con al menos 24 horas de antelación.</li>
                                <li>En caso de aplazarse o modificarse por segunda vez, se deberá dar una nueva señal.</li>
                                <li>Si no se recibe el pago de la señal, se procederá a no guardar la cita.</li>
                                <li>El plazo máximo para abonar la señal es hasta las 00:00 del mismo día que se pide la cita.</li>
                                <li>Nos encontramos en Avda. Cangas 79, para entrar llamas a la puerta y esperar a ser atendido.</li>
                                <li>No puedes venir con un acompañante.</li>
                                <li>En caso de ser menor de edad, debes venir acompañado de uno de tus padres o tutor legal para firmar el consentimiento.</li>
                                <li>Si eres menor y no te acompaña ninguno de tus padres o tutor legal, no se realizara el tatuaje y se perderá tanto la señal como la cita.</li>
                                <li>No se permiten niños.</li>
                                <li>Se ruega puntualidad. Si el retraso es mayor a 20 minutos, la cita se cancela y se pierde la señal.</li>
                                <li>Se cobra antes de la realización del tatuaje.</li>
                                <li>El pago se hará unica y exclusivamente en efectivo.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Create;
