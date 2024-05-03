<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Inicio', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('/')
;

Route::get('/inicio', function () {
    return Inertia::render('Inicio');
});

Route::get('/sobrenosotros', function () {
    return Inertia::render('SobreNosotros');
})->name('sobrenosotros');

Route::get('/galeria', function () {
    return Inertia::render('Galeria');
})->name('galeria');

Route::get('/eventos', function () {
    return Inertia::render('Eventos');
})->name('eventos');

Route::get('/tienda', function () {
    return Inertia::render('Tienda');
})->name('tienda');

Route::get('/reservar', function () {
    return Inertia::render('Reservar');
})->name('reservar');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
