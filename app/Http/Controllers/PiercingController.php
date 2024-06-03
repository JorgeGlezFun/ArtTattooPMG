<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePiercingRequest;
use App\Http\Requests\UpdatePiercingRequest;
use App\Models\Piercing;

class PiercingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePiercingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Piercing $piercing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Piercing $piercing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePiercingRequest $request, Piercing $piercing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Piercing $piercing)
    {
        //
    }
}
