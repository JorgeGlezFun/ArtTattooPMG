import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import DragandDrop from '@/Components/Componentes-ATP/DragandDrop';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Reservar({ auth, clientes, artistas, horasDisponibles }) {
    const nombre = auth.user ? auth.user.nombre : '';
    const apellido = auth.user ? auth.user.email : '';
    const correo = auth.user ? auth.user.email : '';
    const telefono = auth.user ? auth.user.email : '';

    const { data, setData, post, processing, errors } = useForm({
        cliente_id: '',
        artista_id: '',
        tatuaje_id: '',
        piercing_id: '',
        fecha: '',
        hora: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservas.store'));
    };

    return (
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <form onSubmit={handleSubmit} className='formulario'>
                            <h1 className="titulo">Reserva tu cita</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaUno'>
                                <div className='columnaNombre'>
                                    <label htmlFor="nombre">Nombre: </label>
                                    <input type="text" name="nombre" id="nombre" value={nombre} className='inputs' onChange={handleChange} />
                                    <input type="text" />
                                </div>
                                <div className='columnaApellido'>
                                    <label htmlFor="apellido">Apellidos: </label>
                                    <input type="text" name="apellido" id="apellido" value={apellido} className='inputs' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='columnas'>
                                <label htmlFor="correo">Correo electrónico: </label>
                                <input type="email" name="correo" id="correo" value={correo} className='inputs' onChange={handleChange} />
                            </div>
                            <div className='columnas'>
                                <label htmlFor="telefono">Teléfono: </label>
                                <input type="tel" name="telefono" id="telefono" value={telefono} className='inputs' onChange={handleChange} />
                            </div>
                            <div className='filaDos'>
                                <div className='columnaRadio'>
                                    <label htmlFor="tipo_reserva">Tipo de reserva: </label>
                                    <div className='opcionesRadio'>
                                        <div className='w-full'>
                                            <input type="radio" name="tipo_reserva" id="tatuaje" value="tatuaje" className='hidden' onChange={() => setTipoReserva('tatuaje')} />
                                            <label htmlFor="tatuaje" className='opciones'> Tatuaje </label>
                                        </div>
                                        <div className='w-full'>
                                            <input type="radio" name="tipo_reserva" id="piercing" value="piercing" className='hidden' onChange={() => setTipoReserva('piercing')} />
                                            <label htmlFor="piercing" className='opciones'> Piercing </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='columnaTipodeReserva'>
                                    {tipoReserva === 'tatuaje' && (
                                        <div className='w-full'>
                                            <div className='columnaTatuaje'>
                                                <div className='divTatuajes'>
                                                    <label htmlFor="tamano">Tamaño del tatuaje: </label>
                                                    <select name="tamano" id="tamano" className='listaTatuajes' value={tamano} onChange={e => setTamano(e.target.value)}>
                                                        <option value="Pequeño">Pequeño</option>
                                                        <option value="Mediano">Mediano</option>
                                                        <option value="Grande">Grande</option>
                                                    </select>
                                                </div>
                                                <div className='divTatuajes'>
                                                    <label htmlFor="color">Color del tatuaje: </label>
                                                    <select name="color" id="color" className='listaTatuajes' value={color} onChange={e => setColor(e.target.value)}>
                                                        <option value="Tinta negra">Tinta negra</option>
                                                        <option value="A color">A color</option>
                                                    </select>
                                                </div>
                                                <div className='divTatuajes'>
                                                    <label htmlFor="tipo">Tipo de tatuaje: </label>
                                                    <select name="tipo" id="tipo" className='listaTatuajes' value={tipo} onChange={e => setTipo(e.target.value)}>
                                                        <option value="Sin relleno">Sin relleno</option>
                                                        <option value="Con relleno">Con relleno</option>
                                                    </select>
                                                </div>
                                                <div className='divTatuajes'>
                                                    <label htmlFor="zona">Zona del tatuaje: </label>
                                                    <select name="zona" id="zona" className='listaTatuajes' value={zona} onChange={e => setZona(e.target.value)}>
                                                        <option value="Brazo">Brazo</option>
                                                        <option value="Antebrazo">Antebrazo</option>
                                                        <option value="Espalda">Espalda</option>
                                                        <option value="Gemelo">Gemelo</option>
                                                        <option value="Muslo">Muslo</option>
                                                        <option value="Cadera">Cadera</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='columnaDragandDrop'>
                                                <label htmlFor="">Diseño del tatuaje:</label>
                                                <div className='w-full h-auto p-4 bg-white/90'>
                                                    <DragandDrop />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {tipoReserva === 'piercing' && (
                                        <div className='columnaPiercing'>
                                            <label htmlFor="tipo_piercing">Tipo de piercing: </label>
                                            <select name="tipo_piercing" id="tipo_piercing" className='listaPiercings' value={tipoPiercing} onChange={e => setTipoPiercing(e.target.value)}>
                                                <optgroup label='Oreja'>
                                                    <option value="Helix">Helix</option>
                                                    <option value="Lóbulo">Lóbulo</option>
                                                    <option value="Lóbulo alto">Lóbulo alto</option>
                                                    <option value="Industrial">Industrial</option>
                                                    <option value="Tragus">Tragus</option>
                                                    <option value="Daith">Daith</option>
                                                    <option value="Conch">Conch</option>
                                                </optgroup>
                                                <optgroup label='Nariz'>
                                                    <option value="Nostril">Nostril</option>
                                                    <option value="Septum">Septum</option>
                                                </optgroup>
                                                <optgroup label='Boca'>
                                                    <option value="Lengua clásico">Lengua clásico</option>
                                                    <option value="Medusa">Medusa</option>
                                                    <option value="Ashley">Ashley</option>
                                                    <option value="Labret vertical">Labret vertical</option>
                                                    <option value="Monroe">Monroe</option>
                                                    <option value="Madonna">Madonna</option>
                                                    <option value="Side labret">Side labret</option>
                                                </optgroup>
                                                <optgroup label='Ceja'>
                                                    <option value="Ceja">Ceja</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='filaUno'>
                                <div className='columnaNombre'>
                                    <label htmlFor="fecha">Fecha: </label>
                                    <input type="date" name="fecha" id="fecha" className='inputs' onChange={handleDateChange} />
                                </div>
                                <div className='columnaApellido'>
                                    <label htmlFor="hora">Hora: </label>
                                    <select name="hora" id="hora" className='inputs'>
                                        {availableHours.map(hora => (
                                            <option key={hora} value={hora}>{hora}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className='botonReserva'>Reservar</button>
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
                                    className='w-full h-96'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='contenedorNormas'>
                        <div className='infoNormas'>
                            <h1 className='titulo'>Normas de la reserva</h1>
                            <hr className="separadorFormulario"/>
                            <ul className='listaNormas'>
                                <li>Se deberá dar una señal del 40% del valor del tatuaje/piercing a realizar.</li>
                                <li>El pago se puede hacer a traves de la página web o por Bizum al siguiente numero: 687 81 76 83</li>
                                <li>En caso de cancelacion de la cita, la señal se perderá.</li>
                                <li>La cita puede ser aplazada o modificada una sola vez siempre que se haya avisado con al menos 24 horas de antelación.</li>
                                <li>En caso de aplazarse o modificarse por segunda vez, se deberá dar una nueva señal.</li>
                                <li>Si no se recibe el pago de la señal, se procederá a no guardar la cita.</li>
                                <li>El plazo máximo para abonar la señal es hasta las 00:00 del mismo día que se pide la cita.</li>
                                <li>Nos encontramos en Avda. Cangas 79, para entrar llamas a la puerta y esperar a ser atendido.</li>
                                <li>No puedes venir con un acompañante.</li>
                                <li>En caso de ser menor de edad, debes venir acompañado de uno de tus padres o tutor legal para firmar el consentimiento.</li>
                                <li>Si eres menor y no te acompaña ninguno de tus padres o tutor legal, no se realizara el piercing/tatuaje y se perderá tanto la señal como la cita.</li>
                                <li>No se permiten niños.</li>
                                <li>Se ruega puntualidad. Si el retraso es mayor a 20 minutos, la cita se cancela.</li>
                                <li>Se cobra antes de la realización del piercing/tatuaje.</li>
                                <li>El pago se hará unica y exclusivamente en efectivo.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
