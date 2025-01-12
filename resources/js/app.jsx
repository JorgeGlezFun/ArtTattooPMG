import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Elements } from '@stripe/react-stripe-js'; // Importa Elements
import { loadStripe } from '@stripe/stripe-js'; // Importa loadStripe

const appName = import.meta.env.VITE_APP_NAME || 'ArtTattooPMG';

// Carga tu clave pública de Stripe
const stripePromise = loadStripe('pk_test_51QgUmdGIgGRzhmCk5GWP2hxwF1QFabc1FByIWK5uvgSfIOAG3DsF9u1HzdaPexLSR4xrRHJGvMRqWr9bOSzB48Pu00f3YEH7Oq'); // Reemplaza con tu clave pública de Stripe

createInertiaApp({
    title: (title) => `${appName} - ${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Envuelve el componente App en el proveedor Elements
        root.render(
            <Elements stripe={stripePromise}>
                <App {...props} />
            </Elements>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
