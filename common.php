<?php

// use Twig\Environment;
// use Twig\Extension\DebugExtension;
// use Twig\Loader\FilesystemLoader;

require __DIR__ . '/vendor/autoload.php';

$isHTTPS = (!empty($_SERVER['HTTPS'] ?? '') && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? null === 'https');
$commonData = array(
  'ORG_NAME' => getenv('ORG_NAME'),
  'ORG_URL' => getenv('ORG_URL'),
  'API_KEY' => getenv('API_KEY'),
  'API_SECRET' => getenv('API_SECRET'),
  'SITE_URL' => ($isHTTPS ? 'https://' : 'http://') . ($_SERVER['HTTP_HOST'] ?? ''),
  'ADMIN_URL' => getenv('ADMIN_URL'),
  'ACCOUNT_KEY' => getenv('ACCOUNT_KEY'),
  'BRAND_ACCENT_COLOR' => str_replace('#', '', (getenv('BRAND_ACCENT_COLOR') === false) ? '3199DB' : getenv('BRAND_ACCENT_COLOR')),
  'BRAND_LOGO' => empty(getenv('BRAND_LOGO')) ? '/img/boss256.png' : getenv('BRAND_LOGO'),
  'ENVIRONMENT' => (getenv('ENVIRONMENT') === false) ? 'production' : getenv('ENVIRONMENT'),
  'STRIPE_SECRET_KEY' => getenv('STRIPE_SECRET_KEY'),
  'STRIPE_PUBLISH_KEY' => getenv('STRIPE_PUBLISH_KEY'),

);


session_start();
