<h1 align="center"> Api Chat Room </h1>

## :hammer: Librerías usadas

- `nest-js`: Framework de node
- `mongoose`: Mongo DB
- `passport`: Para las sesiones
- `socket.io`: Websockets

## Comandos

```bash
# ejecutar phpstan
$ ./vendor/bin/sail composer phpstan 

# exportar comentarios
$ ./vendor/bin/sail artisan export:comments

# levantar contenedores
$ ./vendor/bin/sail up -d

# bajar contenedores
$ ./vendor/bin/sail down
```

## Requisitos

- `Docker`

## Instalación

* Clonar repositorio
* Copiar .env.example como .env
* Modificar variables de entorno
* En directorio raiz ejecutar => ./vendor/bin/sail up -d
* Correr migraciones => ./vendor/bin/sail artisan migrate
* Generar Appplication key => ./vendor/bin/sail artisan key:generate
* Entrar al contenedor con ./vendor/bin/sail root-shell
* dentro del contenedor ejecutar el comando => npm install y después npm run build

## Documentación de la api
* http://localhost:3001/docs

## URL de temporal del proyecto
http://test.devone.tech/