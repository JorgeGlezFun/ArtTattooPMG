import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import DragadnDrop from '@/Components/Componentes-ATP/DragandDrop';
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
            <div className='main'>
                <div className="contenedorFormulario">
                    <form action="post" className='formulario'>
                        <h1 className="titulo">Reserva tu cita</h1>
                        <hr className="separador"/>
                        <div className='filaUno'>
                            <div className='columnaNombre'>
                                <label htmlFor="">Nombre: </label> <br />
                                <input type="text" name="" id="" value={nombre} className='inputs'/> <br />
                            </div>
                            <div className='columnaApellido'>
                                <label htmlFor="">Apellidos: </label> <br />
                                <input type="text" name="" id=""  className='inputs'/> <br />
                            </div>
                        </div>
                        <label htmlFor="" >Correo electrónico: </label> <br />
                        <input type="email" name="" id="" value={correo} className='inputs'/> <br />
                        <label htmlFor="">Teléfono: </label> <br />
                        <input type="tel" name="" id="" className='inputs'/> <br />
                        <div className='filaDos'>
                            <div className='columnaRadio'>
                                <label htmlFor="">Tipo de reserva: </label>
                                <div>
                                    <input type="radio" name="reserva" id="tatuaje" value="tatuaje" onChange={() => setTipoReserva('tatuaje')}/> <label htmlFor="tatuaje"> Tatuaje </label>
                                </div>
                                <div>
                                    <input type="radio" name="reserva" id="piercing" value="piercing" onChange={() => setTipoReserva('piercing')}/> <label htmlFor="piercing"> Piercing </label>                                </div>
                            </div>
                            <div
                                className='columnaTipodeReserva'
                            >
                            {tipoReserva === 'tatuaje' && (
                                <div>
                                    <div className='columnaTatuaje'>
                                        <div>
                                            <label htmlFor="">Tamaño del tatuaje: </label> <br />
                                            <select name="" id="" className='listaTatuajes'>
                                                <option value="">Pequeño</option>
                                                <option value="">Mediano</option>
                                                <option value="">Grande</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">Tipo de tatuaje: </label> <br />
                                            <select name="" id="" className='listaTatuajes'>
                                                <option value="">Tinta negra</option>
                                                <option value="">A color</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">Zona del tatuaje: </label> <br />
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
                                    <div className='w-full h-auto p-4 bg-white/90'>
                                        <DragadnDrop />
                                    </div>
                                </div>
                            )}
                            {tipoReserva === 'piercing' && (
                                <div
                                    className='columnaPiercing'
                                >
                                    <label htmlFor="">Tipo de piercing: </label> <br />
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
                                <label htmlFor="">Fecha: </label> <br />
                                <input type="date" name="" id="" className='inputs'/>
                            </div>
                            <div className='columnaApellido'>
                                <label htmlFor="">Hora: </label> <br />
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
                </div>
            </div>
            <Footer />
        </>
    );
}
