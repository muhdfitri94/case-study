<?php

namespace Tests\Feature;

use App\Models\Address;
use Tests\TestCase;

class UserAddressTest extends TestCase
{
    protected $addresses;
    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        $this->addresses = Address::factory(5)->create();
    }

    public function test_user_can_be_assigned_to_addresses()
    {
        $this
            ->post(route("user-addresses.store", $this->user->id), [
                'addresses_ids' => $this->addresses->pluck('id')->toArray()
            ])->assertSuccessful();

        $this->user->refresh();
        $this->assertCount(5, $this->user->addresses);
    }

    public function test_user_can_update_assigned_addresses()
    {
        $this->user->addresses()->sync($this->addresses->pluck('id')->toArray());

        $this->user->refresh();

        $this->assertCount(5, $this->user->addresses);

        $this
            ->put(route("user-addresses.update", $this->user->id), [
                'addresses_ids' => [$this->addresses->first()->id]
            ]);

        $this->user->refresh();

        $this->assertNotSame($this->user->addresses->count(), 5);
    }
}