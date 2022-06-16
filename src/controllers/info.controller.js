import { loggerError, logger } from "../utils/logger.js";
import { cpus } from 'os';

const controllerInfo = {
    infoGET: async (req,res)=>{
        logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
        try {
            const res = datos()
            return res
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${req.url} metodo ${req.method} implementada`)
        }
    }
}

function datos(){
    const datos = {cpus: cpus.length,
        argsEnt: process.argv.slice(2),
        nomPlat: process.platform,
        verNode: process.version,
        memToRev: JSON.stringify(process.memoryUsage().rss),
        pathExe: process.execPath,
        procId: process.pid,
        carProy: process.cwd()}
    return datos
}

export default controllerInfo;


    