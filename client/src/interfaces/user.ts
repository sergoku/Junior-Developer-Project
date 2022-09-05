import Item from "./Item";
export default interface User {
  _id: string;
  email: string;
  password: string;
  image: string;
  historyBuy: Array<Item[]>;
  basket: Item[];
  __v?: number;
  createdAt: string;
  updatedAt?: string;
}
