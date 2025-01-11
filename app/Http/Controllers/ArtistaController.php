<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $artistas = Artista::paginate(10);
        return Inertia::render('Artistas/Index', ['artistas' => $artistas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Artistas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
        ]);
        Artista::create($request->all());
        return redirect()->route('artistas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Artista $artista)
    {
        return Inertia::render('Artistas/Show', ['artista' => $artista]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artista $artista)
    {
        return Inertia::render('Artistas/Edit', ['artista' => $artista]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artista $artista)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
        ]);
        $artista->update($request->all());
        return redirect()->route('artistas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artista $artista)
    {
        $artista->delete();
        return redirect()->route('artistas.index');
    }
}
