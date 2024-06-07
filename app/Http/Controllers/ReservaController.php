<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\Tatuaje;
use App\Models\Piercing;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReservaController extends Controller
{
    public function index()
    {
        $reservas = Reserva::with(['cliente', 'artista', 'tatuaje', 'piercing'])->get();
        return inertia('Reservas/Index', ['reservas' => $reservas]);
    }

    public function create()
    {
        // Cargar clientes, artistas, tatuajes y piercings para el formulario de creación
        $artistas = Artista::all(); // Obtener todos los artistas
        return inertia('Reservas/Create', ['artistas' => $artistas]);
    }


public function store(Request $request)
{
    // Validar los datos de la reserva y el cliente
    $validated = $request->validate([
        'cliente.nombre' => 'required|string|max:255',
        'cliente.apellidos' => 'required|string|max:255',
        'cliente.telefono' => 'required|integer',
        'cliente.email' => 'required|string|email|max:255',
        'artista_id' => 'required|exists:artistas,id',
        'tatuaje.ruta_imagen' => 'nullable|string|max:255',
        'tatuaje.precio' => 'nullable|integer',
        'piercing.nombre' => 'nullable|string|max:255',
        'piercing.precio' => 'nullable|integer',
        'fecha' => 'required|date',
        'hora_inicio' => 'required|date_format:H:i|in:11:30,12:30,13:30,18:00,19:00,20:00,21:00',
        'hora_fin' => 'required'
    ]);

    $reservaDatetime = Carbon::createFromFormat('Y-m-d H:i', $validated['fecha'] . ' ' . $validated['hora_inicio']);
    $currentDatetime = Carbon::now();

    // Verificar si la fecha y hora son pasadas
    if ($reservaDatetime->lt($currentDatetime)) {
        return redirect()->back()->withErrors(['fecha' => 'No se puede reservar en una fecha y hora pasadas.']);
    }

    // Verificar si la hora ya está reservada
    $existingReservation = Reserva::where('fecha', $validated['fecha'])
        ->where('hora_inicio', $validated['hora_inicio'])
        ->where('artista_id', $validated['artista_id'])
        ->exists();

    if ($existingReservation) {
        return redirect()->back()->withErrors(['hora_inicio' => 'Esta hora ya está reservada.']);
    }

    // Crear el tatuaje o piercing si se proporciona
    $tatuaje = null;
    $piercing = null;

    if (isset($validated['tatuaje']) && isset($validated['tatuaje']['ruta_imagen'])) {
        $tatuaje = Tatuaje::create([
            'artista_id' => $validated['artista_id'],
            'ruta_imagen' => $validated['tatuaje']['ruta_imagen'],
            'precio' => $validated['tatuaje']['precio'],
        ]);
    }

    if (isset($validated['piercing']) && isset($validated['piercing']['nombre'])) {
        $piercing = Piercing::create([
            'artista_id' => $validated['artista_id'],
            'nombre' => $validated['piercing']['nombre'],
            'precio' => $validated['piercing']['precio'],
        ]);
    }

    // Crear el cliente
    if (Cliente::where('email', $validated['cliente']['email'])->exists()) {
        $cliente_id = Cliente::where('email', $validated['cliente']['email'])->first()->id;
        // Crear la reserva
        Reserva::create([
            'cliente_id' => $cliente_id,
            'artista_id' => $validated['artista_id'],
            'tatuaje_id' => $tatuaje ? $tatuaje->id : null,
            'piercing_id' => $piercing ? $piercing->id : null,
            'fecha' => $validated['fecha'],
            'hora_inicio' => $validated['hora_inicio'],
            'hora_fin' => $validated['hora_fin'],
        ]);
    } else {
        $cliente = Cliente::create([
            'nombre' => $validated['cliente']['nombre'],
            'apellidos' => $validated['cliente']['apellidos'],
            'telefono' => $validated['cliente']['telefono'],
            'email' => $validated['cliente']['email'],
        ]);
        // Crear la reserva
        Reserva::create([
            'cliente_id' => $cliente->id,
            'artista_id' => $validated['artista_id'],
            'tatuaje_id' => $tatuaje ? $tatuaje->id : null,
            'piercing_id' => $piercing ? $piercing->id : null,
            'fecha' => $validated['fecha'],
            'hora_inicio' => $validated['hora_inicio'],
            'hora_fin' => $validated['hora_fin'],
        ]);
    }

    return redirect()->route('reservas.create')->with('success', 'Reserva creada con éxito.');
}

    public function show(Reserva $reserva)
    {
        return inertia('Reservas/Show', ['reserva' => $reserva]);
    }

    public function edit(Reserva $reserva)
    {
        return inertia('Reservas/Edit', ['reserva' => $reserva]);
    }

    public function update(Request $request, Reserva $reserva)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'artista_id' => 'required|exists:artistas,id',
            'tatuaje_id' => 'nullable|exists:tatuajes,id',
            'piercing_id' => 'nullable|exists:piercings,id',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i|in:11:30,12:30,13:30,18:00,19:00,20:00,21:00',
            'hora_fin' => 'required|date_format:H:i|in:11:30,12:30,13:30,18:00,19:00,20:00,21:00'
        ]);

        $reserva->update($validated);

        return redirect()->route('reservas.index')->with('success', 'Reserva actualizada con éxito.');
    }

    public function destroy(Reserva $reserva)
    {
        $reserva->delete();
        return redirect()->route('reservas.index')->with('success', 'Reserva eliminada con éxito.');
    }

    // Función para obtener la última hora_fin en una fecha específica
    public function obtenerUltimaHoraFin(Request $request)
    {
        $fecha = $request->input('fecha');

        $ultimaReserva = Reserva::where('fecha', $fecha)
            ->orderBy('hora_fin', 'desc')
            ->first();

        return response()->json([
            'hora_fin' => $ultimaReserva ? $ultimaReserva->hora_fin : null,
        ]);
    }
}
