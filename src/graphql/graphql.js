import { buildSchema } from 'graphql';

const graphqlSchema = buildSchema(`
    input ProductoInput {
        nombre: String,
        descripcion: String,
        codigo: String,
        foto: String,
        precio: Float,
        stock: Int
    }
    input MensajeInput {
        email: String,
        nombre: String,
        apellido: String,
        edad: Int,
        alias: String,
        mensaje: String
    }
    type Producto {
        _id: ID!,
        nombre: String,
        descripcion: String,
        codigo: String,
        foto: String,
        precio: Float,
        stock: Int,
        timestamp: Float
    }
    type Mensaje {
        email: String,
        nombre: String,
        apellido: String,
        edad: Int,
        alias: String,
        mensaje: String,
        timestamp: Float,
        avatar: String
    }
    type Carrito {
        _id: ID!,
        timestamp: Float,
        productos: [Producto]
    }
    type Datos {
        cpus: Int,
        argsEnt: String,
        nomPlat: String,
        verNode: String,
        memToRev: String,
        pathExe: String,
        procId: Int,
        carProy: String
    }
    type Query {
        getProducto: [Producto]
        getCarrito: [Carrito]
        getCarritos: [Carrito]
        getDatos: Datos
        getMensaje: [Mensaje]
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto
        createCarrito(): Carrito
        createMensaje(datos: MensajeInput): Mensaje
        changeProducto(_id: ID!): [Producto]
        deleteProducto(_id: ID!): Producto
        createProductoCarrito(datos: Producto): Carrito
        deleteCarrito(_id: ID!): Carrito
        deleteProductoCarrito(_id: ID!): Carrito
    }
`)

export default graphqlSchema;