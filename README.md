
# Llenado con chat gpt de entidades 

Se crea api con metodo GET para consumir la api de chat gpt y insertar cada entidad con base a la respuesta, se pide que retorne object con las propiedades del insert que necesita cada entidad, si la respuesta que se recibe no es correcta no se inserta la entidad



## Instalación

Decargar el proyecto y correr los siguientes comandos

```bash
  git clone https://github.com/alejandrovalencias/talen-gpt.git
  cd talen-gpt
  npm install 
  npm start
```
    
## Api en NodeJs con express

 - [Se usa render.com para desplegar la api](https://render.com/)
  - [Url para consumir la api](https://talen-gpt.onrender.com/api/gpt/)




## Nota

- http://localhost:3000/api/gpt?cha=0&com=0&pro=0
- https://talen-gpt.onrender.com/api/gpt?cha=0&com=0&pro=0

los parametros
- chat = challenges
- com = companies
- pro = programs
Son todos opcionales, si no se envian siempre va a generar el insert para la entidad, si se envian con un valor diferente a 1, no generará el insert de esa entidad, la unica entidad que siempre genera insert es users



