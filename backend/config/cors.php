<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['GET', 'POST', 'OPTIONS'],
    // FRONTEND_URL may be a comma-separated list; a bare host name gets https:// added.
    'allowed_origins' => array_map(
        fn ($origin) => str_contains($origin, '://') ? rtrim($origin, '/') : 'https://'.$origin,
        array_filter(array_map('trim', explode(',', env('FRONTEND_URL', 'http://localhost:3000')))),
    ),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 3600,
    'supports_credentials' => false,
];
