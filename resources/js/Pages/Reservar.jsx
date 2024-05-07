import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';
import logo from "../../img/Logo-Fondo/Logo.png"
import { Head } from '@inertiajs/react';

export default function Reservar({ auth }) {
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
                                <input type="text" name="" id="" /> <br />
                            </div>
                            <div className='columnaApellido'>
                                <label htmlFor="">Apellidos: </label> <br />
                                <input type="text" name="" id="" /> <br />
                            </div>
                        </div>
                        <label htmlFor="" >Correo electrónico: </label> <br />
                        <input type="email" name="" id="" className='inputCorreo'/> <br />
                        <label htmlFor="">Teléfono: </label> <br />
                        <input type="tel" name="" id="" className='inputCorreo'/> <br />
                        <label htmlFor="">Tipo de reserva: </label>
                        <div className='filaDos'>
                            <div className='columnaRadio'>
                                <div>
                                    <input type="radio" name="reserva" id="tatuaje" /> <label htmlFor="tatuaje"> Tatuaje </label>
                                </div>
                                <div>
                                    <input type="radio" name="reserva" id="piercing" /> <label htmlFor="piercing"> Piercing </label>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <label htmlFor="">Tamaño del tatuaje: </label> <br />
                                        <select name="" id="">
                                            <option value="">Pequeño</option>
                                            <option value="">Mediano</option>
                                            <option value="">Grande</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Tipo de tatuaje: </label> <br />
                                        <select name="" id="">
                                            <option value="">Tinta negra</option>
                                            <option value="">A color</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Zona del tatuaje: </label> <br />
                                        <select name="" id="">
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Tipo de piercing: </label> <br />
                                    <select name="" id="">
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

                                {/*
                                Nostril 25€
                                Septum 25€

                                Helix; 25€
                                Lóbulos y lóbulos altos ; 25€
                                Industrial 30€
                                Tragus 25€
                                Daith 25€
                                Conch 25€

                                Lengua clásico 30€

                                Medusa 25€
                                Ashley 25€
                                Labret vertical 30€
                                Monroe 25€
                                Madonna 25€
                                Side labret 25€

                                Ceja 30€ */}
                            </div>
                        </div>
                        <div className='filaUno'>
                            <div className='columnaNombre'>
                                <label htmlFor="">Fecha: </label> <br />
                                <input type="date" name="" id="" />
                            </div>
                            <div className='columnaApellido'>
                                <label htmlFor="">Hora: </label> <br />
                                <select>
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
                        <button type="submit" className='boton'>Enviar</button>
                    </form>
                    {/* <div className="infoTexto">
                        <h1 className="titulo">Otras formas de contacto</h1>
                        <hr className="separador"/>
                        <p className="texto">
                            Aquí encontrarás un lugar donde los mejores profesionales te atenderán para realizar los tatuajes que
                            tengas pensado.<br/>
                            <br/>
                            Para concertar una cita, puedes ir a la pestaña de “Reservar Tu Cita”, donde encontraras a tu
                            disposición todas las herramientas para poder tener una cita en nuestro estudio.<br/>
                            <br/>
                            También puedes informarte sobre los próximos eventos en los que participaremos, así como ver nuestra
                            galería, que consiste en los trabajos que hemos realizado, o bien informarte acerca de nuestro equipo e
                            instalaciones.<br/>
                            <br/>
                            Muchas gracias por su visita.
                        </p>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}
