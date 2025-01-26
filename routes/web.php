<?php

use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\CaracteristicaController;
use App\Http\Controllers\Caracteristica_TipoController;
use App\Http\Controllers\EstacionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\DescansoController;
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

Route::get('/galeria', [GaleriaController::class, 'indexPublic'])->name('galerias.public');
Route::get('/evento', [EventoController::class, 'indexPublic'])->name('eventos.public');
Route::get('/evento/{id}', [EventoController::class, 'showPublic'])->name('eventos.publicshow');
Route::post('/reservas/{id}/cancelar', [ReservaController::class, 'cancelar']);

Route::get('/admin', function () {
    return Inertia::render('Admin/Admin');
})->name('admin');

Route::get('/admin/reservas', function () {
    return Inertia::render('ReservasAdmin');
})->name('reservasadmin');

Route::resource('horarios', HorarioController::class);
Route::resource('estaciones', EstacionController::class);
Route::resource('descansos', DescansoController::class);
Route::resource('galerias', GaleriaController::class);
Route::resource('eventos', EventoController::class);
Route::resource('reservas', ReservaController::class);
Route::resource('usuarios', UsuarioController::class);
Route::resource('usuario_tipo', Usuario_TipoController::class);
Route::resource('artistas', ArtistaController::class);
Route::resource('caracteristicas', CaracteristicaController::class);
Route::resource('caracteristica_tipo', Caracteristica_TipoController::class);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
