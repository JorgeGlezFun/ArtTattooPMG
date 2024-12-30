<?php

namespace App\Http\Controllers;

use App\Models\Descanso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DescansoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los días de descanso y pasarlos a la vista de Inertia
        return Inertia::render('Descansos/Index', [
            'descansos' => Descanso::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Descansos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'fecha' => 'required|date',
        ]);
        Descanso::create($validated);
        return redirect()->route('descansos.index')->with('success', 'Día de descanso creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Descanso $descanso)
    {
        // Mostrar un día de descanso específico
        return Inertia::render('Descansos/Show', [
            'descanso' => $descanso,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Descanso $descanso)
    {
        // Mostrar el formulario de edición para un día de descanso específico
        return Inertia::render('Descansos/Edit', [
            'descanso' => $descanso,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Descanso $descanso)
    {
        $request->validate([
            'fecha' => 'required|date',
        ]);

        $descanso->update($request->only('fecha'));

        return redirect()->route('descansos.index')->with('success', 'Día de descanso actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $descanso = Descanso::findOrFail($id);
        $descanso->delete();
        return redirect()->route('descansos.index')->with('success', 'Día de descanso eliminado exitosamente.');
    }

    public function vacaciones()
    {
        $descansos = Descanso::all();
        $fechas = $descansos->map(function ($descanso) {
            return $descanso->fecha;
        });
        return response()->json($fechas);

    }
}
