<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SsoController extends Controller
{
    public function ssoLogin(Request $request)
    {
        try {
            $token = $request->query('token');

            if (!$token) {
                return redirect()->route('admin.auth.login');
            }
            
            // Load public key from storage/app/public/keys/advenue.pem
            $publicKey = Storage::disk('public')->get('keys/advenue.pem');
            if (!$publicKey) {
                return redirect()->route('admin.auth.login');
            }

            // Verify and decode the token
            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));

            // Check if token is expired - token is expired if current time is greater than expiration time
            if (time() > $decoded->exp) {echo 'expired';exit;
                return redirect()->route('filament.admin.auth.login')->with('error', 'SSO token has expired');
            }

            // Find or create user
            try {
                $user = User::firstOrCreate(
                    ['email' => $decoded->email],
                    [
                        'username' => $decoded->username,
                        'name' => $decoded->name,
                        'password' => bcrypt(Str::random(32)), // Random password as user will only login via SSO
                        'email_verified_at' => now(),
                        'provider' => 'advenue',
                        'provider_id' => '',
                        'status_id' => '1',
                    ]
                );

                // Log the user in
                Auth::login($user);

                // Redirect to dashboard
                return redirect()->intended(config('filament.path'));

            } catch (\Exception $e) {
                return redirect()->route('admin.auth.login');
            }

        } catch (\Exception $e) {
            return redirect()->route('admin.auth.login');
        }
    }
}