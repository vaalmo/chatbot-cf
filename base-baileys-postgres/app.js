const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const PostgreSQLAdapter = require('@bot-whatsapp/database/postgres')

/**
 * Declaramos las conexiones de PostgreSQL
 */

const POSTGRES_DB_HOST = 'localhost'
const POSTGRES_DB_USER = 'postgres'
const POSTGRES_DB_PASSWORD = 'lionelmessi'
const POSTGRES_DB_NAME = 'botcf'
const POSTGRES_DB_PORT = '5432'



const flowSalir = addKeyword(['salir', 'salida', 'gracias', '6', 'Gracias', 'Gracias!', 'seis', 'Seis']).addAnswer(
    [
        'Muchas gracias por comunicarte y confiar en nosotros 😁',
    ]
)


const flowAsesoria = addKeyword(['asesoria', 'asesor', 'asesoría',  '3', 'tres', 'Tres']).addAnswer(
    ['Cuéntame qué producto necesitas o en qué podría asesorarte.']
)




const flowSoldador = addKeyword(['soldador', 'Soldador', 'zoldador']).addAnswer(
    [
        'Por favor responde a las siguientes preguntas para ayudarte con tu compra.',
        '¿Para qué tipo de proceso de soldadura lo necesita MIG, TIG o electrodo?',
        '¿Alguna marca o amperaje en especial?',
        '¿Lo requiere para uso ocasional, semi industrial o industrial?',
        'Por favor validar tiempo estimado de trabajo en horas y días.'
    ]
)



const flowCompresor = addKeyword(['compresor', 'Compresor', 'comprezor']).addAnswer(
    [
        'Por favor responde a las siguientes preguntas para ayudarte con tu compra.',
        '¿Para qué tipo de trabajo lo necesita?',
        '¿Lo requiere para uso ocasional, semi industrial o industrial?',
        '¿Qué equipos o herramientas le va a conectar?',
        'Por favor validar tiempo estimado de trabajo en horas y días.'
    ]
)


const flowProducto = addKeyword(['Siguiente', 'siguiente', 'sigiente']).addAnswer(
    [
    'Escoge una de las siguientes acciones que quisieras realizar, escribiendo la primera palabra clave',
    '👉 *soldador* el tipo de producto que deseo comprar es soldador',
    '👉 *compresor* el tipo de producto que deseo comprar es compresor',
    '👉 *asesoría* quisiera hablar con un asesor, para pedirle un producto específico',

    ],
    null,
    null,
    [flowAsesoria, flowSoldador, flowCompresor]
)

const flowCompra = addKeyword(['compra', 'comprar', 'Compra', '1', 'uno', 'Uno']).addAnswer(
    [
        'Ingresando al enlace compartido podrá validar nuestro amplio portafolio.',
        'https://www.casaferretera.com/',
        '\n*Siguiente* Deseo hacer la compra por este medio.',
        '\n*Gracias* Voy a realizar la compra en la página, salir del chat con el asistente.'
    ],
    null,
    null,
    [flowProducto, flowSalir]
)


const flowCotizacion = addKeyword(['cotizacion', 'cotización', 'Cotización', 'cotisasion', 'Cotizacion', 'cotizasion', 'cotisacion',  '2', 'dos', 'Dos'])
    .addAnswer('Si requiere una cotización formal 📑 por favor solicitar el requerimiento en las siguientes líneas de atención. 📲 3207975653 o al 📞 604 4442388 ext. 4752')
    


