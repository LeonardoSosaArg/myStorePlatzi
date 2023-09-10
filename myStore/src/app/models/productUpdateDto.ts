import { ProductCreateDto } from "./productCreateDto";

export interface ProductUpdateDto extends Partial<ProductCreateDto>{
    //EL PARTIAL MARCA TODOS LOS ATRIBUTOS DE LA CLASES QUE EXTIENDE COMO OPCIONALES
}