import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos de Calendar

const CustomCalendar = ({ value, onChange, name, className}) => {
    // const [date, setDate] = useState(new Date());
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    function fechasValidas(date) {
        const day = date.getDay();
        return date >= minDate && day !== 0 && day !== 6;
    };

    // Funcion que bloquea los dias invalidos
    function diaInvalido({ date }) {
        return !fechasValidas(date);
    };
    return (
        <div className='w-full'>
            <label>{name}:</label>
            <div className='w-full flex flex-col items-center'>
                <Calendar
                    onChange={onChange}
                    value={value}
                    tileDisabled={diaInvalido}
                    min={minDate}
                    />
                {/* <p>Fecha seleccionada: {value ? value.toLocaleDateString() : 'Ninguna fecha seleccionada'}</p> */}
            </div>
        </div>
    );
};

export default CustomCalendar;
