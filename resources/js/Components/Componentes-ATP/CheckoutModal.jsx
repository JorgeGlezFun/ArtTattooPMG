// CheckoutModal.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutModal = ({ isOpen, onClose, onConfirm, orderData }) => {
    if (!isOpen) return null; // No renderizar si el modal no está abierto

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: { value: orderData.tatuaje.precio.toString() }, // Asegúrate de que sea un string
            }],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert(`Transacción completada por ${details.payer.name.given_name}`);
            onConfirm();
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <button className="absolute top -2 right-2 text-gray-600" onClick={onClose}>X</button>
                <h1 className="text-lg font-semibold mb-4">Checkout</h1>
                <div>
                    <h3>Cliente:</h3>
                    <p>Nombre: {orderData.cliente.nombre} {orderData.cliente.apellidos}</p>
                </div>
                <div>
                    <h3>Tatuaje:</h3>
                    <p>Precio: {orderData.tatuaje.precio}€</p>
                    <p>Tamaño: {orderData.tatuaje.tamano}</p>
                    <p>Color: {orderData.tatuaje.color}</p>
                    <p>Zona: {orderData.tatuaje.zona}</p>
                </div>
                <PayPalButtons
                    createOrder={onCreateOrder}
                    onApprove={onApprove}
                />
            </div>
        </div>
    )};

export default CheckoutModal;
