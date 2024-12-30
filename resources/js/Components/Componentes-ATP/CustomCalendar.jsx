import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

const CustomCalendar = ({ value, onChange, name, className }) => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    const [fechasDescansos, setFechasDescansos] = useState([]);

    useEffect(() => {
        const fetchDescansos = async () => {
            try {
                const response = await axios.get('/api/vacaciones'); // Cambia la URL según tu API
                setFechasDescansos(response.data);
            } catch (error) {
                console.error('Error al obtener las fechas de descansos:', error);
            }
        };

        fetchDescansos();
    }, []);

    function fechasValidas(date) {
        const day = date.getDay();
        const isDescanso = fechasDescansos.some(fecha => {
            const descansoDate = new Date(fecha);
            return (
                descansoDate.getFullYear() === date.getFullYear() &&
                descansoDate.getMonth() === date.getMonth() &&
                descansoDate.getDate() === date.getDate()
            );
        });
        return date >= minDate && day !== 0 && day !== 6 && !isDescanso;
    };

    function diaInvalido({ date }) {
        return !fechasValidas(date);
    };

    function tileClassName({ date }) {
        const isDescanso = fechasDescansos.some(fecha => {
            const descansoDate = new Date(fecha);
            return (
                descansoDate.getFullYear() === date.getFullYear() &&
                descansoDate.getMonth() === date.getMonth() &&
                descansoDate.getDate() === date.getDate()
            );
        });

        return isDescanso ? 'react-calendar__tile react-calendar__tile--descanso' : 'react-calendar__tile';
    }

    return (
        <div className={`w-fit ${className}`}>
            <label>{name}:</label>
            <div className='w-fit flex flex-col'>
                <Calendar
                    onChange={onChange}
                    value={value}
                    tileDisabled={diaInvalido}
                    tileClassName={tileClassName}
                    min={minDate}
                />
                <p>{tileClassName}</p>
            </div>
        </div>
    );
};

export default CustomCalendar;
