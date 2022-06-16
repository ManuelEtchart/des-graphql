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
    input ProductoCarritoInput {
        _id: ID!,
        nombre: String,
        descripcion: String,
        codigo: String,
        foto: String,
        precio: Float,
        stock: Int,
        timestamp: Float
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
        getProducto(_id: ID!): [Producto]
        getProductos: [Producto]
        getCarrito(_id: ID!): [Carrito]
        getCarritos(_id: ID!): [Carrito]
        getDatos: Datos
        getMensaje: [Mensaje]
    }
    type Msg {
        mensaje: String
    }
    type Mutation {
        createProducto(datos: ProductoInput): Msg
        createCarrito: Msg
        createMensaje(datos: MensajeInput): Msg
        changeProducto(_id: ID!): Msg
        deleteProducto(_id: ID!): Msg
        createProductoCarrito(datos: ProductoCarritoInput): Msg
        deleteCarrito(_id: ID!): Msg
        deleteProductoCarrito(_id: ID!): Msg
    }
`)

export default graphqlSchema;