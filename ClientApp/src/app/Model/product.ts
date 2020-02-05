import { Brand } from './brand';
export class Product {
    id: number;
    model: string;
    brandId: number;
    brand: Brand;
    price: number;
}