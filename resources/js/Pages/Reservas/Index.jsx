import React from 'react';

const Index = ({ reservas }) => {
  return (
    <div className='bg-white min-h-screen'>
      <h1>Reservas</h1>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div key={reserva.id} className='p-4 border-b border-gray-200'>
            <p>{reserva.cliente.nombre}</p>
            <p>{reserva.artista.nombre}</p>
            {reserva.tatuaje != null ? (
              <img src={reserva.tatuaje.ruta_imagen} alt="Tatuaje" />
            ) : (
                <p>prueba</p> //{reserva.piercing.nombre}</p>
            )}
            <p>{reserva.fecha}</p>
            <p>{reserva.tatuaje.precio}€</p>
            <p>{reserva.hora_inicio}</p>
            <p>{reserva.hora_fin}</p>
            <p>{reserva.duracion}</p>
          </div>
        ))
      ) : (
        <p>No hay reservas.</p>
      )}
    </div>
  );
};

export default Index;
