# Directorio de investigadores 
Tercer proyecto Modelado y Programacion 2019-1

## Requerimientos

* [Node js] (https://nodejs.org/es/download/)
* [MySQL Server] (https://dev.mysql.com/downloads/mysql/)

### Instalacion

Primero clona el proyecto

```
https://github.com/ModeladoYProgramacion2019-1/directorio-investigadores-backend.git
```

Crea el esquema de la base de datos (https://docs.rapidminer.com/latest/server/installation/creating_mysql_db.html)

Accede a 

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
