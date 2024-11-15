import React from 'react';

import HeaderAdmin from '@/Components/Componentes-ATP/HeaderAdmin';

const Index = ({ auth, reservas }) => {
  return (
    <div className='bg-white min-h-screen'>
        <HeaderAdmin user={auth.user}/>
      <h1>Reservas</h1>
      <table>
        <tr>
            <th>ID Reserva</th>
            <th>Tatuaje</th>
            <th>Cliente</th>
            <th>Artista</th>
            <th>Fecha</th>
            <th>Hora de inicio</th>
            <th>Hora de fin</th>
            <th>Duración</th>
            <th>Precio</th>
        </tr>
      {reservas.length > 0 ? (
        reservas.map((reserva) => (
        //   <div key={reserva.id} className='p-4 border-b border-gray-200'>
            <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td><img src={reserva.tatuaje.ruta_imagen} alt="Imagen del tatuaje" className='w-10 h-10'/></td>
                <td>{reserva.cliente.nombre}</td>
                <td>{reserva.artista.nombre}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora_inicio}</td>
                <td>{reserva.hora_fin}</td>
                <td>{reserva.duracion} hora/s</td>
                {/* <td>{reserva.tatuaje.zona}</td>
                <td>{reserva.tatuaje.tamano}€</td>
                <td>{reserva.tatuaje.color}€</td>
                <td>{reserva.tatuaje.tipo}€</td> */}
                <td>{reserva.tatuaje.precio}€</td>
            </tr>
        //   </div>
        ))
      ) : (
        <h1>No hay reservas.</h1>
      )}
      </table>
    </div>
  );
};

export default Index;
