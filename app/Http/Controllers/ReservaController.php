<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\Artista;
use App\Models\Tatuaje;
use App\Models\Piercing;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class ReservaController extends Controller
{
    public function create()
    {
        $clientes = Cliente::all();
        $artistas = Artista::all();
        $horasDisponibles = $this->getHorasDisponibles();

        return Inertia::render('Reservas/Create', [
            'clientes' => $clientes,
            'artistas' => $artistas,
            'horasDisponibles' => $horasDisponibles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'artista_id' => 'required|exists:artistas,id',
            'fecha' => 'required|date|after_or_equal:today',
            'hora' => 'required',
            'tipo_reserva' => 'required|in:tatuaje,piercing',
            'tatuaje_id' => 'nullable|exists:tatuajes,id',
            'piercing_id' => 'nullable|exists:piercings,id',
        ]);

        $fechaHora = Carbon::createFromFormat('Y-m-d H:i', "{$request->fecha} {$request->hora}");

        // Validar que la hora no esté ocupada
        if ($this->isHoraOcupada($fechaHora, $request->artista_id)) {
            return back()->withErrors(['hora' => 'Esta hora ya está reservada.']);
        }

        $reserva = new Reserva([
            'cliente_id' => $request->cliente_id,
            'artista_id' => $request->artista_id,
            'fecha' => $request->fecha,
            'hora' => $request->hora,
        ]);

        if ($request->tipo_reserva === 'tatuaje' && $request->tatuaje_id) {
            $reserva->tatuaje_id = $request->tatuaje_id;
        } else if ($request->tipo_reserva === 'piercing' && $request->piercing_id) {
            $reserva->piercing_id = $request->piercing_id;
        }

        $reserva->save();

        return redirect()->route('reservas.create')->with('success', 'Reserva creada con éxito.');
    }

    private function isHoraOcupada($fechaHora, $artista_id)
    {
        return Reserva::where('artista_id', $artista_id)
            ->where('fecha', $fechaHora->toDateString())
            ->where('hora', $fechaHora->toTimeString())
            ->exists();
    }

    private function getHorasDisponibles()
    {
        $horas = [
            '11:30', '12:30', '13:30',
            '18:00', '19:00', '20:00', '21:00',
        ];

        $horasDisponibles = [];

        for ($i = 0; $i < 7; $i++) {
            $fecha = Carbon::today()->addDays($i);

            if ($fecha->isWeekend()) {
                if ($fecha->isSaturday()) {
                    $horasDisponibles[$fecha->toDateString()] = ['11:30', '12:30', '13:30'];
                } else {
                    $horasDisponibles[$fecha->toDateString()] = [];
                }
            } else {
                $horasDisponibles[$fecha->toDateString()] = $horas;
            }
        }

        $reservas = Reserva::where('fecha', '>=', Carbon::today()->toDateString())->get();

        foreach ($reservas as $reserva) {
            if (($key = array_search($reserva->hora, $horasDisponibles[$reserva->fecha])) !== false) {
                unset($horasDisponibles[$reserva->fecha][$key]);
            }
        }

        return $horasDisponibles;
    }
}
