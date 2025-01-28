import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import CheckoutModal from '@/Components/Componentes-ATP/CheckoutModal';
import { Head } from '@inertiajs/react';
import CustomCalendar from '@/Components/Componentes-ATP/CustomCalendar';
import MensajeFlash from '@/Components/Componentes-ATP/MensajeFlash';

const Create = ({ auth, artistas, tipos }) => {
    const nombre = auth.user ? auth.user.nombre : '';
    const apellido = auth.user ? auth.user.apellidos : '';
    const correo = auth.user ? auth.user.email : '';
    const telefono = auth.user ? auth.user.telefono : '';
    const saldo = auth.user ? auth.user.saldo : '';
    const idUsuario = auth.user ? auth.user.id : '';

    console.log('id Usuario:', idUsuario);

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
            caracteristicas: [],
        },
        fecha: '',
        hora_inicio: '',
        hora_fin: 'No hay ninguna hora marcada',
        duracion: 'No hay ninguna hora marcada',
        estado: 'Activa',
    });

    const [imagenPreview, setImagePreviewUrl] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [horasEstacion, setHorasEstacion] = useState([]);
    const [horariosCompleto, setHorarios] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [userSaldo, setUserSaldo] = useState(saldo);
    console.log('Sal2:', userSaldo)

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
        estado: data.estado
    });
        handleCloseModal();
    };

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
        if (data.tatuaje.caracteristicas.length > 0) {
            fetchCaracteristicas(data.tatuaje.caracteristicas);
        }
    }, [data.tatuaje.caracteristicas]);

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

    const [caracteristicasRepetidas, setCaracteristicasRepetidas] = useState([]);

    const handleCaracteristicaChange = async (tipoId, caracteristicaId) => {
        setData(prevData => {
            // Copiar el array de las características del tatuaje
            let caracteristicasOld = [...prevData.tatuaje.caracteristicas];
            let nuevasCaracteristicasRepetidas = [...caracteristicasRepetidas];
            let prueba = data.tatuaje.caracteristicas.includes(caracteristicaId)
            // Recorrer las características repetidas
            const longCaracteristicasRepetidas = nuevasCaracteristicasRepetidas.length;

            if (longCaracteristicasRepetidas === 0) {
                nuevasCaracteristicasRepetidas.push([tipoId, caracteristicaId]);
                caracteristicasOld.push(caracteristicaId);
            }

            for (let i = 0; i < longCaracteristicasRepetidas; i++) {
                if (
                    // Si encontramos una característica con el mismo tipo y caracteristicaId
                    (nuevasCaracteristicasRepetidas[i][0] === tipoId && nuevasCaracteristicasRepetidas[i][1] === caracteristicaId)
                    || // Si encontramos el tipoId pero con una caracteristicaId diferente
                    (nuevasCaracteristicasRepetidas[i][0] === tipoId && nuevasCaracteristicasRepetidas[i][1] !== caracteristicaId)
                ) {
                    // Creamos un nuevo array con las caracteristicas filtradas (que no sean iguales a las antiguas)
                    let filtroCaracteristica = caracteristicasOld.filter(caracteristica => caracteristica !== nuevasCaracteristicasRepetidas[i][1]);
                    // Cambiamos el array antiguo por el array filtrado
                    caracteristicasOld = filtroCaracteristica;
                    // Añadimos la nueva característica al array antiguo
                    caracteristicasOld.push(caracteristicaId);
                    // Sustituimos la caracteristica antigua por la nueva en el array que nos sirve para identificar las características con tipo repetido
                    nuevasCaracteristicasRepetidas[i][1] = caracteristicaId;
                    break;
                } else {
                    // Si no existe la característica, la añadimos a 'nuevasCaracteristicasRepetidas'
                    if (!nuevasCaracteristicasRepetidas.some(([idTipo]) => idTipo === tipoId)) {
                        nuevasCaracteristicasRepetidas.push([tipoId, caracteristicaId]);
                        caracteristicasOld.push(caracteristicaId);
                    }
                }
            }
            // Actualizar el estado con las características actualizadas
            setCaracteristicasRepetidas(nuevasCaracteristicasRepetidas);
            // Devolver el nuevo estado para actualizar 'tatuaje.caracteristicas'
            return {
                ...prevData,
                tatuaje: {
                    ...prevData.tatuaje,
                    caracteristicas: [...caracteristicasOld], // Crear una nueva referencia del array
                }
            };
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
                if (reserva.estado.toLowerCase() !== 'activa') {
                    return;
                }
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
                if ((horaFinStringTatuaje > '14:00') && (horaFinStringTatuaje < '18:30')) {
                    setData(prevState => ({
                        ...prevState,
                        hora_fin: 'La hora final supera al horario permitido.',
                        duracion: 'La duración de la reserva es excesiva. 2'
                    }));
                }
                else {
                    if (((horaFinStringTatuaje > '14:00') && (horaFinStringTatuaje < '18:30'))) {
                        console.log(((horaFinStringTatuaje > '14:00') && (horaFinStringTatuaje > '18:30')))
                        setData(prevState => ({
                            ...prevState,
                            hora_fin: 'La hora final supera al horario permitido.',
                            duracion: 'La duración de la reserva es excesiva. 2'
                        }));
                    } else {
                        setData(prevState => ({
                            ...prevState,
                            hora_fin: horaFinStringTatuaje,
                            duracion: duracionTatuaje
                        }));
                    }
                }
            }
        });
    };

    const fetchCaracteristicas = async (caracteristicas) => {
        try {
            const response = await axios.get('/api/todas-las-caracteristicas');
            const caracteristicasDB = response.data;
            let precioTotal = 0;
            let tiempoTotal = 0;

            caracteristicas.forEach(caracteristica => {
                for (let i = 0; i < caracteristicasDB.length; i++) {
                    if (caracteristicasDB[i]['id'] === parseInt(caracteristica)) {
                        precioTotal += caracteristicasDB[i]['precio'];
                        tiempoTotal += parseFloat(caracteristicasDB[i]['tiempo'] * 60);
                    }
                }
            });

            setData(prevData => ({
                ...prevData,
                tatuaje: {
                    ...prevData.tatuaje,
                    precio: precioTotal,
                    tiempo: tiempoTotal
                }
            }
            ));
        } catch (error) {
            console.error("Error fetching características:", error);
        }
    };

    const fetchHorasDisponibles = (fecha) => {
        let horasDisponibles = [...horariosCompleto];

        axios.get('/api/ultima-hora-fin', {
            params: { fecha: fecha },
        })
        .then(response => {
            const reservas = response.data;

            reservas.forEach(reserva => {
                if (reserva.estado.toLowerCase() === 'activa') {
                    const inicio = reserva.hora_inicio;
                    const duracion = reserva.duracion;

                    let horaInicio = inicio.split(":");
                    let hora = parseInt(horaInicio[0]);
                    let minutos = horaInicio[1];

                    for (let tiempo = 0; tiempo <= duracion; tiempo++) {
                        let nuevaHora = `${hora.toString().padStart(2, '0')}:${minutos}`;
                        let index = horasDisponibles.indexOf(nuevaHora);
                        if (index !== -1) {
                            horasDisponibles.splice(index, 1);
                        }
                        hora += 1;
                    }
                    let nuevaHora = `${hora.toString().padStart(2, '0')}:${minutos}`;
                    if (horasDisponibles[0] > nuevaHora) {
                        let index = horasDisponibles.indexOf(horasDisponibles[0]);
                        horasDisponibles.splice(index, 1)
                    }
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

    return (
        <>
            <Head title="Reservas" />
            <Header user={auth.user} />
            <div className='main'>
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
                                    {tipos.map(tipo => (
                                        <div className='divTatuajes' key={tipo.id}>
                                            <label>{tipo.nombre}:</label>
                                            <select
                                                className='listaTatuajes'
                                                onChange={(e) => handleCaracteristicaChange(tipo.id, e.target.value)}
                                            >
                                                <option value="">Seleccionar {tipo.nombre.toLowerCase()}</option>
                                                {tipo.caracteristicas.map(caracteristica => (
                                                    <option
                                                        key={caracteristica.id}
                                                        value={caracteristica.id}
                                                    >
                                                        {caracteristica.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
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
                                                        if (index % 4 === 0) acc.push([]);
                                                        acc[acc.length - 1].push(hora);
                                                        return acc;
                                                    }, []).map((group, groupIndex) => (
                                                        <div key={groupIndex} className='flex flex-col w-full'>
                                                            {group.map((hora, horaIndex) => (
                                                                <div key={horaIndex} className='w-full'>
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
                                                <div>No hay horas disponibles</div>
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
                                onConfirm={handlePostReservation}
                                userSaldo={userSaldo} // Saldo actual del usuario
                                setUserSaldo={setUserSaldo} // Actualiza el saldo localmente
                                usuarioId={idUsuario} // ID del usuario
                            />

                        </form>
                        <div className='xl:w-[50rem] w-full'>
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
