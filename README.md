# Commerce API REST

## Instalación

- configurar el fichero /config/config.js, según las necesidades del proyecto y el entorno. En config.js definiremos el puerto, la url de la BBDD, la expiracion del token y la clave seed para la generación de los tokens.
- ```npm install```
- ```npm run dev``` para desarollo (nodemon)
- ```npm start``` para producción

## Entorno de desarrollo

En la carpeta /data en la raiz del proyecto se han exportados datos de ejemplo para poder importarlos en entornos de desarrollo. 

## Documentación

Todos los endpoints estan documentados en /api-docs dentro de la aplicación

## Consideraciones

Ningún metodo delete elimina físicamente el registro de la base de datos. Los productos tiene un campo booleano 'available' y los usuarios un campo 'status', donde se marca como true o false si esta activo o no. 


