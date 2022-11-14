# cucarachas

First run docker containers

Then go to mongosh cli

type `use admin`

then type `db.auth(‘username’,’password’)` -which are at the docker-compose yaml file-

then `use cucarachas`

and finally we create the user with its permissions:

`db.createUser({ user:'jamon',pwd:'pass', roles:[{role:'readWrite',db:'cucarachas'}]})`

dev notes:

— Como hacemos el SSR —



1 - when we receive a request, it stores in res.reactComponent the “AppString”, that creates a store (redux), the component the we want (e.g “Articles”) and send all that to “renderHtml”



2 - renderHtml will put the component inside a div with id = “root” and the store in window.__PRELOAD_STATE__ . All this html is what will be sent initially the browser.



3 - but the trick is that this html has <script src=“react.bundle.js”>, este bundle ha sido creado por webpack, a partir del archivo client/src/index.js



4 - este client/src/index.js crea su store de la misma manera que en AppString. Pero ademas, una vez que ha creado la store, borra window.__PRELOADED_STATE__. Y encima de eso, aqui tenemos todas las rutas de “react-router-dom”. Como lo servimos todo con un “hydrate” de React (que reemplaza lo que hay dentro de “root”), pues este “script” reemplazara lo que hay dentro de “root” (todo lo que teniamos antes) y ahora ya podemos hacer lo que nos de la gana



— Como aplicarle estilos a esto —



La idea seria utilizar css-modules. Para eso vas a tener que ver como hacerlo con webpack, my friend. Por otra parte… queremos hacer eso? Me da a mi que lo suyo seria que los estilos estuvieran ya aplicados cuando bajan la primera vez…. hummmmm, vamos a ver, vamos a ver,…. quizas seria lo suyo que webpack creara un bundle de cada component….? vamos a leernos las docu de webpack bien…



notas sobre webpack:



conceptos basicos:



entry: el path al archivo que webpack utilizara como inicio de su dependency graph. De ahi webpack ya se imagina que archivos dependen de el y hace toda la dependency graph.


output: le dice a webpack donde crear el bundle (o los bundles) y como llamarlo/s.


loaders: Como webpack solo entiende js y JSON, los loaders convierten otros lenguajes (css,… lo que sea) y los convierte en “modules” que pueden ser consumidos por webpack. Los loaders tienen dos propiedades: “test” => el tipo de archivos que tienen que ser transformados, y “use” => el loader para esos archivos. Un ejemplo:


  module: {

    rules: [{ test: /\.txt$/, use: 'raw-loader' }],

  },

plugins: Mientras que los loaders transforman, los plugins pueden hacer mucho mas, como bundle optimization, asset management e injection of env variables. Los plugins necesitan que los “require” y luego que los metas en el array “plugins”. Un ejemplo:

plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],

** echale un ojito al html-webpack-plugin este

mode: puede ser “development”, “production” o “none”. cada uno le dice a webpack cual es el ratio tiempo-en-crear-bundle / tamano-bundle
