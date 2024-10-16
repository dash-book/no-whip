# Instrucciones de la Prueba Técnica

## Descripción

Este proyecto está diseñado como parte de una prueba técnica para el puesto de **Senior Frontend Developer**. El objetivo es evaluar las habilidades de desarrollo, uso de **React** y **TypeScript**, y la capacidad de crear interfaces de usuario utilizando **Ant Design**.

## Requisitos

- Node.js v14 o superior
- npm o yarn

## Instalación

Sigue estos pasos para instalar el proyecto:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/repo.git

   ```

2. Instala dependencias

````bash
 npm install

3. Ejecuta el backend
```bash
 npm run dev:server

4. Ejecuta el frontend
```bash
 npm run dev:client

## Acerca de la prueba

Esta prueba NO es un examen. No nos interesa que respondas de forma correcta a todas las preguntas. Los ejercicios planteados son meras excusas para comprobar tu forma de programar y "conocer" un poco tu código. Si hay alguna parte que hayas tenido tiempo de terminar, explícala al final de este README y cuéntanos cómo lo harías si tuvieras tiempos y otros recursos.

1.DONE  **Login**: Añade un sistema de login para conectarse a la aplicación. Existe un endpoint (/api/login) que recibe un usuario y contraseña y devuelve un "Login successful" si el usuario es correcto. Puedes ver la lista de usuarios y contraseñas en el archivo server/server.js. El backend no tiene un sistema de tokens ni nada parecido para validar el login. No es necesario implementarlo.
2.DONE **Estilos por defecto de AntD**: Modifica los estilos por defecto de AntD para que se adapten a los colores definidos en las variables.
3. **Refactoriza componentes**: Refactoriza los componentes que consideres oportunos.
4. **Modifica la interfaz**: Modifica la interfaz de la página "Audit" para hacerla más visual, intuitiva y moderna.
5. **Cada empleado solo puede ver sus horas**: Modifica la pantalla TrackingPage de modo que cada empleado solo pueda ver sus propias horas (a partir del usuario logeado).
6. **Calcula el tiempo trabajado por día**: En el listado de horas calcula el tiempo trabajado por día a partir de la fecha y hora de entrada y la fecha y hora de salida.
8. **Revisa los formularios referentes al usuario**: Revísalos y componetiza lo que consideres.
7. **Añade test a la aplicación**: No es necesario que testees toda la aplicación. Haz los test que consideres más importantes
8. **Corrige errores**: Corrige los bugs que detectes.
9. **Lúcete**: Revisa la aplicación y mejora la parte que quieras. Busca el apartado donde mejor puedas lucir tus cualidades y adelante. Acuérdate de explicar luego en el README lo que has hecho.

## Explicaciones del candidato
Aquí puedes explicar lo que has hecho y lo que harías si fuera un proyecto real y tuvieras más tiempo.
````

Para el sistema de login, He creado un pagina para el login, con el formulario isolado por si se quiere reutilizar en un futuro en un modal por ejemplo.

Para controlar a nivel global si un usuario está logeado he creado un context, que nos ayuda en el sistema de rutas, he añadido que un usuario si no está logeado no pueda acceder al sistema. Este context crea una cookie para poder controlar el tema de la expiracion,aunque lo ideal seria montarlo con un JWT y que tengamos la info dentro de un hash, podemos acceder a la info en cualquier componente o hook con el hook que he creado de **useAuth** .

El formulario tiene validaciones básicas (campos requeridos ) . Enviamos por POST la contraseña sin cifrar ni nada, no vamos a hacer esto con un producto en vivo.

Añadí el controlador por si la api da error, como por ejemplo si el usuario/contraseña no es correcto. EN este punto, lo ideal no es indicar que parte ha fallado, por motivos de seguridad y evitar ataques de fuerza bruta si damos la info de que un usuario existe o no por ejemplo, lo ideal es un mensaje más global.

He hecho refactor conforme iba accediendo a nuevas partes de la aplicación. Por ejemplo, he creado una constante que alberga todas las rutas de la api y de las paginas de la aplicación, ya que son valores que repetimos bastante en la aplicación y ayudará a nivel de escalabilidad tenerlo bein estructurado en un solo punto de verdad.

Sobre el segundo punto, cambié en los lugares que era necesario y que utilizaba por defecto colores hexagesimales por las variables de nuestros colores del tema corporativo ( lo ideal sería tener alguna gama más, para poder jugar con las tonalidades con las interacciones (hovers, actives,etc)). He creado también para controlar de forma general la paleta de colores de Antd un archivo que modifica los colores que usa por defecto los componentes de antd, reduciendo mucho el trabajo de editar o crear wrappers customizados para estilar los compoenntes de antd, está dentro la carpeta de styles y se importa en el provider en App.

He refactorizado la pgina de la lista de usuarios, añadido las calls a la carpeta API con todos los métodos. He quitado toda la logica del archivo de Page, ahora employeeTable tiene su carpeta en componentes y dejamos libres el archivo de la página para solo logica de la página ( posibles, validadiones, metadata de la pagina, etc). He separado la loggica de la tabla de la del formulario, ahora cada uno tiene su archivo y es más legible (y más corto). Se podría atomizar más, pero he decidido seguir adelante con el resto de puntos. Sobre los formualrios, he fixeado un par de cosas, como el selector de roles, que tenia un placeholder pero ningun valor, lo he dejado en blanco para que el usuario pueda elegir entre las opciones.
