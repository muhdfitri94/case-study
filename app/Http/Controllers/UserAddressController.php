<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;

class UserAddressController extends Controller
{
    public function store(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'addresses_ids' => ['array', 'required']
        ]);

        $user->addresses()->sync(data_get($validatedData, 'addresses_ids'));
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'addresses_ids' => ['array', 'required']
        ]);

        $user->addresses()->detach(data_get($validatedData, 'addresses_ids'));
    }
}
