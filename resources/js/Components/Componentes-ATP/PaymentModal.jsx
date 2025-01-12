import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Enviar el token al backend para procesar el pago
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token.id, amount }),
            });

            const data = await response.json();

            if (data.success) {
                onPaymentSuccess();
                onClose();
            } else {
                setError(data.message || 'Error al procesar el pago');
            }
        } catch (error) {
            setError('Error al procesar el pago');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Realizar Pago</h2>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    {error && <div className="error">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : 'Pagar'}
                    </button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default PaymentModal;
