"use strict";
// import { connect, Channel, ConsumeMessage } from "amqplib";
// import axios from "axios";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const amqplib_1 = require("amqplib");
const axios_1 = __importDefault(require("axios"));
class Suscripcion {
    constructor(idSub, nombre, contraseña) {
        this.idSub = idSub;
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, amqplib_1.connect)('amqp://guest:guest@107.23.187.32:5672');
            const channel = yield connection.createChannel();
            const exchange = 'Prueba';
            const queue = 'primeraCola';
            yield channel.assertExchange(exchange, 'direct', { durable: true });
            yield channel.assertQueue(queue, { durable: true });
            yield channel.bindQueue(queue, exchange, '');
            console.log('Esperando mensajes...');
            channel.consume(queue, (message) => __awaiter(this, void 0, void 0, function* () {
                if (message !== null) {
                    try {
                        const subs = message.content.toString();
                        console.log('Mensaje recibido:', subs);
                        const suscripcion = JSON.parse(subs);
                        console.log('Objeto de suscripción:', suscripcion);
                        const dataToSend = {
                            idFactura: suscripcion.idSub,
                            pagoid: suscripcion.nombre
                        };
                        console.log('Datos a enviar:', dataToSend);
                        //  la ruta correcta de LA API 2
                        yield axios_1.default.post('http://localhost:3001/facturas', dataToSend);
                        console.log('Suscripción procesada');
                    }
                    catch (error) {
                        console.error('Error procesando el mensaje:', error);
                    }
                    finally {
                        channel.ack(message);
                    }
                }
            }));
        }
        catch (error) {
            console.error('Error al conectar con el servidor AMQP:', error);
        }
    });
}
main().catch(console.error);
