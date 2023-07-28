import Product from "./Product";

export default interface Basket {
  products: { quantity: number; product: Product }[];
}