const flowPuntoVentaTodas = addKeyword(['todas', 'toda', 'sedes', 'puntos', 'Todas', 'Toda', 'Sedes', 'Puntos'])
    .addAnswer('Tenemos los siguientes puntos de venta ubicados en Medellín: ')  
    .addAnswer(
    ['SECTOR CENTRO: ',
    '',
    'Punto de venta AMADOR',
    'Dirección: Carrera 51 #45-10 ',
    'Número de whatsapp: 3113010398',
    'Horario de atención:',
    'Lunes a viernes de 7:00am a 6:00pm',     
    'Sábado de 7:30am a 4:00pm',])
    .addAnswer(
    ['Punto de venta CENTRO',
    'Dirección: Carrera 48 #42-101 ',
    'Número de whatsapp: 3207975653',
    'Horario de atención:',
    'Lunes a viernes de 7:00am a 5:00pm',
    'Sábado de 7:30am a 2:00pm',])
    .addAnswer(
    ['Punto de venta PALACÉ',
    'Dirección: Carrera 50 #42-90 ',
    'Número de whatsapp: 3218312125',
    'Horario de atención:',
    'Lunes a viernes de 7:00am a 5:30pm',  
    'Sábado de 7:30am a 4:00pm',])
    .addAnswer(
        ['SECTOR AMÉRICA: ',
        '',
        'Punto de venta AMÉRICA',
        'Dirección: Carrera 84 #43-38 ',
        'Número de whatsapp: 3202581910',
        'Horario de atención:', 
        'Lunes a viernes de 7:00am a 5:30pm', 
        'Sábado de 7:30am a 3:00pm',])
    .addAnswer(
        ['SECTOR SUR: ',
        '',
        'Punto de venta ITAGÜÍ',
        'Dirección: Carrera 51A #46-44 ',
        'Número de whatsapp: 3102195037',
        'Horario de atención:', 
        'Lunes a viernes de 7:00am a 5:30pm',     
        'Sábado de 7:30am a 3:00pm',])
    .addAnswer([
        'Punto de venta ENVIGADO',
        'Dirección: Carrera 37 sur #39-40 ',
        'Número de whatsapp: 3207221553',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:30pm',
        'Sábado de 7:30am a 4:00pm',])
    .addAnswer(
        ['SECTOR ORIENTE ANTIOQUEÑO: ',
        '',
        'Punto de venta LA CEJA',
        'Dirección: Carrera 27 #15-07 ',
        'Número de whatsapp: 3235689613',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:00pm',
        'Sábado de 7:30am a 3:00pm',])
    .addAnswer([
        'Punto de venta RIONEGRO',
        'Dirección: Carrera 56 #39-40 ',
        'Número de whatsapp: 3207221553',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:30pm',
        'Sábado de 7:30am a 4:00pm',
        ])
    .addAnswer(
        ['SECTOR URABÁ ANTIOQUEÑO: ',
        '',
        'Punto de venta APARTADÓ',
        'Dirección: Carrera 101 #96-30 ',
        'Número de whatsapp: 3202581900',
        'Horario de atención:', 
        'Lunes a viernes de 7:00am a 5:00pm', 
        'Sábado de 7:30am a 1:00pm',])
    





const flowPuntoVentaCentro = addKeyword(['1','Uno','uno','Centro','centro'])
    .addAnswer('Tenemos los siguientes puntos de venta ubicados en Medellín: ')  
    .addAnswer(
        ['SECTOR CENTRO: ',
        '',
        'Punto de venta AMADOR',
        'Dirección: Carrera 51 #45-10 ',
        'Número de whatsapp: 3113010398',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 6:00pm',     
        'Sábado de 7:30am a 4:00pm',])
    .addAnswer(
        ['Punto de venta CENTRO',
        'Dirección: Carrera 48 #42-101 ',
        'Número de whatsapp: 3207975653',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:00pm',
        'Sábado de 7:30am a 2:00pm',])
    .addAnswer(
        ['Punto de venta PALACÉ',
        'Dirección: Carrera 50 #42-90 ',
        'Número de whatsapp: 3218312125',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:30pm',  
        'Sábado de 7:30am a 4:00pm',])
        

const flowPuntoVentaAmerica = addKeyword(['2','Dos','dos','America','america','La America','La america','la America','la america'])
    .addAnswer('Tenemos los siguientes puntos de venta ubicados en Medellín: ')
    .addAnswer(
        ['SECTOR AMÉRICA: ',
        '',
        'Punto de venta AMÉRICA',
        'Dirección: Carrera 84 #43-38 ',
        'Número de whatsapp: 3202581910',
        'Horario de atención:', 
        'Lunes a viernes de 7:00am a 5:30pm', 
        'Sábado de 7:30am a 3:00pm',])
    

const flowPuntoVentaSur = addKeyword(['3','Tres','tres','Sur','Itagui','Itagüí','sur','itagui','itagüí','Itagüi','itagüi','Envigado','envigado'])
    .addAnswer('Tenemos los siguientes puntos de venta ubicados en el sur del Vallé de Aburrá: ')  
    .addAnswer(
        ['SECTOR SUR: ',
        '',
        'Punto de venta ITAGÜÍ',
        'Dirección: Carrera 51A #46-44 ',
        'Número de whatsapp: 3102195037',
        'Horario de atención:', 
        'Lunes a viernes de 7:00am a 5:30pm',     
        'Sábado de 7:30am a 3:00pm',])
    .addAnswer([
        'Punto de venta ENVIGADO',
        'Dirección: Carrera 37 sur #39-40 ',
        'Número de whatsapp: 3207221553',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:30pm',
        'Sábado de 7:30am a 4:00pm',])
        


const flowPuntoVentaOrienteAnt = addKeyword(['4','Cuatro','cuatro','oriente','Oriente','Rionegro','rionegro','Rio negro','rio negro','Porvenir','porvenir','ceja','Ceja','Llanogrande','llanogrande','Guarne',
'guarne','el retiro','El Retiro','Retiro','retiro','Marinilla','marinilla'])
    .addAnswer('Tenemos los siguientes puntos de venta ubicados en el Oriente Antioqueño: ')  
    .addAnswer(
        ['SECTOR ORIENTE ANTIOQUEÑO: ',
        '',
        'Punto de venta LA CEJA',
        'Dirección: Carrera 27 #15-07 ',
        'Número de whatsapp: 3235689613',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:00pm',
        'Sábado de 7:30am a 3:00pm',])
    .addAnswer([
        'Punto de venta RIONEGRO',
        'Dirección: Carrera 56 #39-40 ',
        'Número de whatsapp: 3207221553',
        'Horario de atención:',
        'Lunes a viernes de 7:00am a 5:30pm',
        'Sábado de 7:30am a 4:00pm',
        ])



