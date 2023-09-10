import { Product } from "./product";

//EL OMIT = OMITE LOS CAMPOS CITADOS LUEGO DEL NOMBRE DE LA CLASE A EXTENDER
export interface ProductCreateDto extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
  }