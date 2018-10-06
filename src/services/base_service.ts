import { idbCon } from "./idb_helper";

import { IDataBase } from 'jsstore';
import { MarcasTbl, ProductosTbl } from '../Tables';
import { Producto, Marca } from '../Model';
import { insertarMarcas, insertarProductos } from '../GenerateDB';

export class BaseService {
    private static _instance: BaseService;

    public static async Connect() {
        if (this._instance === undefined) {
            this._instance = new BaseService();
            await this._instance.initDatabase();
        }
        return this._instance;
    }

    private DbName = "Catalogo";

    private constructor() {

    }

    /**
     * create database
     * 
     * @memberof IdbService
     */
    async initDatabase(): Promise<boolean> {
        try {
            let exist = await this.connection.isDbExist(this.DbName);
            if (exist) {
                await this.connection.openDb(this.DbName);
                //await this.connection.dropDb();
            } else {
                await this.connection.createDb(this.getDatabase_());
                await insertarMarcas(this.connection);
                await insertarProductos(this.connection);
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    private getDatabase_() {
        const database: IDataBase = {
            name: this.DbName,
            tables: [MarcasTbl, ProductosTbl]
        };

        return database;
    }

    get connection() {
        return idbCon;
    }

    public async addProduct(product: Producto) {
        let marcas = await this.connection.select({
            from: "Marcas",
            where: {
                IdMarca: product.IdMarca
            }
        });
        if(marcas.length === 0){
            throw `Cannot find a Marca with id: ${product.IdMarca} `
        } 
        return this.connection.insert({
            into: "Productos",
            values: [product]
        });
    }

    public async removeProduct(product: Producto) {
        return this.connection.remove({
            from: "Productos",
            where: {
                IdProducto: product.IdProducto
            }
        });
    }

    public async editProduct(product: Producto) {
        return this.connection.update({
            in: "Productos",
            where: {
                IdProducto: product.IdProducto
            },
            set: {
                Nombre: product.Nombre,
                Categoria: product.Categoria,
                IdMarca: product.IdMarca,
                Imagen: product.Imagen,
                PrecioPromedio: product.PrecioPromedio,
                Tiendas: product.Tiendas,
            }
        });
    }

    public async addMarca(marca: Marca) {
        return this.connection.insert({
            into: "Marcas",
            values: [marca]
        });
    }

    public async removeMarca(marca: Marca) {
        await this.connection.remove({
            from: "Productos",
            where: {
                IdMarca: marca.IdMarca
            }
        })
        return this.connection.remove({
            from: "Marcas",
            where: {
                IdMarca: marca.IdMarca 
            }
        });
    }

    public async editMarca(marca: Marca) {
        return this.connection.update({
            in: "Marcas",
            where: {
                IdMarca: marca.IdMarca
            },
            set: {
                Nombre: marca.Nombre,
                Correo: marca.Correo,
                PaginaWeb: marca.PaginaWeb,
                Telefono: marca.Telefono
            }
        });
    }

    public async resetDatabase() {
        await this.connection.dropDb();
        return this.connection.createDb(this.getDatabase_());
    }

    public async exportToJSON(table: "Productos" | "Marcas") {
        this.connection.exportJson({
            from: table
        });
    }
}
