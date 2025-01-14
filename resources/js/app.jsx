import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Importa el proveedor de PayPal

const appName = import.meta.env.VITE_APP_NAME || 'ArtTattooPMG';

// Configuración inicial de PayPal
const initialOptions = {
    "client-id": "AQIwfbvqK9VvpVo41G0sT-9DqG_b4gofTVHud6A_bxfbZYihwsoowkjm4QOOxuog6MlMOaa1H9JHkIYI",
    currency: "EUR",
    intent: "capture",
};

createInertiaApp({
    title: (title) => `${appName} - ${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Envuelve el componente App en el proveedor de PayPal
        root.render(
            <PayPalScriptProvider options={initialOptions}>
                <App {...props} />
            </PayPalScriptProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
