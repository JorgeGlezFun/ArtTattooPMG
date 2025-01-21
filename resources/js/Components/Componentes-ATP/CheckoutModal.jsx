import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutModal = ({ isOpen, onClose, onConfirm, orderData }) => {
    if (!isOpen) return null; // No renderizar si el modal no está abierto

    const onCreateOrder = async (data, actions) => {
        try {
            const order = actions.order.create({
                purchase_units: [{
                    amount: { value: orderData.tatuaje.precio.toString() },
                }],
            });
            return order;
        } catch (error) {
            console.error("Error al crear el pedido:", error);
        }
    };

    const onApprove = async (data, actions) => {
        console.log("Data:", data);
        console.log("Actions:", actions);
        try {
            const details = await actions.order.capture();
            alert(`Transacción completada por ${details.payer.name.given_name}`);
            onConfirm();
        } catch (error) {
            console.error("Error al capturar el pedido:", error);
            alert("Hubo un problema al procesar su pago. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <div className="fondoPaypal">
            <div className="formularioPaypal">
                <button className="cerrarPaypal" onClick={onClose}>X</button>
                <h1 className="tituloFormularioPaypal">Resumen de la reserva</h1>
                <div className="resumenPaypal">
                    <p><strong>Precio de la señal:</strong> {orderData.tatuaje.precio}€</p>
                </div>
                <PayPalButtons
                    createOrder={onCreateOrder}
                    onApprove={onApprove}
                />
            </div>
        </div>
    );
};

export default CheckoutModal;
