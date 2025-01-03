<?php

use App\Http\Controllers\DescansoController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\EstacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/ultima-hora-fin', [ReservaController::class, 'obtenerUltimaHoraFin']);
Route::get('/horas-por-estacion', [EstacionController::class, 'conseguirHorasPorEstacion']);
Route::get('/todas-las-horas', [EstacionController::class, 'conseguirTodasLasHoras']);
Route::get('/vacaciones', [DescansoController::class, 'vacaciones']);
