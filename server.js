import express from 'express';
import compression from 'compression';
import path from 'path';
import hbs from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { logger, loggerError } from './src/utils/logger.js';
import controllerCarrito from './src/controllers/carrito.controller.js';
import controllerInfo from './src/controllers/info.controller.js';
import controllerMensajes from './src/controllers/mensajes.controller.js';
import controllerProductos from './src/controllers/productos.controller.js';
import graphqlSchema from './src/graphql/graphql.js';
import { graphqlHTTP } from 'express-graphql';

export const app = express();

app.use(compression());
//app.use(express.static('public'));

app.set('views', path.join(path.dirname(''), 'src/views'));

app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}))

app.set('view engine', '.hbs');

app.use(cookieParser())
app.use(session({
   secret: '123456789!#$%&/()',
   resave: false,
   saveUninitialized: false,
   cookie: {
      secure: 'auto',
      maxAge: 600000
   }
}));

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: {
        getProducto: controllerProductos.productoGET,
        getProductos: controllerProductos.productosGET,
        getCarrito: controllerCarrito.carritoGET,
        getCarritos: controllerCarrito.carritosGET,
        getDatos: controllerInfo.infoGET,
        getMensaje: controllerMensajes.mensajesGET,
        createProducto: controllerProductos.productosPOST,
        createCarrito: controllerCarrito.carritoPOST,
        createMensaje: controllerMensajes.mensajesPOST,
        changeProducto: controllerProductos.productosPUT,
        deleteProducto: controllerProductos.productosDELETE,
        createProductoCarrito: controllerCarrito.carritoProductoPOST,
        deleteCarrito: controllerCarrito.carritoDELETE,
        deleteProductoCarrito: controllerCarrito.carritoProductoDELETE
    },
    graphiql: true,
})
)
/*
app.use('/api/carrito', (new CarritoRouter()).start());
app.use('/api/productos', (new ProductosRouter()).start());
app.use('/api/mensajes', (new MensajesRouter()).start());
app.use('/api/info', (new InfoRouter()).start());

app.get('/', (req,res)=>{
    logger.info(`ruta ${req.url} metodo ${req.method} implementada`)
    res.redirect('/api/productos')
});
*/
app.get('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
    logger.warn({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`})
});
app.post('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
    logger.warn({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`})
});
app.delete('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
    logger.warn({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`})
});
app.put('*', (req,res) => {
    res.send({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`});
    logger.warn({error: '-2', descripcion: `ruta ${req.url} metodo ${req.method} no implementada`})
});

const PORT = 8080;

const server = app.listen(PORT, () => {
   logger.info(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => loggerError.error(error, `Error en servidor ${error}`) ); 