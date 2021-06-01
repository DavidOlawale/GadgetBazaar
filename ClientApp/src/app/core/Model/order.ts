import { OrderItem } from './order-item';
export class Order {
  id: number
  customerId: string
  orderItems: OrderItem[];
  status: { value: String }
}
