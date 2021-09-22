import { Brand } from './brand';
export class Product {
  id: number
  model: string
  brandId: number
  brand: Brand
  price: number
  batteryCapacity: string
  chargingTime: string
  standByTime: string
  color: string
  sizeInGram: string
  isArchived: Boolean
  productImages: ProductImage[]
}

class ProductImage {
  name: string
}
