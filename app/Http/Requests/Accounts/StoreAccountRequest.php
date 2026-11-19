<?php

namespace App\Http\Requests\Accounts;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'opening_balance' => ['bail', 'required', 'string', 'regex:/\A(?:0|-?[1-9][0-9]{0,11})\z/'],
        ];
    }

    public function messages(): array
    {
        return [
            'opening_balance.string' => 'Enter the opening balance as a whole-yen string.',
            'opening_balance.regex' => 'Enter a whole-yen amount using up to 12 digits, an optional minus sign, and no leading zeros.',
        ];
    }
}
