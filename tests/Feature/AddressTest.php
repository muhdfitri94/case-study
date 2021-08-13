<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddressTest extends TestCase
{
    public function test_can_list_addresses_with_users()
    {
        Address::factory(10)
            ->has(User::factory()->count(30))
            ->create();

        $this->get(route("addresses.index"))
            ->dump()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'floor',
                    'building',
                    'street',
                    'post_code'
                ]
            ])
            ->assertSuccessful();
    }

    public function test_can_create_address()
    {
        $this->withoutExceptionHandling();

        $this
            ->post(route("addresses.store"), [
                'floor' => '15-A',
                'building' => 'Menara Satu',
                'street' => 'Jalan 123',
                'post_code' => '543321'
            ])->assertSuccessful();

        $this
            ->assertDatabaseHas('addresses', [
                'floor' => '15-A',
                'building' => 'Menara Satu',
                'street' => 'Jalan 123',
                'post_code' => '543321'
            ]);
    }

    public function test_can_update_address_details()
    {
        $address = Address::factory()->create();

        $oldStreetName = $address->street;

        $this
            ->put(route("addresses.update", $address->id), [
                'floor' => '15-A',
                'building' => 'Menara Satu',
                'street' => 'Jalan 123',
                'post_code' => '543321'
            ])->assertSuccessful();

        $address->refresh();

        $this->assertNotEquals($oldStreetName, $address->street);
    }
}
