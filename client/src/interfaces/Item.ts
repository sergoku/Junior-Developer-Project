export default interface Item {
  id: string;
  categoria: string;
  image: string;
  price: number;
  title: string;
  _id?: string;
  count: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
