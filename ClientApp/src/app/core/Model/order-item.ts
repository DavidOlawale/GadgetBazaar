import { Product } from './product';
export class OrderItem {
    id: number;
    productId: number;
    product: Product;
    quantity: number;
}
