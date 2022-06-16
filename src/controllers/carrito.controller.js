import { loggerError, logger } from "../utils/logger.js";
import MongoDB from "../DAOs/DAOMongoDB.js"; 


const controllerCarrito = {
    carritosGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = await MongoDB.carritos.getAll()
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = await MongoDB.carritos.save(
                {
                    timestamp: Date.now(),
                    productos: []
                }
            );
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = await MongoDB.carritos.deleteById(req.params.id)
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoGET: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(req.params.id === undefined){
                const res = await MongoDB.carritos.getAll()
                return res
            }else{
                const res = await MongoDB.carritos.getById(req.params.id)
                return res
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoProductoPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = await MongoDB.carritos.agregarProductoEnCarrito(req.params.id, req.params.id_prod)
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    carritoProductoDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = await MongoDB.carritos.borrarProductoEnCarrito(req.params.id,req.params.id_prod)
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }

}

export default controllerCarrito;

