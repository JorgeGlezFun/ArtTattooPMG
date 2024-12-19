<?php

namespace App\Http\Controllers;

use App\Models\Estacion;
use App\Models\Horario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estaciones = Estacion::with('horas')->get(); // Obtener todas las estaciones con sus horarios
        return Inertia::render('Estaciones/Index', [
            'estaciones' => $estaciones,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $horarios = Horario::all(); // Obtener todos los horarios para el formulario
        return Inertia::render('Estaciones/Create', [
            'horarios' => $horarios,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'nombre' => 'required|string|max:255',
            'horas' => 'array',
            'horas.*' => 'exists:horarios,id',
        ]);

        $estacion = Estacion::create($request->only('nombre'));
        // Sincronizar horarios
        $estacion->horas()->sync($request->input('horas', []));

        return redirect()->route('estaciones.index')->with('success', 'Estación creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $estacion = Estacion::with('horas')->findOrFail($id);
        return Inertia::render('Estaciones/Show', [
            'estacion' => $estacion,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $estacion = Estacion::with('horas')->findOrFail($id);
        $horarios = Horario::all();
        return Inertia::render('Estaciones/Edit', [
            'estacion' => $estacion,
            'horarios' => $horarios,
            'horariosSeleccionados' => $estacion->horas->pluck('id')->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validar los datos de entrada
        $request->validate([
            'nombre' => 'required|string|max:255',
            'horas' => 'array',
            'horas.*' => 'exists:horarios,id',
        ]);

        $estacion = Estacion::findOrFail($id); // Asegúrate de que $id es el correcto

        $estacion->update($request->only('nombre')); // Actualizar el nombre de la estación

        // Sincronizar horarios
        $estacion->horas()->sync($request->input('horas', []));

        return redirect()->route('estaciones.index')->with('success', 'Estación actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $estacion = Estacion::findOrFail($id);
        // Elimina las relaciones en la tabla intermedia
        $estacion->horas()->detach();

        // Luego elimina la estación
        $estacion->delete();

        return response()->json(['success' => true, 'message' => 'Estación eliminada exitosamente.']);
    }

    public function conseguirHorasPorEstacion(Request $request)
    {
        $estacion = $request->query('estacion');
        // Busca la estación por nombre
        $estacionEncontrada = Estacion::where('nombre', $estacion)->first();

        if (!$estacionEncontrada) {
            return response()->json(['message' => 'Estación no encontrada'], 404);
        }

        // Obtiene las horas asociadas a la estación
        $horas = $estacionEncontrada->horas()->pluck('hora');
        return response()->json(['horas' => $horas]);
    }


    public function conseguirTodasLasHoras()
    {
        // Obtiene todas las horas disponibles
        $horas = Horario::pluck('hora');
        return response()->json(['horas' => $horas]);
    }
}
