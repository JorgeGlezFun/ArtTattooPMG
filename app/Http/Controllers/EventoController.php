<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eventos = Evento::paginate(5);

        foreach ($eventos as $evento) {
            if ($evento->ruta_imagen) {
                $evento->ruta_imagen = asset('storage/' . $evento->ruta_imagen);
            }
        }

        $evento->contenido = Str::limit($evento->contenido, 100, '...');

        return inertia('Eventos/Index', [
            'eventos' => $eventos,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Eventos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string:255',
            'contenido' => 'required|string:255',
            'ruta_imagen' => 'mimes:jpg,png,jpeg',
        ]);

        if (isset($validated['ruta_imagen'])) {

            $imagen = $request->file('ruta_imagen');

            // Obtener el número total de tatuajes
            $totalEvento = Evento::count();
            $nuevoNumero = $totalEvento + 1;

            // Generar el nuevo nombre del archivo
            $extensionOriginal = $imagen->getClientOriginalExtension();
            $nombreImagen = 'evento_' . $nuevoNumero . '.' . $extensionOriginal;

            // Guardar la imagen con el nuevo nombre
            $imagen->storeAs('uploads/eventos', $nombreImagen, 'public');

            // Procesar la imagen
            $manager = new ImageManager(new Driver());
            $imageR = $manager->read(Storage::disk('public')->get('uploads/eventos/' . $nombreImagen));
            $imageR->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
            });
            $ruta = Storage::path('public/uploads/eventos/' . $nombreImagen);
            $imageR->save($ruta);

            // Crear el evento en la base de datos con la nueva ruta de imagen
            $evento = Evento::create([
                'titulo' => $validated['titulo'],
                'contenido' => $validated['contenido'],
                'ruta_imagen' => 'uploads/eventos/' . $nombreImagen,
            ]);
        }

        session()->flash('message', 'El evento se ha producido correctamente.');

        return redirect()->route('eventos.index')->with('success', 'Evento creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Evento $evento)
    {
        if ($evento->ruta_imagen) {
            $evento->ruta_imagen = asset('storage/' . $evento->ruta_imagen);
        }

        return inertia('Eventos/Show', [
            'evento' => $evento,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evento $evento)
    {
        if ($evento->ruta_imagen) {
            $evento->ruta_imagen = asset('storage/' . $evento->ruta_imagen);
        }

        return inertia('Eventos/Edit', [
            'evento' => $evento,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Evento $evento)
    {
        // Validar la solicitud
        $validated = $request->validate([
            'titulo' => 'required|string:255',
            'contenido' => 'required|string:2000',
            // 'ruta_imagen' => 'nullable|mimes:jpg,png,jpeg', // Permitir que la imagen sea nula
        ]);

        if ($request->hasFile('ruta_imagen')) {
            $imagen = $request->file('ruta_imagen');
            dd($imagen);
            // Obtener el número total de galerías
            $totalEvento = Evento::count();
            $nuevoNumero = $totalEvento + 1;

            // Generar el nuevo nombre del archivo
            $extensionOriginal = $imagen->getClientOriginalExtension();
            $nombreImagen = 'evento_' . $nuevoNumero . '.' . $extensionOriginal;

            // Guardar la imagen con el nuevo nombre
            $imagen->storeAs('uploads/eventos', $nombreImagen, 'public');

            // Procesar la imagen
            $manager = new ImageManager(new Driver());
            $imageR = $manager->read(Storage::disk('public')->get('uploads/eventos/' . $nombreImagen));
            $imageR->resize(400, 600, function ($constraint) {
                $constraint->aspectRatio();
            });
            $ruta = Storage::path('public/uploads/eventos/' . $nombreImagen);
            $imageR->save($ruta);

            // Actualizar la ruta de la imagen en el registro existente
            $evento->ruta_imagen = 'uploads/eventos/' . $nombreImagen;
        }
        $evento->update([
            'titulo' => $validated['titulo'],
            'contenido' => $validated['contenido'],
            'ruta_imagen' => $evento->ruta_imagen,
        ]);
        session()->flash('message', 'El evento se ha actualizado correctamente.');
        return redirect()->route('eventos.index')->with('success', 'Imagen actualizada exitosamente.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Eliminar la imagen del almacenamiento
        $evento = Evento::findOrFail($id);
        if (Storage::exists($evento->ruta_imagen)) {
            Storage::delete($evento->ruta_imagen);
        }

        // Eliminar el registro de la base de datos
        $evento->delete();
        return response()->json(['success' => true, 'message' => 'Imagen eliminada exitosamente.']);
    }

    public function indexPublic()
    {
        $eventos = Evento::paginate(12);

        foreach ($eventos as $evento) {
            if ($evento->ruta_imagen) {
                $evento->ruta_imagen = asset('storage/' . $evento->ruta_imagen);
            }
        }

        return inertia('Eventos/Public', [
            'eventos' => $eventos,
        ]);
    }
}
