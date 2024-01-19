<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $validatedData = $request->validated();

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $accessToken = $user->createToken('API Token')->plainTextToken;

        return response()->json(['data' => $user, 'access_token' => $accessToken, 'message' => 'Registration successful'], 201);
    }

    public function login(LoginRequest $request)
    {
        $validatedData = $request->validated();

        if (!auth()->attempt($validatedData)) {
            return response()->json(['message' => 'Invalid Email Or Password'], 401);
        }

        $accessToken = auth()->user()->createToken('API Token')->plainTextToken;
        return response()->json(['data' => auth()->user(), 'access_token' => $accessToken, 'message' => 'Login successful']);
    }
}
