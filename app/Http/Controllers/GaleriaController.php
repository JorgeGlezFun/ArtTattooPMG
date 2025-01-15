<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class GaleriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galerias = Galeria::paginate(5);

        foreach ($galerias as $galeria) {
            if ($galeria->ruta_imagen) {
                $galeria->ruta_imagen = asset('storage/' . $galeria->ruta_imagen);
            }
        }

        return inertia('Galerias/Index', [
            'galerias' => $galerias,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Galerias/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ruta_imagen' => 'mimes:jpg,png,jpeg',
        ]);

        if (isset($validated['ruta_imagen'])) {

            $imagen = $request->file('ruta_imagen');

            // Obtener el número total de tatuajes
            $totalGaleria = Galeria::count();
            $nuevoNumero = $totalGaleria + 1;

            // Generar el nuevo nombre del archivo
            $extensionOriginal = $imagen->getClientOriginalExtension();
            $nombreImagen = 'galeria_' . $nuevoNumero . '.' . $extensionOriginal;

            // Guardar la imagen con el nuevo nombre
            $imagen->storeAs('uploads/galerias', $nombreImagen, 'public');

            // Procesar la imagen
            $manager = new ImageManager(new Driver());
            $imageR = $manager->read(Storage::disk('public')->get('uploads/galerias/' . $nombreImagen));
            $imageR->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
            });
            $ruta = Storage::path('public/uploads/galerias/' . $nombreImagen);
            $imageR->save($ruta);

            // Crear el tatuaje en la base de datos con la nueva ruta de imagen
            $galeria = Galeria::create([
                'ruta_imagen' => 'uploads/galerias/' . $nombreImagen,
            ]);
        }

        session()->flash('message', 'La galeria se ha producido correctamente.');

        return redirect()->route('galerias.index')->with('success', 'Galeria creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Galeria $galeria)
    {
        if ($galeria->ruta_imagen) {
            $galeria->ruta_imagen = asset('storage/' . $galeria->ruta_imagen);
        }

        return inertia('Galerias/Show', [
            'galeria' => $galeria,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Galeria $galeria)
    {
        if ($galeria->ruta_imagen) {
            $galeria->ruta_imagen = asset('storage/' . $galeria->ruta_imagen);
        }

        return inertia('Galerias/Edit', [
            'galeria' => $galeria,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Galeria $galeria)
    {
        // Validar la solicitud
        $validated = $request->validate([
            'ruta_imagen' => 'nullable|mimes:jpg,png,jpeg', // Permitir que la imagen sea nula
        ]);

        // Verificar si se ha enviado una nueva imagen
        dd($request->file('ruta_imagen'));
        if ($request->hasFile('ruta_imagen')) {
            $imagen = $request->file('ruta_imagen');
            dd($imagen);
            // Obtener el número total de galerías
            $totalGaleria = Galeria::count();
            $nuevoNumero = $totalGaleria + 1;

            // Generar el nuevo nombre del archivo
            $extensionOriginal = $imagen->getClientOriginalExtension();
            $nombreImagen = 'galeria_' . $nuevoNumero . '.' . $extensionOriginal;

            // Guardar la imagen con el nuevo nombre
            $imagen->storeAs('uploads/galerias', $nombreImagen, 'public');

            // Procesar la imagen
            $manager = new ImageManager(new Driver());
            $imageR = $manager->read(Storage::disk('public')->get('uploads/galerias/' . $nombreImagen));
            $imageR->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
            });
            $ruta = Storage::path('public/uploads/galerias/' . $nombreImagen);
            $imageR->save($ruta);

            // Actualizar la ruta de la imagen en el registro existente
            $galeria->ruta_imagen = 'uploads/galerias/' . $nombreImagen;
        }
        $galeria->save();
        session()->flash('message', 'La galería se ha actualizado correctamente.');
        return redirect()->route('galerias.index')->with('success', 'Imagen actualizada exitosamente.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Eliminar la imagen del almacenamiento
        $galeria = Galeria::findOrFail($id);
        if (Storage::exists($galeria->ruta_imagen)) {
            Storage::delete($galeria->ruta_imagen);
        }

        // Eliminar el registro de la base de datos
        $galeria->delete();
        return response()->json(['success' => true, 'message' => 'Imagen eliminada exitosamente.']);
    }

    public function indexPublic()
    {
        $galerias = Galeria::paginate(12);

        foreach ($galerias as $galeria) {
            if ($galeria->ruta_imagen) {
                $galeria->ruta_imagen = asset('storage/' . $galeria->ruta_imagen);
            }
        }

        return inertia('Galerias/Public', [
            'galerias' => $galerias,
        ]);
    }
}
