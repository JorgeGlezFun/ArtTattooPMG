<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\Tatuaje;
use App\Models\Piercing;
use Illuminate\Http\Request;

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
            'cliente.email' => 'required|string|email|max:255|unique:clientes,email',
            'artista_id' => 'required|exists:artistas,id',
            'tatuaje.ruta_imagen' => 'nullable|string|max:255',
            'tatuaje.precio' => 'nullable|integer',
            'piercing.nombre' => 'nullable|string|max:255',
            'piercing.precio' => 'nullable|integer',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ]);



        // Crear el cliente
        $cliente = Cliente::create([
            'nombre' => $validated['cliente']['nombre'],
            'apellidos' => $validated['cliente']['apellidos'],
            'telefono' => $validated['cliente']['telefono'],
            'email' => $validated['cliente']['email'],
        ]);

        // Crear el tatuaje o piercing si se proporciona
        $tatuaje = null;
        $piercing = null;

        if (isset($validated['tatuaje'])) {
            $tatuaje = Tatuaje::create([
                'artista_id' => $validated['artista_id'],
                'ruta_imagen' => $validated['tatuaje']['ruta_imagen'],
                'precio' => $validated['tatuaje']['precio'],
            ]);
        }

        if (isset($validated['piercing'])) {
            $piercing = Piercing::create([
                'artista_id' => $validated['artista_id'],
                'nombre' => $validated['piercing']['nombre'],
                'precio' => $validated['piercing']['precio'],
            ]);
        }

        // Crear la reserva
        Reserva::create([
            'cliente_id' => $cliente->id,
            'artista_id' => $validated['artista_id'],
            'tatuaje_id' => $tatuaje ? $tatuaje->id : null,
            'piercing_id' => $piercing ? $piercing->id : null,
            'fecha' => $validated['fecha'],
            'hora' => $validated['hora'],
        ]);

        return redirect()->route('reservas.index')->with('success', 'Reserva creada con éxito.');
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
            'hora' => 'required|date_format:H:i',
        ]);

        $reserva->update($validated);

        return redirect()->route('reservas.index')->with('success', 'Reserva actualizada con éxito.');
    }

    public function destroy(Reserva $reserva)
    {
        $reserva->delete();
        return redirect()->route('reservas.index')->with('success', 'Reserva eliminada con éxito.');
    }
}
