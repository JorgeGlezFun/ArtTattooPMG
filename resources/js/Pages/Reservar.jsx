import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import DragandDrop from '@/Components/Componentes-ATP/DragandDrop';
import logo from "../../img/Logo-Fondo/Logo.png"
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Reservar({ auth }) {

    const nombre = auth.user ? auth.user.name : null;
    const apellido = auth.user ? auth.user.email : null;
    const correo = auth.user ? auth.user.email : null;
    const telefono = auth.user ? auth.user.email : null;

    const [tipoReserva, setTipoReserva] = useState(null);

    return (
        <>
            <Head title="Inicio" />
            <Header user={auth.user} />
            <div className='mainReserva'>
                <div className="contenedorFormulario">
                    <form action="post" className='formulario'>
                        <h1 className="titulo">Reserva tu cita</h1>
                        <hr className="separadorFormulario"/>
                        <div className='filaUno'>
                            <div className='columnaNombre'>
                                <label htmlFor="">Nombre: </label>
                                <input type="text" name="" id="" value={nombre} className='inputs'/>
                            </div>
                            <div className='columnaApellido'>
                                <label htmlFor="">Apellidos: </label>
                                <input type="text" name="" id=""  className='inputs'/>
                            </div>
                        </div>
                        <div className='columnas'>
                            <label htmlFor="" >Correo electrónico: </label>
                            <input type="email" name="" id="" value={correo} className='inputs'/>
                        </div>
                        <div className='columnas'>
                            <label htmlFor="">Teléfono: </label>
                            <input type="tel" name="" id="" className='inputs'/>
                        </div>
                        <div className='filaDos'>
                            <div className='columnaRadio'>
                                <label htmlFor="">Tipo de reserva: </label>
                                <div className='opcionesRadio'>
                                    <div className='w-full'>
                                        <input type="radio" name="reserva" id="tatuaje" value="tatuaje" className='hidden' onChange={() => setTipoReserva('tatuaje')}/>
                                        <label htmlFor="tatuaje" className='opciones'> Tatuaje </label>
                                    </div>
                                    <div className='w-full'>
                                        <input type="radio" name="reserva" id="piercing" value="piercing" className='hidden' onChange={() => setTipoReserva('piercing')}/>
                                        <label htmlFor="piercing" className='opciones'> Piercing </label>
                                    </div>
                                </div>
                            </div>
                            <div
                                className='columnaTipodeReserva'
                            >
                            {tipoReserva === 'tatuaje' && (
                                <div className='w-full'>
                                    <div className='columnaTatuaje'>
                                        <div className='divTatuajes'>
                                            <label htmlFor="">Tamaño del tatuaje: </label>
                                            <select name="" id="" className='listaTatuajes'>
                                                <option value="">Pequeño</option>
                                                <option value="">Mediano</option>
                                                <option value="">Grande</option>
                                            </select>
                                        </div>
                                        <div className='divTatuajes'>
                                            <label htmlFor="">Tipo de tatuaje: </label>
                                            <select name="" id="" className='listaTatuajes'>
                                                <option value="">Tinta negra</option>
                                                <option value="">A color</option>
                                            </select>
                                        </div>
                                        <div className='divTatuajes'>
                                            <label htmlFor="">Zona del tatuaje: </label>
                                            <select name="" id="" className='listaTatuajes'>
                                                <option value="">Brazo</option>
                                                <option value="">Antebrazo</option>
                                                <option value="">Espalda</option>
                                                <option value="">Gemelo</option>
                                                <option value="">Muslo</option>
                                                <option value="">Cadera</option>
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
                                <div
                                    className='columnaPiercing'
                                >
                                    <label htmlFor="">Tipo de piercing: </label>
                                    <select name="" id="" className='listaPiercings'>
                                        <optgroup label='Oreja'>
                                            <option value="">Helix</option>
                                            <option value="">Lóbulo</option>
                                            <option value="">Lóbulo alto</option>
                                            <option value="">Industrial</option>
                                            <option value="">Tragus</option>
                                            <option value="">Daith</option>
                                            <option value="">Conch</option>
                                        </optgroup>
                                        <optgroup label='Nariz'>
                                            <option value="">Nostril</option>
                                            <option value="">Septum</option>
                                        </optgroup>
                                        <optgroup label='Boca'>
                                            <option value="">Lengua clásico</option>
                                            <option value="">Medusa</option>
                                            <option value="">Ashley</option>
                                            <option value="">Labret vertical</option>
                                            <option value="">Monroe</option>
                                            <option value="">Madonna</option>
                                            <option value="">Side labret</option>
                                        </optgroup>
                                        <optgroup label='Ceja'>
                                            <option value="">Ceja</option>
                                        </optgroup>
                                    </select>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className='filaUno'>
                            <div className='columnaNombre'>
                                <label htmlFor="">Fecha: </label>
                                <input type="date" name="" id="" className='inputs'/>
                            </div>
                            <div className='columnaApellido'>
                                <label htmlFor="">Hora: </label>
                                <select className='inputs'>
                                    <optgroup label="Mañana">
                                        <option value="11:30">11:30</option>
                                        <option value="12:30">12:30</option>
                                        <option value="10:30">13:30</option>
                                    </optgroup>
                                    <optgroup label="Tarde">
                                        <option value="18:00">18:00</option>
                                        <option value="19:00">19:00</option>
                                        <option value="20:00">20:00</option>
                                        <option value="21:00">21:00</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className='botonFormulario'>Enviar</button>
                    </form>
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
