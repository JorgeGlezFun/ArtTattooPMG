<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\GaleriaController;
use App\Http\Controllers\EventoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\Usuario_TipoController;
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

Route::get('/contacto', function () {
    return Inertia::render('Contacto');
})->name('contacto');


Route::get('/galeria', [GaleriaController::class, 'indexPublic'])->name('galerias.public');
Route::get('/evento', [EventoController::class, 'indexPublic'])->name('eventos.public');
Route::get('/evento/{id}', [EventoController::class, 'showPublic'])->name('eventos.publicshow');

Route::get('/admin', function () {
    return Inertia::render('Admin/Admin');
})->name('admin');


Route::resource('galerias', GaleriaController::class);
Route::resource('eventos', EventoController::class);
Route::resource('usuarios', UsuarioController::class);
Route::resource('usuario_tipo', Usuario_TipoController::class);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
