<?php

namespace App\Http\Controllers\Auth;

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

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'telefono' => 'required|integer',
            'saldo' => 'required|integer',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User ::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Verificar si el tipo de usuario "cliente" existe
        $tipoUsuario = Usuario_Tipo::firstOrCreate(
            ['nombre' => 'cliente'],
        );

        // Crear el cliente
        $cliente = Cliente::create([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'telefono' => $request->telefono,
            'email' => $request->email,
        ]);

        // Crear el usuario y asignar el tipo_id
        $user = User::create([
            'nombre' => $request->nombre,
            'usuario_tipos_id' => $tipoUsuario->id,
            'apellidos' => $request->apellidos,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'saldo' => $request->saldo,
            'password' => Hash::make($request->password),
            'cliente_id' => $cliente->id,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
