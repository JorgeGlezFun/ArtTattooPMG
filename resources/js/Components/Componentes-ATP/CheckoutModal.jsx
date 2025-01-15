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

    const onApprove = (actions) => {
        return actions.order.capture().then((details) => {
            alert(`Transacción completada por ${details.payer.name.given_name}`);
            onConfirm();
        });
    };

    return (
        <div className="fondoPaypal">
            <div className="formularioPaypal">
                <button className="cerrarPaypal" onClick={onClose}>X</button>
                <h1 className="tituloFormularioPaypal">Resumen de la reserva</h1>
                <div className="resumenPaypal">
                    <p><strong>Precio de la señal:</strong> {orderData.tatuaje.precio}€</p>
                    <p><strong>Tamaño:</strong> {orderData.tatuaje.tamano}</p>
                    <p><strong>Tipo de relleno:</strong> {orderData.tatuaje.color}</p>
                    <p><strong>Zona:</strong> {orderData.tatuaje.zona}</p>
                </div>
                <PayPalButtons
                    createOrder={onCreateOrder}
                    onApprove={onApprove}
                />
            </div>
        </div>
    )};

export default CheckoutModal;
