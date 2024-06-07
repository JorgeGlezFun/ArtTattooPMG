import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Index = ( {reservas} ) => {
//   const [reservas, setReservas] = useState([]);

//   useEffect(() => {
//     const fetchReservas = async () => {
//       try {
//         const response = await axios.get('/reservas');
//         setReservas(response.data);
//       } catch (error) {
//         console.error('Hubo un error al obtener las reservas:', error);
//       }
//     };

//     fetchReservas();
//   }, []);

return (
  <div className='bg-white min-h-screen'>
    <h1>Reservas</h1>
    {reservas.length > 0 ? (
      reservas.map((reserva) => (
        <div key={reserva.id} className='p-4 border-b border-gray-200'>
          <p>{reserva.cliente.nombre}</p>
          <p>{reserva.artista.nombre}</p>
          {
              reserva.tatuaje != null ? (
                  <p>{reserva.tatuaje.ruta_imagen}</p>
              ) : <p>{reserva.piercing.nombre}</p>
          }
          <p>{reserva.fecha}</p>
          <p>{reserva.hora_inicio}</p>
          <p>{reserva.hora_fin}</p>
        </div>
      ))
    ) : (
        console.log(reservas),
      <p>No hay reservas.</p>
    )}
  </div>
);
};

export default Index;
