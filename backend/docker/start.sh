#!/bin/sh
set -e

# Render gives a base64 key without Laravel's "base64:" prefix.
case "$APP_KEY" in
  base64:*) ;;
  "") echo "APP_KEY is not set" >&2; exit 1 ;;
  *) export APP_KEY="base64:$APP_KEY" ;;
esac

# Listen on the port Render assigns (defaults to 10000).
PORT="${PORT:-10000}"
sed -ri "s/^Listen .*/Listen ${PORT}/" /etc/apache2/ports.conf
sed -ri "s/<VirtualHost \*:[0-9]+>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

php artisan config:cache
php artisan route:cache

# Create/upgrade tables, then load branches & rooms from DatabaseSeeder.
php artisan migrate --force
if [ "${SEED_ON_START:-true}" = "true" ]; then
  php artisan db:seed --force
fi

exec apache2-foreground
