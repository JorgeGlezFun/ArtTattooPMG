<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\Tatuaje;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ReservaController extends Controller
{
    public function index()
    {
        $reservas = Reserva::with(['cliente', 'artista', 'tatuaje'])->get();

        foreach ($reservas as $reserva) {
            if ($reserva->tatuaje) {
                $reserva->tatuaje->ruta_imagen = asset('storage/' . $reserva->tatuaje->ruta_imagen);
            }
        }

        // return response()->json($reservas);
        return inertia('Reservas/Index', ['reservas' => $reservas]);
    }

    public function create()
    {
        // Cargar clientes, artistas y tatuajes para el formulario de creación
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
            'tatuaje.ruta_imagen' => 'mimes:jpg,png,jpeg',
            'tatuaje.precio' => 'integer',
            'tatuaje.tamano' => 'string|max:255',
            'tatuaje.color' => 'string|max:255',
            'tatuaje.relleno' => 'string|max:255',
            'tatuaje.zona' => 'string|max:255',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i|in:11:30,12:30,13:30,18:00,19:00,20:00',
            'hora_fin' => 'required',
            'duracion' => 'required|integer'
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

        if (isset($validated['tatuaje']) && isset($validated['tatuaje']['ruta_imagen'])) {

            $imagen = $request->file('tatuaje.ruta_imagen');

            // Obtener el número total de tatuajes
            $totalTatuajes = Tatuaje::count();
            $nuevoNumero = $totalTatuajes + 1;

            // Generar el nuevo nombre del archivo
            $extensionOriginal = $imagen->getClientOriginalExtension();
            $nombreImagen = 'tatuaje_' . $nuevoNumero . '.' . $extensionOriginal;

            // Guardar la imagen con el nuevo nombre
            $imagen->storeAs('uploads/tatuajes', $nombreImagen, 'public');

            // Procesar la imagen
            $manager = new ImageManager(new Driver());
            $imageR = $manager->read(Storage::disk('public')->get('uploads/tatuajes/' . $nombreImagen));
            $imageR->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
            });
            $ruta = Storage::path('public/uploads/tatuajes/' . $nombreImagen);
            $imageR->save($ruta);

            // Crear el tatuaje en la base de datos con la nueva ruta de imagen
            $tatuaje = Tatuaje::create([
                'artista_id' => $validated['artista_id'],
                'ruta_imagen' => 'uploads/tatuajes/' . $nombreImagen,
                'precio' => $validated['tatuaje']['precio'],
                'tamano' => $validated['tatuaje']['tamano'],
                'color' => $validated['tatuaje']['color'],
                'relleno' => $validated['tatuaje']['relleno'],
                'zona' => $validated['tatuaje']['zona'],
            ]);
        }

        // Crear el cliente
        $cliente = Cliente::firstOrCreate(
            ['email' => $validated['cliente']['email']],
            [
                'nombre' => $validated['cliente']['nombre'],
                'apellidos' => $validated['cliente']['apellidos'],
                'telefono' => $validated['cliente']['telefono'],
                'email' => $validated['cliente']['email'],
            ]
        );

        // Crea la reserva
        Reserva::create([
            'cliente_id' => $cliente->id,
            'artista_id' => $validated['artista_id'],
            'tatuaje_id' => $tatuaje->id,
            'fecha' => $validated['fecha'],
            'hora_inicio' => $validated['hora_inicio'],
            'hora_fin' => $validated['hora_fin'],
            'duracion' => $validated['duracion']
        ]);

        session()->flash('message', 'La reserva se ha producido correctamente.');

        return redirect('Reservas/Create');
    }


    public function show(Reserva $reserva)
    {

        if ($reserva->tatuaje && $reserva->tatuaje->ruta_imagen) {
            $reserva->tatuaje->ruta_imagen = asset('storage/' . $reserva->tatuaje->ruta_imagen);
        }

        return inertia('Reservas/Show', [
            'reserva' => $reserva,
            'cliente' => $reserva->cliente,
            'artistas' => $reserva->artista,
            'tatuaje' => $reserva->tatuaje
        ]);
    }
    public function edit(Reserva $reserva)
    {
        return inertia('Reservas/Edit', [
            'reserva' => $reserva,
            'cliente' => $reserva->cliente,
            'artistas' => $reserva->artista,
            'tatuaje' => $reserva->tatuaje
        ]);
    }

    public function update(Request $request, Reserva $reserva)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'artista_id' => 'required|exists:artistas,id',
            'tatuaje_id' => 'required|exists:tatuajes,id',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i|in:11:30,12:30,13:30,18:00,19:00,20:00',
            'hora_fin' => 'required|date_format:H:i|in:11:30,12:30,13:30,18:00,19:00,20:00,21:00',
            'duracion' => 'required|integer'
        ]);

        $reserva->update($validated);

        return redirect()->route('reservas.index')->with('success', 'Reserva actualizada con éxito.');
    }

    public function destroy($id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->tatuaje->delete();
        $reserva->delete();

        return response()->json(['message' => 'Reserva eliminada con éxito.'], 200);
    }


    // Función para obtener la última hora_fin en una fecha específica
    public function obtenerUltimaHoraFin(Request $request)
    {
        $fecha = $request->input('fecha');

        $reservas = Reserva::where('fecha', $fecha)
            ->orderBy('hora_inicio')
            ->get(['hora_inicio', 'hora_fin', 'duracion']);

        return response()->json($reservas);
    }
}
