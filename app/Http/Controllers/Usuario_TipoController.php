<?php

namespace App\Http\Controllers;

use App\Models\Usuario_Tipo;
use Illuminate\Http\Request;

class Usuario_TipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuario_tipos = Usuario_Tipo::paginate(10);
        return Inertia('Usuario_Tipo/Index', [
            'usuario_tipos' => $usuario_tipos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Usuario_Tipo/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        Usuario_Tipo::create($validated);

        return redirect()->route('usuario_tipo.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario_Tipo $usuario_tipo)
    {
        return Inertia('Usuario_Tipo/Show', [
            'usuario_tipos' => $usuario_tipo,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario_Tipo $usuario_tipo)
    {
        return Inertia('Usuario_Tipo/Edit', [
            'usuario_tipo' => $usuario_tipo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario_Tipo $usuario_tipo)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $usuario_tipo->update($validated);

        return redirect()->route('usuario_tipo.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $usuario_tipo = Usuario_Tipo::findOrFail($id);

        $usuario_tipo->delete();
        return response()->json(['success' => true, 'message' => 'Tipo de usuario eliminado exitosamente.']);
    }
}
