<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Account extends Model
{
    protected $fillable = [
        'name',
        'opening_balance',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function currentBalance(): string
    {
        return $this->opening_balance;
    }

    protected function casts(): array
    {
        return [
            'opening_balance' => 'decimal:0',
        ];
    }
}
