import { loggerError, logger } from "../utils/logger.js";
import MongoDB from "../DAOs/DAOMongoDB.js"; 

class ControllerCarrito {
    carritosGET = async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('carritos', {carritos: await MongoDB.carritos.getAll(), mensajes: await MongoDB.mensajes.getAll()})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

    carritoPOST = async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            await MongoDB.carritos.save(
                {
                    timestamp: Date.now(),
                    productos: []
                }
            );
            res.redirect('/api/carrito')
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

    carritoDELETE = async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.send(await MongoDB.carritos.deleteById(req.params.id))
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

    carritoGET = async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(req.params.id === undefined){
                res.render('carritos', {carritos: await MongoDB.carritos.getAll(), mensajes: await MongoDB.mensajes.getAll()})
            }else{
                res.render('carrito', {carritos: await MongoDB.carritos.getById(req.params.id), mensajes: await MongoDB.mensajes.getAll(), productos: await MongoDB.productos.getAll()})
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

    carritoProductoPOST = async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            await MongoDB.carritos.agregarProductoEnCarrito(req.params.id, req.params.id_prod)
            res.render('carrito', {carritos: await MongoDB.carritos.getById(req.params.id), mensajes: await MongoDB.mensajes.getAll(), productos: await MongoDB.productos.getAll()})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

    carritoPedirGET = async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.render('pedido', {carritos: await MongoDB.carritos.getById(req.params.id)})
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

    carritoProductoDELETE = async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            res.send(await MongoDB.carritos.borrarProductoEnCarrito(req.params.id,req.params.id_prod))
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default ControllerCarrito;

