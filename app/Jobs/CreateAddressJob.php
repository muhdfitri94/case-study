<?php

namespace App\Jobs;

use App\Models\Address;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateAddressJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $request;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $validatedData = $this->request->validate([
            'floor' => ['nullable', 'string'],
            'building' => ['nullable', 'string'],
            'street' => ['required', 'string'],
            'post_code' => ['required', 'string'],
            'state_id' => ['sometimes', 'required']
        ]);

        $address = Address::create($validatedData);
    }
}
