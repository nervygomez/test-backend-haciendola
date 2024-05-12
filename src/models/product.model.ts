import { Model, DataTypes } from 'sequelize';
import db from '../config/db.config';
import { ProductAttributes } from './interface/product.interface';

interface ProductModel extends Model<ProductAttributes>, ProductAttributes { }

const Product = db.define<ProductModel>('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    handle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grams: {
        type: DataTypes.DOUBLE,
        allowNull: false,

    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    comparePrice: {
        type: DataTypes.DOUBLE
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

export default Product;