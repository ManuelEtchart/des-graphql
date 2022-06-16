import { loggerError, logger } from "../utils/logger.js";
import MongoDB from "../DAOs/DAOMongoDB.js";


const administrador = true;

const controllerProductos = {
    productosGET: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if (req.params.id === undefined) {
                const res = await MongoDB.productos.getAll()
                return res
            }else{
                const res = await MongoDB.productos.getById(req.params.id)
                return res
            } 
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },
    productosPOST: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try{
            if(administrador){
            
                const res = await MongoDB.productos.save({
                    timestamp: Date.now(),
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    codigo: req.body.codigo,
                    foto: req.body.urlFoto,
                    precio: req.body.precio,
                    stock: req.body.stock
                });
                return res
            }else{
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                return {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`};
            }
        }catch(error){
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`);
        }
    },

    productosPUT: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(administrador){
                const res = await MongoDB.productos.updateById(req.params.id, req.query);
                return res
            }else{
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                return {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`};
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    },

    productosDELETE: async (req,res) => {
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            if(administrador){
                const res = await MongoDB.productos.deleteById(req.params.id)
                return res
            } else {
                loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada - Ruta no autorizada`)
                return {error: '-1', descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

export default controllerProductos;