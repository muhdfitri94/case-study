<?php

namespace App\Http\Controllers;

use App\Events\AddressCreated;
use App\Http\Resources\AddressResource;
use App\Jobs\CreateAddressJob;
use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AddressController extends Controller
{
    public function index(Request $request)
    {
        return AddressResource::collection(Address::with('users')->get())
            ->additional([
                'title' => 'List of Address'
            ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'floor' => ['nullable', 'string'],
            'building' => ['nullable', 'string'],
            'street' => ['required', 'string'],
            'post_code' => ['required', 'string'],
            'state_id' => ['sometimes', 'required']
        ]);

        CreateAddressJob::dispatch($request);

        return response()->json(['status' => 'success']);
    }

    public function update(Request $request, Address $address)
    {
        $validatedData = $request->validate([
            'floor' => ['nullable', 'string'],
            'building' => ['nullable', 'string'],
            'street' => ['required', 'string'],
            'post_code' => ['required', 'string'],
            'state_id' => ['sometimes', 'required']
        ]);

        $address->update($validatedData);

        return response()->json(['status' => 'success']);
    }
}
