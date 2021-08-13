<?php

namespace App\Listeners;

use App\Events\AddressCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class TestListener implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(AddressCreated $addressCreated)
    {
        $addressCreated->user->notify(new NotifyAddressCreated());
    }
}
