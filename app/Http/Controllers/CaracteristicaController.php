<?php

namespace App\Http\Controllers;

use App\Models\Caracteristica;
use App\Models\Caracteristica_Tipo;
use Illuminate\Http\Request;

class CaracteristicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $caracteristicas = Caracteristica::with(['caracteristica_tipo'])->get();
        return Inertia('Caracteristicas/Index', [
            'caracteristicas' => $caracteristicas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tipos = Caracteristica_Tipo::all();
        return Inertia('Caracteristicas/Create', ['tipos' => $tipos]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'caracteristica_tipos_id' => 'required|exists:caracteristica_tipos,id',
            'nombre' => 'required|string:255',
            'precio' => 'required|numeric',
            'tiempo' => 'required|numeric',
        ]);

        Caracteristica::create($validated);

        return redirect()->route('caracteristicas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Caracteristica $caracteristica)
    {
        return Inertia('Caracteristicas/Show', [
            'caracteristica' => $caracteristica,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Caracteristica $caracteristica)
    {
        $tipos = Caracteristica_Tipo::all();
        return Inertia('Caracteristicas/Edit', ['caracteristica' => $caracteristica, 'tipos' => $tipos]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Caracteristica $caracteristica)
    {
        $validated = $request->validate([
            'caracteristica_tipos_id' => 'required|exists:caracteristica_tipos,id',
            'nombre' => 'required|string:255',
            'precio' => 'required|numeric',
            'tiempo' => 'required|numeric',
        ]);

        $caracteristica->update($validated);

        return redirect()->route('caracteristicas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $caracteristica = Caracteristica::findOrFail($id);

        $caracteristica->delete();
        return response()->json(['success' => true, 'message' => 'Característica eliminada exitosamente.']);
    }

    public function conseguirTodasLasCaracteristicas()
    {
        $caracteristicas = Caracteristica::all();
        return response()->json($caracteristicas);
    }
}
