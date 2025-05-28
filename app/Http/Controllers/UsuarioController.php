<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\User;
use App\Models\Usuario_Tipo;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $users = User::with('usuario_tipo')->get();
        return Inertia::render('Usuarios/Index', ['usuarios' => $users]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        $tipos = Usuario_Tipo::all();
        return Inertia::render('Usuarios/Create', ['tipos' => $tipos]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'usuario_tipos_id' => 'required|integer',
            'apellidos' => 'required|string|max:255',
            'telefono' => 'required|integer',
            'saldo' => 'required|integer',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'nombre' => $request->nombre,
            'usuario_tipos_id' => $request->usuario_tipos_id,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified user.
     */
    public function show(User $usuario)
    {
        $usuario->load('usuario_tipo');

        return Inertia::render('Usuarios/Show', [
            'usuario' => $usuario,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $usuario)
    {
        $tipos = Usuario_Tipo::all();
        return Inertia::render('Usuarios/Edit', ['usuario' => $usuario, 'tipos' => $tipos]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        // dd($request);
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'usuario_tipos_id' => 'required|integer',
            'saldo' => 'required|numeric',
            'telefono' => 'nullable|integer', // Permitir nulo
            // 'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($request->all());
        // dd($user);
        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy($id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado con éxito'], 200);
    }

    public function conseguirTiposDeUsuarios()
    {
        $tipos = Usuario_Tipo::all();
        return $tipos;
    }

    public function pagarConSaldo(Request $request, $id)
    {
        $user = User::find($id);
        $monto = $request->input('cantidad');

        if ($user->saldo >= $monto) {
            // Restar el saldo
            $user->saldo = $monto;
            $user->save();

            // Solo devolvemos los datos relevantes
            return response()->json([
                'message' => 'Pago realizado con éxito.',
                'saldo' => $user->saldo
            ]);
        } else {
            return response()->json(['message' => 'Saldo insuficiente.'], 400);
        }
    }

}
