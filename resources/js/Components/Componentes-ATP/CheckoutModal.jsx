import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutModal = ({ isOpen, onClose, onConfirm, orderData, userSaldo, setUserSaldo, usuarioId }) => {
    if (!isOpen) return null;


    const pagarConSaldo = async () => {
        const total = userSaldo - orderData.tatuaje.precio;
        console.log('Total:', total);
        try {
            const response = await axios.post(`/api/usuarios/${usuarioId}/pagar`, {
                cantidad: total,
            });
            console.log('Respuesta:', response);
            setUserSaldo(response.data.saldo);
            onConfirm();
        } catch (error) {
            console.error(error);
            }
    }

    const onCreateOrder = async (data, actions) => {
        try {
            const order = await actions.order.create({
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <button className="text-red-500 font-bold float-right" onClick={onClose}>X</button>
                <h1 className="text-xl font-bold mb-4 text-center">Resumen de la reserva</h1>
                <div className="mb-4">
                    <p className="text-gray-700 text-base">
                        <strong>Precio de la señal:</strong> {orderData.tatuaje.precio}€
                    </p>
                    <p className="text-gray-700 text-base">
                        <strong>Tu saldo disponible:</strong> {userSaldo}€
                    </p>
                </div>
                <button
                    className={'botonSaldo'}
                    onClick={pagarConSaldo}
                    disabled={userSaldo < orderData.tatuaje.precio}
                >
                    Pagar con saldo
                </button>
                <div className="mt-4">
                    <PayPalButtons createOrder={onCreateOrder} onApprove={onApprove} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
