## ChatBot Whatsapp Casa Ferretera 

Solución de chat automatizado para línea de atención de Whatsapp de Casa Ferretera, realizado para la materia Sistemas de Información.

Integrantes del equipo:

- Sebastian Salazar Osorio
- Valentina Morales Villada
- Marcela Londoño Leon
- Daniel Betancur Rodriguez


El motivo de este proyecto fue resolver el problema de la gran cantidad de mensajes que deben responder los asesores dispuestos para la línea de atención del E-Commerce. La mayoría de veces, los mensajes llegan a ser repetitivos y preguntando por cosas muy triviales, por lo que los asesores se tardaban mucho para responder los mensajes de asesorías o cotizaciones. 

Con esta solución, los mensajes triviales como horarios y ubicaciones de puntos de venta, información sobre envíos e información sobre productos específicos, quedan en un primer filtro en el que se les dará respuesta inmediata. Para que los asesores puedan enfocarse en hacer su labor de asesorar y cotizar productos directamente con las personales de manera natural.

Este proyecto fue realizado con la librería @bot-whatsapp, junto con el proveedor open source de Whatsapp, Baileys. Este bot permite configurar respuestas automatizadas para preguntas frecuentes, recibir y responder mensajes de manera automatizada, y hacer un seguimiento de las interacciones con los clientes.



## Instalación y ejecución

### Requerimientos

- node v18.15.0
- git 2.39.1.windows.1

Se debe instalar tambien el npm (node package manager):

```
npm install
```

Ahora, clonamos el repositorio con el comando:

```
git clone https://github.com/vaalmo/chatbot-cf.git
```

Una vez clonado, navegamos al directorio 'base-baileys-postgres', y dentro de este ejecutamos este comando para correr el servidor:

```
npm start
```

Finalmente, vamos a escanear el código QR que se genera cada 1 minuto, dentro del Whatsapp del celular en el que vayamos a usar el bot (como si fuéramos a entrar a Whatsapp Web).

Y ahora ya tenemos el bot corriendo correctamente con el número de celular asociado al Whatsapp que usamos para escanear el código.


## Recursos

- [Documentación](https://bot-whatsapp.netlify.app/)
- [Proveedor Baileys](https://github.com/whiskeysockets/Baileys)