// import { connect, Channel, ConsumeMessage } from "amqplib";
// import axios from "axios";

// class Suscripcion {
//     idSub: string;
//     nombre: string;
//     contraseña: string;

//     constructor(idSub: string, nombre: string, contraseña: string) {
//         this.idSub = idSub;
//         this.nombre = nombre;
//         this.contraseña = contraseña;
//     }
// }

// async function main() {
//     try {
//         const connection = await connect('amqp://guest:guest@107.23.187.32:5672');
//         const channel: Channel = await connection.createChannel();
//         const queue: string = 'primeraCola';
//         await channel.assertQueue(queue, { durable: true });

//         console.log('Esperando mensajes...');

//         channel.consume(queue, async (message: ConsumeMessage | null) => {
//             if (message !== null) {
//                 try {
//                     const subs = message.content.toString();
//                     console.log('Mensaje recibido:', subs);

//                     const suscripcion: Suscripcion = JSON.parse(subs);
//                     console.log('Objeto de suscripción:', suscripcion);

//                     const dataToSend = {
//                         idFactura: suscripcion.idSub,
//                         subsId: suscripcion.nombre
//                     };
//                     console.log('Datos a enviar:', dataToSend);

//                     // Aquí debes reemplazar 'URL_DE_TU_API_Factura' con la ruta correcta de tu API
//                     await axios.post('http://localhost:3001/facturas', dataToSend);
//                     console.log('Suscripción procesada');
//                 } catch (error) {
//                     console.error('Error procesando el mensaje:', error);
//                 } finally {
//                     channel.ack(message!);
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Error al conectar con el servidor AMQP:', error);
//     }
// }

// main().catch(console.error);

import { connect, Channel, ConsumeMessage } from "amqplib";
import axios from "axios";

class Suscripcion {
    idSub: string;
    nombre: string;
    contraseña: string;

    constructor(idSub: string, nombre: string, contraseña: string) {
        this.idSub = idSub;
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}

async function main() {
    try {
        const connection = await connect('amqp://guest:guest@107.23.187.32:5672');
        const channel: Channel = await connection.createChannel();
        const exchange: string = 'Prueba';
        const queue: string = 'primeraCola';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, '');

        console.log('Esperando mensajes...');

        channel.consume(queue, async (message: ConsumeMessage | null) => {
            if (message !== null) {
                try {
                    const subs = message.content.toString();
                    console.log('Mensaje recibido:', subs);

                    const suscripcion: Suscripcion = JSON.parse(subs);
                    console.log('Objeto de suscripción:', suscripcion);

                    const dataToSend = {
                        idFactura: suscripcion.idSub,
                        pagoid: suscripcion.nombre
                    };
                    console.log('Datos a enviar:', dataToSend);

                    //  la ruta correcta de LA API 2
                    await axios.post('http://34.192.191.236 /facturas', dataToSend);
                    console.log('Suscripción procesada');
                } catch (error) {
                    console.error('Error procesando el mensaje:', error);
                } finally {
                    channel.ack(message!);
                }
            }
        });
    } catch (error) {
        console.error('Error al conectar con el servidor AMQP:', error);
    }
}

main().catch(console.error);
