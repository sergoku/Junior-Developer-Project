import Item from "../interfaces/Item";

export function paginate(items: Item[], pageNumber: number, pageSize: number) {
  if (items && pageNumber && pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  }
}
