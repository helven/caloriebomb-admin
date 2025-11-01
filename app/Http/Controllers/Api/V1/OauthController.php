<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OauthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'client_id' => 'required|email',
            'client_secret' => 'required'
        ]);

        $user = User::where('email', $request->client_id)->first();

        if (!$user || !Hash::check($request->client_secret, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Enhanced device fingerprinting
        $user_agent = $request->header('User-Agent');
        $client_ip = $request->ip();
        $accept_lang = $request->header('Accept-Language', '');
        $screen_info = $request->header('Sec-CH-UA-Platform', '');

        // Create a composite fingerprint
        $device_fingerprint = md5($user_agent . $client_ip . $accept_lang . $screen_info);

        // Basic device type detection
        $device_name = 'unknown_device';
        if (strpos($user_agent, 'Mozilla') !== false) {
            if (strpos($user_agent, 'Chrome') !== false) {
                $device_name = 'chrome_' . substr($device_fingerprint, 0, 8);
            } elseif (strpos($user_agent, 'Firefox') !== false) {
                $device_name = 'firefox_' . substr($device_fingerprint, 0, 8);
            } else {
                $device_name = 'browser_' . substr($device_fingerprint, 0, 8);
            }
        } elseif (strpos($user_agent, 'PostmanRuntime') !== false) {
            $device_name = 'postman_' . substr($device_fingerprint, 0, 8);
        }

        // Delete expired tokens for this device
        $user
            ->tokens()
            ->where('name', $device_name)
            ->where('expires_at', '<=', now())
            ->delete();

        // Create new token with 24 hour expiry
        $token = $user->createToken(
            $device_name,
            ['*'],
            now()->addHours(24)
        );

        return response()->json([
            'success' => true,
            'token' => $token->plainTextToken,
            'user' => $user,
            'device' => $device_name,
            'fingerprint' => $device_fingerprint,
            'expires_at' => $token->accessToken->expires_at
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}
