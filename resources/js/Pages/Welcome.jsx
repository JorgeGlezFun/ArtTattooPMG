import Header from '@/Components/Componentes-ATP/Header';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <Header user={auth.user} />
        </>
    );
}
