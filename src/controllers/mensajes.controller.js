import {faker} from '@faker-js/faker';
import { loggerError, logger } from "../utils/logger.js";
import MongoDB from '../DAOs/DAOMongoDB.js';

const controllerMensajes = {
    mensajesPOST: async (req,res) =>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const mensaje = {
                email: req.body.email,
                nombre: req.body.nombreMensaje,
                apellido: req.body.apellido,
                edad: req.body.edad,
                alias: req.body.alias,
                mensaje: req.body.mensaje
            };
            let fechaActual = new Date();
            mensaje.fecha = `[(${fechaActual.getDay()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()})]`;
            mensaje.avatar = faker.image.avatar();
            const res = await MongoDB.save(mensaje)
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    mensajesGET: async (req,res) =>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = await MongoDB.mensajes.getAll()
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default controllerMensajes;