<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->index()->constrained()->cascadeOnDelete();
            $table->string('name', 100);
            $table->decimal('opening_balance', 12, 0);
            $table->timestamps();
        });

        $connection = Schema::getConnection();

        if ($connection->getDriverName() === 'pgsql') {
            $connection->statement(<<<'SQL'
                ALTER TABLE accounts ADD CONSTRAINT accounts_opening_balance_range
                CHECK (opening_balance BETWEEN -999999999999 AND 999999999999)
                SQL);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
