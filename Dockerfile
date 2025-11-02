FROM php:8.3-apache-bullseye

RUN apt-get update \
    && apt-get install -y libzip-dev unzip zlib1g-dev curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install mysqli pdo pdo_mysql zip bcmath \
    && a2enmod rewrite headers

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install --no-dev --optimize-autoloader

RUN npm install

RUN npm run build

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

RUN { \
    echo "log_errors = On"; \
    echo "error_log = /dev/stderr"; \
    echo "error_reporting = E_ALL"; \
} > /usr/local/etc/php/conf.d/logging.ini

EXPOSE 80

CMD ["apache2-foreground"]
