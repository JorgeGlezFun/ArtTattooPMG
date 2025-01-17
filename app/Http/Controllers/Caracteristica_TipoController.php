<?php

namespace App\Http\Controllers;

use App\Models\Caracteristica_Tipo;
use Illuminate\Http\Request;

class Caracteristica_TipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $caracteristica_tipos = Caracteristica_Tipo::paginate(10);
        return Inertia('Caracteristica_Tipo/Index', [
            'caracteristica_tipos' => $caracteristica_tipos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Caracteristica_Tipo/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        Caracteristica_Tipo::create($validated);

        return redirect()->route('caracteristica_tipo.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Caracteristica_Tipo $caracteristica_tipo)
    {
        return Inertia('Caracteristica_Tipo/Show', [
            'caracteristica_tipos' => $caracteristica_tipo,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Caracteristica_Tipo $caracteristica_tipo)
    {
        return Inertia('Caracteristica_Tipo/Edit', [
            'caracteristica_tipo' => $caracteristica_tipo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Caracteristica_Tipo $caracteristica_tipo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $caracteristica_tipo->update($validated);

        return redirect()->route('caracteristica_tipo.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $caracteristica_tipo = Caracteristica_Tipo::findOrFail($id);

        $caracteristica_tipo->delete();
        return response()->json(['success' => true, 'message' => 'Tipo de característica eliminado exitosamente.']);
    }
}
