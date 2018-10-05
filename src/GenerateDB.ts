import { IDataBase, Instance } from "jsstore";

export const generateDatabase = (DbConnection: Instance, DbName: string) => {
    DbConnection.isDbExist(DbName).then(function (isExist) {
        if (isExist) {
            console.log("Base de datos existente");
            DbConnection.dropDb();
        }
        console.log("Base de datos creada");
        var DataBase = getDatabase();
        DbConnection.createDb(DataBase);
        insertarMarcas(DbConnection);
        console.log("Marcas Insertadas");
        insertarProductos(DbConnection);
        console.log("Productos Insertados");
    });
}

function getDatabase() : IDataBase {
    //Definir Atributos de Tablas
    var tabla_marca = {
        name: "Marca",
        columns: [{
            name: "ID_Marca",
            primaryKey: true,
            dataType: "number",
            autoIncrement: true,
        },
        {
            name: "Nombre",
            notNull: true,
            dataType: "string"
        },
        {
            name: "Correo",
            notNull: true,
            dataType: "string",
            default: "N/A"
        },
        {
            name: "Telefono",
            notNull: true,
            dataType: "string",
            default: "N/A"
        },
        {
            name: "Pagina_Web",
            notNull: true,
            dataType: "string",
            default: "N/A"
        }
        ]
    }

    var tabla_producto = {
        name: "Producto",
        columns: [{
            name: "ID_Producto",
            primaryKey: true,
            dataType: "number",
            autoIncrement: true,
        },
        {
            name: "Nombre",
            notNull: true,
            dataType: "string"
        },
        {
            name: "Categoria",
            dataType: "string",
            default: "N/A"
        },
        {
            name: "Marca",
            notNull: true,
            dataType: "string"
        },
        {
            name: "Imagen",
            dataType: "string",
            default: "N/A"
        },
        {
            name: "Tiendas",
            multiEntry: true
        },
        {
            name: "Precio_Promedio",
            notNull: true,
            dataType: "number",
        }
        ]
    }

    //Insertar Tablas en BD
    var DataBase = {
        name: "Catalogo",
        tables: [tabla_marca, tabla_producto]
    }

    return DataBase;
}

//Generar valores iniciales
function generarMarcas() {
    var marcas = [
        {
            Nombre: "Unilever",
            Correo: "unilever@unilever.com",
            Telefono: "5541232121",
            Pagina_Web: "http://www.unilever.com"
        }
    ];
    return marcas;
}

//Generar valores iniciales
function generarProductos() {
    var productos = [
        {
            Nombre: "Dove: Intense Moisture",
            Categoria: "Shampoo",
            Marca: "Unilever",
            Imagen: "http://s4.reutersmedia.net/resources/r/?m=02&d=20090925&t=2&i=11724477&w=644&fh=&fw=&ll=&pl=&sq=&r=2009-09-25T132133Z_01_BTRE58O114100_RTROPTP_0_DOVE-INTENSE-MOISTURE-SHAMPOO-AND-CONDITIONER",
            Tiendas: ["Wal-Mart", "Sam's Club"],
            Precio_Promedio: 25.50
        }
    ];
    return productos;
}

//Insertar valores en la BD
function insertarMarcas(DbConnection: Instance) {
    var marcas = generarMarcas();
    DbConnection.insert({
        into: "Marca",
        values: marcas
    }).catch(function (err) {
        console.log(err);
        alert("Ocurrió un error al generar las marcas");
    });
}

//Insertar valores en la BD
function insertarProductos(DbConnection: Instance) {
    var productos = generarProductos();
    DbConnection.insert({
        into: "Producto",
        values: productos
    }).catch(function (err) {
        console.log(err);
        alert("Ocurrió un error al generar las marcas");
    })
}