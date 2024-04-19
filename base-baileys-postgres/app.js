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

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */


const flowSalir = addKeyword(['salir', 'salida', 'gracias']).addAnswer(
    [
        'Muchas gracias por comunicarte y confiar en nosotros 😁',
    ]
)


const flowAsesoria = addKeyword(['asesoria', 'asesor', 'asesoría']).addAnswer(
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

const flowCompra = addKeyword(['compra', 'comprar', 'Compra']).addAnswer(
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


const flowCotizacion = addKeyword(['cotizacion', 'cotización', 'Cotización', 'cotisasion', 'Cotizacion', 'cotizasion', 'cotisacion'])
    .addAnswer('Si requiere una cotización formal 📑 por favor solicitar el requerimiento en las siguientes líneas de atención. 📲 3207975653 o al 📞 604 4442388 ext. 4752')
    


const flowPuntoVentaTodas = addKeyword(['todas', 'toda', 'sedes', 'puntos', 'Todas', 'Toda', 'Sedes', 'Puntos'])
    .addAnswer({
        media: 'C:/Users/USUARIO/Documents/Code/chatbot-cf/base-baileys-postgres/puntos_venta.png'
    })


const flowPuntoVentaCerca = addKeyword(['Cerca', 'cerca', 'serca', 'Serca', 'Ciudad', 'Departamento', 'ciudad', 'departamento','antioquia'])
    .addAnswer('En que departamento y ciudad se ubica?🌎')   


const flowPuntoVenta = addKeyword(['Puntos', 'puntos', 'punto', 'Punto', 'Sede', 'sede', 'venta', 'Venta','sedes', 'Sedes', 'punto de venta', 'punto venta',])
    .addAnswer(
        ['Deseas saber todas las sedes que tenemos o si hay alguna sede cerca de ti:', 
        'Escriba *todas* para consultar todas las sedes',
        'Escriba *cerca* para ver las sedes cerca de ti',],
        null,
        null,
        [flowPuntoVentaTodas, flowPuntoVentaCerca]
)


const flowEnvio = addKeyword(['envio', 'enbio', 'envíos', 'envío', 'Envíos', 'Envío', 'enbíos'])
    .addAnswer('Si claro realizamos envíos 🚚🏍️ nacionales y locales, nuestro centro de operación es en Medellín Antioquia y también contamos con 9 puntos de venta.')
    .addAnswer('En compras por nuestra página WEB 📲🛒💻 tenemos como política 8 días hábiles o antes para la entrega 🚛 🏍️ después de ser emitida la factura.')
    .addAnswer('El valor del envío🌎⚡✈️🚚🏍️ varía dependiendo de la ubicación, marca y tipo de producto🛠️⚙️🪛.') 




const flowPrincipal = addKeyword(['hola', 'ola', 'buenas', 'buenaz', 'Buenas', 'vuenaz', 'Donde', 'Dónde','donde', 'dónde', 'cuándo', 'cuando'])
    .addAnswer(
        [
            'Hola 😁',
            'Buen día, bienvenid@ a la línea de atención E-commerce 📲🖥️🛒 de CASA FERRETERA SAS 🛠️⚙️🪛',
            'Soy su asesor Jorge Rendón 🙋🏻‍♂️',
            'Escoge una de las siguientes acciones que quisieras realizar, escribiendo la primera palabra clave',
            '👉 *compra* desea realizar una compra?',
            '👉 *cotización* quisiera solicitar cotización formal?',
            '👉 *asesoría* quisiera hablar con un asesor?',
            '👉 *puntos de venta* desea conocer información sobre los puntos de venta?',
            '👉 *envío* desea conocer información sobre los envíos',
            '👉 *salir* salir del chat con el asistente.',
            
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
