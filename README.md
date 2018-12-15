# Directorio de investigadores
Tercer proyecto Modelado y Programacion 2019-1

# Integrantes Equipo 1
* Arteaga Vázquez Alan Ernesto
* Coronel Ruiz Aldair
* Farrera Ortega Cesar Augusto
* Martner Varela Ismael Lautaro
* Méndez Gallegos Ligia Natalia

## Requerimientos

* [Node js] (https://nodejs.org/es/download/)
* [MySQL Server] (https://dev.mysql.com/downloads/mysql/)
* Cuenta de sendgrid configurada al menos en el nivel gratuito y API key (https://sendgrid.com/)

### Instalacion/Ejecucion en local (modo desarrollo)

Primero clona el proyecto

```
git clone https://github.com/ModeladoYProgramacion2019-1/directorio-investigadores-backend.git
cd directorio-investigadores-backend
```

Crea el esquema de la base de datos (https://docs.rapidminer.com/latest/server/installation/creating_mysql_db.html)

En dos terminales separadas accede a

```
cd directorio-investigadores-backend/server/
```
```
cd directorio-investigadores-backend/client/
```

y en ambas ejecuta **npm install**


### Variables de entorno

En la carpeta de **/client** se necesita un archivo **.env** que contenga lo siguiente:

* **VUE_APP_NODE_ENV** Define el modo en el que se ejecuta el programa (desarrollo - produccion)
* **VUE_APP_JWT_key** Llave privada para cifrar jason web tokens
* **VUE_APP_api_url** Define la ubicacion de donde se esta ejecutando el proceso del API
* **VUE_APP_frontend_url** Define la ubicacion de donde se esta ejecutando el proceso de frontend

Y en la carpeta de **/server** se necesita un archivo **.env** que contenga lo siguiente:

* **database_username** Nombre de usuario de MySQL
* **database_password** Contraseña de MySQL
* **database_dbname** Nombre del esquema de MySQL
* **NODE_ENV** Define el modo en el que se ejecuta el programa (desarrollo - produccion)
* **JWT_key** Llave privada para cifrar jason web tokens
* **sendgrid_key** Llave de la API de sendgrid
* **api_url** Define la ubicacion de donde se esta ejecutando el proceso del API
* **frontend_url** Define la ubicacion de donde se esta ejecutando el proceso de frontend
* **verification_time** Define el tiempo que tarda en correr el CRON para borrar los registros sin completar
* **main_admin_email** Define el correo electronico que se encargara de mandar verificaciones a los nuevos usuarios


Finalmente accede a

```
cd directorio-investigadores-backend/server/
```
```
cd directorio-investigadores-backend/client/
```

y en ambas ejecuta **npm start**

La aplicacion se ejecuta en modo desarollo corriendo en localhost:8080 por omisión y la API se ejecuta en localhost:3000 por omisión.

La estructura del proyecto esta dividida en dos partes con fin de mantener el modelo MVC. Para claridad se separaron las carpetas en **client** donde se contiene la vista y **server** donde esta el modelo. El controlador serian las peticiones HTTP que se realizan para que estos se comuniquen. Se ejecutan dos servidores el que sirve la vista es un servidor HTTP simple que distribuye el codigo HTML compilado que resulta de ejecutar el comando **npm run build** como salida de ese comando se encuentran instrucciones de como levantar ese pequeño servidor HTML, este bien podria ser un apache o nginx pero no fue implementado por restricciones de tiempo. Aquel que sirve el modelo y atiende todas las peticiones HTTP del cliente es el que se ejecuta usando el framework Expressjs

Un ejemplo del archivo .env tanto para la carpeta de **client** y **server** se encuentra en el siguiente repositorio privado. https://github.com/Hylandude/Proyecto03-informacion-sensible Ahi se encuentra la llave de sendgrid utilizada para enviar correos en caso de que no quieran crear una cuenta. Asi como un archivo .pem para acceder a la instancia de AWS que esta ejecutando el proyecto de manera virtual. Esta se encuentra corriendo y ejecutando los procesos como se indica arriba.

## Errores conocidos
* La vista de reinicio de contraseña manda el correo de reinicio sinembargo no es posible completar el proceso
* La busqueda avanzada no regresa resultados
