import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Componentes-ATP/Header';
import Footer from '@/Components/Componentes-ATP/Footer';

const Create = ({ auth }) => {
    const [data, setData] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        email: "",
        mensaje: ""
    });

    const [errors, setErrors] = useState({});

    const phoneNumber = "+34687817683";

    const generateWhatsAppLink = () => {
        const formattedMessage = `Hola, soy ${data.nombre} ${data.apellidos}.%0A${data.mensaje}`;
        const encodedMessage = encodeURIComponent(formattedMessage);
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    };

    // 🔍 Objeto con validaciones
    const validators = {
        nombre: value => value.trim() ? "" : "Este campo es obligatorio.",
        apellidos: value => value.trim() ? "" : "Este campo es obligatorio.",
        telefono: value => /^\d{9,15}$/.test(value) ? "" : "Introduce un teléfono válido.",
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Correo electrónico inválido.",
        mensaje: value => value.trim().length >= 10 ? "" : "El mensaje debe tener al menos 10 caracteres."
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const error = validators[name](value);

        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const isFormValid = Object.values(errors).every(err => !err) &&
                        Object.values(data).every(field => field.trim() !== "");

    return (
        <>
            <Head title="Contacto" />
            <Header user={auth.user} />
            <div className='main'>
                <div className="contenedorReserva">
                    <div className='contenedorFormulario'>
                        <div className='formulario'>
                            <h1 className="titulo">Contactanos</h1>
                            <hr className="separadorFormulario"/>
                            <div className='filaUno'>
                                <div className='columnaNombre'>
                                    <label>Nombre:</label>
                                    <input
                                        className={`inputs ${errors.nombre ? 'border-red-500 text-red-500' : ''}`}
                                        type="text"
                                        name="nombre"
                                        value={data.nombre}
                                        onChange={handleChange}
                                    />
                                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                                </div>
                                <div className='columnaApellido'>
                                    <label>Apellidos:</label>
                                    <input
                                        className={`inputs ${errors.apellidos ? 'border-red-500 text-red-500' : ''}`}
                                        type="text"
                                        name="apellidos"
                                        value={data.apellidos}
                                        onChange={handleChange}
                                    />
                                    {errors.apellidos && <p className="text-red-500 text-sm">{errors.apellidos}</p>}
                                </div>
                            </div>
                            <div className='columnas'>
                                <label>Teléfono:</label>
                                <input
                                    className={`inputs ${errors.telefono ? 'border-red-500 text-red-500' : ''}`}
                                    type="text"
                                    name="telefono"
                                    value={data.telefono}
                                    onChange={handleChange}
                                />
                                {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
                            </div>
                            <div className='columnas'>
                                <label>Email:</label>
                                <input
                                    className={`inputs ${errors.email ? 'border-red-500 text-red-500' : ''}`}
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className='columnas'>
                                <label>Expresa tu idea:</label>
                                <textarea
                                    className={`inputs ${errors.mensaje ? 'border-red-500 text-red-500' : ''}`}
                                    name="mensaje"
                                    value={data.mensaje}
                                    onChange={handleChange}
                                    placeholder='Ejemplo: "Buenas, me gustaría pedir cita para tatuarme el brazo izquierdo, en la zona del bíceps. Me gustaría un diseño de una rosa con espinas.. El tatuaje lo quiero de 17cm. Gracias."'
                                ></textarea>
                                {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
                            </div>
                            <a
                                href={isFormValid ? generateWhatsAppLink() : "#"}
                                target='_blank'
                                className={`botonContacto ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={(e) => !isFormValid && e.preventDefault()}
                            >
                                Enviar
                            </a>
                        </div>
                    </div>
                    <div className='w-full'>
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
            </div>
            <Footer />
        </>
    );
};

export default Create;
