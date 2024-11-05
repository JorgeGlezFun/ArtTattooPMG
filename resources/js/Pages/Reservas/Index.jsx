import React from 'react';

const Index = ({ reservas }) => {
  return (
    <div className='bg-white min-h-screen'>
      <h1>Reservas</h1>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
          <div key={reserva.id} className='p-4 border-b border-gray-200'>
            <p>Cliente: {reserva.cliente.nombre}</p>
            <p>Artista: {reserva.artista.nombre}</p>

            {reserva.tatuaje ? (
              <>
                <img src={reserva.tatuaje.ruta_imagen} alt="Imagen del tatuaje" />
                <p>Tatuaje: {reserva.tatuaje.nombre}</p>
                <p>Precio: {reserva.tatuaje.precio}€</p>
              </>
            ) : reserva.piercing ? (
              <>
                <p>Piercing: {reserva.piercing.nombre}</p>
                <p>Precio: {reserva.piercing.precio}€</p>
              </>
            ) : (
              <p>No hay tatuaje ni piercing asociado.</p>
            )}

            <p>Fecha: {reserva.fecha}</p>
            <p>Hora de inicio: {reserva.hora_inicio}</p>
            <p>Hora de fin: {reserva.hora_fin}</p>
            <p>Duración: {reserva.duracion}</p>
          </div>
        ))
      ) : (
        <p>No hay reservas.</p>
      )}
    </div>
  );
};

export default Index;