const flowPuntoVentaUraba = addKeyword(['5','Cinco','cinco','Urabá','urabá','Uraba','urabá','Apartadó','apartadó','Apartado','apartado','Chigorodó','Chigorodo'])
    .addAnswer('Tenemos los siguientes puntos de venta ubicados en el Urabá Antioqueño: ') 
    .addAnswer(
        ['SECTOR URABÁ ANTIOQUEÑO: ',
        '',
        'Punto de venta APARTADÓ',
        'Dirección: Carrera 101 #96-30 ',
        'Número de whatsapp: 3202581900',
        'Horario de atención:', 
        'Lunes a viernes de 7:00am a 5:00pm', 
        'Sábado de 7:30am a 1:00pm',])


const flowPuntoVentaCerca = addKeyword(['Cerca', 'cerca', 'serca', 'Serca', 'Ciudad', 'Departamento', 'ciudad', 'departamento','antioquia'])
    .addAnswer(
        ['En que departamento y ciudad se ubica?🌎 Ingrese el número correspondiente:',
        '1. Sector Centro Medellín',
        '2. Sector La América',
        '3. Sector Sur Vallé de Aburrá',
        '4. Sector Oriente Antioqueño',
        '5. Sector Urabá',
        'Estas son los sectores que manejamos en el momento. Gracias por confiar en nosotros!',],
    null,
    null,
    [flowPuntoVentaCentro,flowPuntoVentaAmerica,flowPuntoVentaSur,flowPuntoVentaOrienteAnt,flowPuntoVentaUraba])

const flowPuntoVenta = addKeyword(['Puntos', 'puntos', 'punto', 'Punto', 'Sede', 'sede', 'venta', 'Venta','sedes', 'Sedes', 'punto de venta', 'punto venta', '4', 'cuatro', 'Cuatro'])
    .addAnswer(
        ['Deseas saber todas las sedes que tenemos o si hay alguna sede cerca de ti:', 
        'Escriba *todas* para consultar todas las sedes',
        'Escriba *cerca* para ver las sedes cerca de ti',],
        null,
        null,
        [flowPuntoVentaTodas, flowPuntoVentaCerca]
)




const flowEnvio = addKeyword(['envio', 'enbio', 'envíos', 'envío', 'Envíos', 'Envío', 'enbíos', '5', 'cinco', 'Cinco'])
    .addAnswer('Si claro realizamos envíos 🚚🏍️ nacionales y locales, nuestro centro de operación es en Medellín Antioquia y también contamos con 9 puntos de venta.')
    .addAnswer('En compras por nuestra página WEB 📲🛒💻 tenemos como política 8 días hábiles o antes para la entrega 🚛 🏍️ después de ser emitida la factura.')
    .addAnswer('El valor del envío🌎⚡✈️🚚🏍️ varía dependiendo de la ubicación, marca y tipo de producto🛠️⚙️🪛.') 


const flowPrincipal = addKeyword(['hola', 'ola', 'buenas', 'buenaz', 'Buenas', 'vuenaz', 'Donde', 'Dónde','donde', 'dónde', 'cuándo', 'cuando'])
    .addAnswer(
        [
            'Hola 😁',
            'Buen día, bienvenid@ a la línea de atención E-commerce 📲🖥️🛒 de CASA FERRETERA SAS 🛠️⚙️🪛',
            'Soy su asesor Jorge Rendón 🙋🏻‍♂️',
            'Escoge una de las siguientes acciones que quisieras realizar, escribiendo el número correspondiente a la acción (ejemplo. Escribe 1, si quieres realizar una compra.)',
            '👉 *1* desea realizar una compra?',
            '👉 *2* quisiera solicitar cotización formal?',
            '👉 *3* quisiera hablar con un asesor?',
            '👉 *4* desea conocer información sobre los puntos de venta?',
            '👉 *5* desea conocer información sobre los envíos',
            '👉 *6* salir del chat con el asistente.',
            
        ],
        null,
        null,
        [flowCompra, flowCotizacion, flowAsesoria, flowPuntoVenta, flowEnvio, flowSalir]
    )




const main = async () => {
    const adapterDB = new PostgreSQLAdapter({
        host: POSTGRES_DB_HOST,
        user: POSTGRES_DB_USER,
        database: POSTGRES_DB_NAME,
        password: POSTGRES_DB_PASSWORD,
        port: POSTGRES_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
