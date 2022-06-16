import { buildSchema } from 'graphql';

const graphql = buildSchema(`
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
        getDatos: Datos
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto
        createCarrito(): Carrito
        changeProducto(_id: ID!): 
        deleteProducto(_id: ID!):
        
    }
`)