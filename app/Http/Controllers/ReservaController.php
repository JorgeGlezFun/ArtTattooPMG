<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use App\Models\Caracteristica_Tipo;
use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\Tatuaje;
use App\Models\Horario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ReservaController extends Controller
{
    public function index()
    {
        $reservas = Reserva::with(['cliente', 'artista', 'tatuaje.caracteristicas', ])->get();
        foreach ($reservas as $reserva) {
            if ($reserva->tatuaje) {
                $reserva->tatuaje->ruta_imagen = asset('storage/' . $reserva->tatuaje->ruta_imagen);
            }
        }

        return inertia('Reservas/Index', ['reservas' => $reservas]);
    }

    public function create()
    {
        $artistas = Artista::all();
        $horarios = Horario::all();
        $caracteristica_tipos = Caracteristica_Tipo::with('caracteristicas')->get();
        // dd($);
        $horarios->transform(function ($horario) {
            $horario->horas = json_decode($horario->horas, true);
            return $horario;
        });

        if (auth()->check()) {
            $clienteId = auth()->user()->cliente_id;
            $reservas = Reserva::where('cliente_id', $clienteId)->get();
            return inertia('Reservas/Create', ['artistas' => $artistas, 'reservas' => $reservas, 'horarios' => $horarios, 'tipos' => $caracteristica_tipos]);
        }
        return inertia('Reservas/Create', ['artistas' => $artistas, 'horarios' => $horarios, 'tipos' => $caracteristica_tipos]);
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
            'tatuaje.ruta_imagen' => 'required|mimes:jpg,png,jpeg',
            'tatuaje.precio' => 'required|numeric',
            'tatuaje.caracteristicas' => 'array',
            'tatuaje.caracteristicas.*' => 'exists:caracteristicas,id',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required',
            'duracion' => 'required|integer',
            'estado' => 'required|string'
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
            ->where('estado', 'Activa')
            ->exists();

        if ($existingReservation) {
            return redirect()->back()->withErrors(['hora_inicio' => 'Esta hora ya está reservada.']);
        }

        // Si el pago es exitoso, proceder a crear el tatuaje y la reserva
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
            $imageR = $manager ->read(Storage::disk('public')->get('uploads/tatuajes/' . $nombreImagen));
            $imageR->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
            });

            $ruta = Storage::path('public/uploads/tatuajes/' . $nombreImagen);
            $imageR->save($ruta);

            // Crear el tatuaje en la base de datos con la nueva ruta de imagen
            $tatuaje = Tatuaje::create([
                'artista_id' => $validated['artista_id'],
                'ruta_imagen' => 'uploads/tatuajes/' . $nombreImagen,
                'caracteristicas' => $validated['tatuaje']['caracteristicas'],
                'precio' => $validated['tatuaje']['precio'],
            ]);
            // $tatuaje = Tatuaje::create($request->only('artista_id', 'ruta_imagen', 'precio'));
            // Sincronizar caracteristicas
            if (isset($validated['tatuaje']['caracteristicas'])) {
                $tatuaje->caracteristicas()->sync($validated['tatuaje']['caracteristicas']);
            }
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

        // Crear la reserva
        Reserva::create([
            'cliente_id' => $cliente->id,
            'artista_id' => $validated['artista_id'],
            'tatuaje_id' => $tatuaje->id,
            'fecha' => $validated['fecha'],
            'hora_inicio' => $validated['hora_inicio'],
            'hora_fin' => $validated['hora_fin'],
            'duracion' => $validated['duracion'],
            'estado' => $validated['estado']
        ]);

        session()->flash('message', 'La reserva se ha producido correctamente.');

        return redirect('reservas/create');
    }

    public function show(Reserva $reserva)
    {
        if ($reserva->tatuaje && $reserva->tatuaje->ruta_imagen) {
            $reserva->tatuaje->ruta_imagen = asset('storage/' . $reserva->tatuaje->ruta_imagen);
        }

        $tipos = Caracteristica_Tipo::all();

        return inertia('Reservas/Show', [
            'reserva' => $reserva,
            'cliente' => $reserva->cliente,
            'artistas' => $reserva->artista,
            'tatuaje' => $reserva->tatuaje
        ]);
    }

    public function edit(Reserva $reserva)
    {
        if ($reserva->tatuaje) {
            $reserva->tatuaje->ruta_imagen = asset('storage/' . $reserva->tatuaje->ruta_imagen);
        }

        return inertia('Reservas/Edit', [
            'reserva' => $reserva,
            'cliente' => $reserva->cliente,
            'artistas' => Artista::all(), // Obtener todos los artistas
            'tatuaje' => $reserva->tatuaje
        ]);
    }

    public function update(Request $request, Reserva $reserva)
    {
        // dd($request->hasFile('tatuaje.ruta_imagen'));
        // dd($request->all());
        $validated = $request->validate([
            'cliente.nombre' => 'required|string|max:255',
            'cliente.apellidos' => 'required|string|max:255',
            'cliente.telefono' => 'required|integer',
            'cliente.email' => 'required|string|email|max:255',
            'artista_id' => 'required|exists:artistas,id',
            'tatuaje.precio' => 'numeric',
            'tatuaje.tamano' => 'string|max:255',
            'tatuaje.color' => 'string|max:255',
            'tatuaje.relleno' => 'string|max:255',
            'tatuaje.zona' => 'string|max:255',
            // 'tatuaje.ruta_imagen' => 'nullable|file|mimes:jpg,png,jpeg',
            'fecha' => 'required|date',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required',
            'duracion' => 'required|integer'
        ]);
        // dd('Estos son los datos despues de validarlos: ', $request->all());

        $reservaDatetime = Carbon::createFromFormat('Y-m-d H:i', $validated['fecha'] . ' ' . $validated['hora_inicio']);
        $currentDatetime = Carbon::now();

        // Verificar si la fecha y hora son pasadas
        if ($reservaDatetime->lt($currentDatetime)) {
            return redirect()->back()->withErrors(['fecha' => 'No se puede reservar en una fecha y hora pasadas.']);
        }

        // Verificar si la hora ya está reservada, excluyendo la reserva actual
        $existingReservation = Reserva::where('fecha', $validated['fecha'])
            ->where('hora_inicio', $validated['hora_inicio'])
            ->where('artista_id', $validated['artista_id'])
            ->where('id', '!=', $reserva->id)
            ->exists();

        if ($existingReservation) {
            return redirect()->back()->withErrors(['hora_inicio' => 'Esta hora ya está reservada.']);
        }

        // Actualizar el cliente
        $cliente = $reserva->cliente;
        $cliente->update([
            'nombre' => $validated['cliente']['nombre'],
            'apellidos' => $validated['cliente']['apellidos'],
            'telefono' => $validated['cliente']['telefono'],
            'email' => $validated['cliente']['email'],
        ]);

        // Verificar si se proporciona una nueva imagen de tatuaje
        if (isset($validated['tatuaje']) && isset($validated['tatuaje']['ruta_imagen'])) {
            $imagen = $request->file('tatuaje.ruta_imagen');
            // Generar un nuevo nombre para la imagen
            $extensionOriginal = $imagen->getClientOriginalExtension();
            $nombreImagen = 'tatuaje_' . $reserva->tatuaje->id . '.' . $extensionOriginal; // Usar el ID del tatuaje existente
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
            // Actualizar el tatuaje en la base de datos
            $reserva->tatuaje->update([
                'artista_id' => $validated['artista_id'],
                'ruta_imagen' => 'uploads/tatuajes/' . $nombreImagen,
                'precio' => $validated['tatuaje']['precio'],
                'tamano' => $validated['tatuaje']['tamano'],
                'color' => $validated['tatuaje']['color'],
                'relleno' => $validated['tatuaje']['relleno'],
                'zona' => $validated['tatuaje']['zona'],
            ]);
        }

        // Actualizar la reserva
        $reserva->update([
            'artista_id' => $validated['artista_id'],
            'fecha' => $validated['fecha'],
            'hora_inicio' => $validated['hora_inicio'],
            'hora_fin' => $validated['hora_fin'],
            'duracion' => $validated['duracion'],
        ]);

        // dd($request->all());
        session()->flash('message', 'La reserva se ha actualizado correctamente.');

        $updated = $reserva->update($validated);

        if ($updated) {
            Log::info('Reserva actualizada', ['reserva_id' => $reserva->id]);
            return redirect()->route('reservas.index')->with('success', 'Reserva actualizada exitosamente.');
        } else {
            Log::error('Error al actualizar la reserva', ['reserva_id' => $reserva->id]);
            return redirect()->back()->with('error', 'No se pudo actualizar la reserva.');

        }

    }

    public function destroy($id)
    {
        $reserva = Reserva::findOrFail($id);
        if ($reserva->tatuaje->ruta_imagen && Storage::disk('public')->exists($reserva->tatuaje->ruta_imagen)) {
            Storage::disk('public')->delete($reserva->tatuaje->ruta_imagen);
        }
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
            ->get(['hora_inicio', 'hora_fin', 'duracion', 'estado']);

        return response()->json($reservas);
    }

    public function cancelar($id)
    {
        $reserva = Reserva::findOrFail($id);
        $fechaReserva = Carbon::parse($reserva->fecha);
        $hoy = Carbon::now();
        $diasRestantes = $hoy->diffInDays($fechaReserva);
        $porcentajeReembolso = 0;
        if ($diasRestantes >= 7) {
            $porcentajeReembolso = 40;
        } elseif ($diasRestantes >= 3) {
            $porcentajeReembolso = 30;
        } elseif ($diasRestantes >= 2) {
            $porcentajeReembolso = 15;
        } elseif ($diasRestantes < 1) {
            $porcentajeReembolso = 0;
        }
        $montoReembolso = ($porcentajeReembolso / 100) * $reserva->tatuaje->precio;
        $cliente = $reserva->cliente;
        if (!$cliente) {
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }
        $usuario = User::where('cliente_id', $cliente->id)->first();
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado para el cliente'], 404);
        }
        $usuario->saldo += $montoReembolso;
        $usuario->save();
        $reserva->estado = 'Cancelada';
        $reserva->save();
        return response()->json(['message' => 'Reserva cancelada con éxito', 'montoReembolso' => $montoReembolso]);
    }
}
