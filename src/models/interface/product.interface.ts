export interface ProductAttributes {
    id?: number;
    handle: string;
    title: string;
    description: string;
    sku: string;
    grams: number;
    stock: number;
    price: number;
    comparePrice?: number;
    barcode: string;
    status?: boolean;
}