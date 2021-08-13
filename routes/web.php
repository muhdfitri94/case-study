<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', 'dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::prefix('addresses')->group(function () {
        Route::get('/', [\App\Http\Controllers\AddressController::class, 'index'])->name('addresses.index');
        Route::post('/', [\App\Http\Controllers\AddressController::class, 'store'])->name('addresses.store');
        Route::put('/{address}', [\App\Http\Controllers\AddressController::class, 'update'])->name('addresses.update');

        Route::prefix('user-addresses')->name('user-addresses.')->group(function () {
            Route::post('/{user}', [\App\Http\Controllers\UserAddressController::class, 'store'])->name('store');
            Route::put('/{user}', [\App\Http\Controllers\UserAddressController::class, 'update'])->name('update');
        });
    });
});

require __DIR__.'/auth.php';
