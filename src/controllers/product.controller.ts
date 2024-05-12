import { Request, Response } from "express";
import Product from "../models/product.model";
import * as xlsx from 'xlsx';

export const registerProduct = async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const product = await Product.create(body);
        return res.json({
            msg: 'product created',
            product
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error register product',
            error
        });
    }
}

export const getAllProduct = async (_req: Request, res: Response) => { 
    const products = await Product.findAll({ where: { status: true } });
    res.json(products)
} 

export const getProductById = async (req: Request, res: Response) => { 
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        res.status(401).json({
            msg: 'product not found'
        })
    }

    res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { password, ...body } = req.body;
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(401).json({
                msg: 'product not found'
            })
        }

        product.update(body);

        return res.json({
            msg: 'product updated',
            product
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Error updated product',
            error
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
           res.status(401).json({
                msg: 'product not found'
            })
        }

        await product?.update({status: false});
        res.json({
            msg: 'product deleted',
            product
        });

    } catch (error) {
        console.error('Error updated product:', error);
        res.status(500).json({
            msg: 'Error updated product',
            error
        });
    }
}

export const importByExcel = async (req: Request, res: Response) => {
    
    try {
        
        const file = req.file!
        if (!file) {
            return res.status(400).send({ error: 'No se ha subido ningún archivo' });
        }
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data: any[] = xlsx.utils.sheet_to_json(worksheet);
        
        for (const row of data) {
            const product = new Product();
            product.handle = row.Handle;
            product.title = row.Title;
            product.description = row.Description;
            product.sku = String(row.SKU), 
            product.grams = Number(row.Grams);
            product.stock = Number(row.Stock);
            product.price = Number(row.Price);
            product.comparePrice = Number(row['Compare Price']);
            product.barcode = row.Barcode;
            await product.save();
        }
        return res.status(200).send({ message: 'Import success' });
    } catch (error) {
        console.error('Error Import Excel', error);
        return res.status(500).send({ error: 'Error Import Excel' });
    }
}